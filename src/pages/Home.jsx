import React from "react";

import stretches from "../data/stretches";
import LandingPage from "../components/LandingPage";

export default function Home() {

  const [selectedGoal, setSelectedGoal] = React.useState(null);
  const [routine, setRoutine] = React.useState([]);
  const [currentStretchIndex, setCurrentStretchIndex] =
    React.useState(0);

  const [timeLeft, setTimeLeft] = React.useState(60);

  const [isRunning, setIsRunning] =
    React.useState(false);

  const [isComplete, setIsComplete] =
    React.useState(false);

  const [showLandingPage, setShowLandingPage] =
    React.useState(true);

  const [selectedDifficulty, setSelectedDifficulty] =
    React.useState("All");

  const [completedRoutines, setCompletedRoutines] =
    React.useState(0);

  const [userPrompt, setUserPrompt] =
    React.useState("");

  const [aiRoutine, setAiRoutine] =
    React.useState([]);

  // TIMER EFFECT
  React.useEffect(() => {

    let timer;

    if (isRunning && timeLeft > 0) {

      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

    }

    if (timeLeft === 0) {
      handleNextStretch();
    }

    return () => clearInterval(timer);

  }, [isRunning, timeLeft]);

  // LOAD SAVED ROUTINES
  React.useEffect(() => {

    const savedCount = localStorage.getItem(
      "completedRoutines"
    );

    if (savedCount) {
      setCompletedRoutines(Number(savedCount));
    }

  }, []);

  // GENERATE NORMAL ROUTINE
  const generateRoutine = (goal) => {

    setSelectedGoal(goal);

    setRoutine(goal.stretches);

    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );

    audio.play();

    setCurrentStretchIndex(0);

    setTimeLeft(60);

    setIsComplete(false);
  };

  // AI ROUTINE GENERATOR
  const generateAiRoutine = () => {

    const prompt = userPrompt.toLowerCase();

    let matchedStretches = [];

    // HIP RELATED
    if (
      prompt.includes("hip") ||
      prompt.includes("tight hips") ||
      prompt.includes("sitting")
    ) {

      matchedStretches.push(
        ...stretches.find(
          (s) => s.title === "Hip Mobility"
        ).stretches
      );
    }

    // POSTURE RELATED
    if (
      prompt.includes("posture") ||
      prompt.includes("back") ||
      prompt.includes("neck")
    ) {

      matchedStretches.push(
        ...stretches.find(
          (s) => s.title === "Improve Posture"
        ).stretches
      );
    }

    // MORNING / ENERGY
    if (
      prompt.includes("morning") ||
      prompt.includes("energy") ||
      prompt.includes("wake")
    ) {

      matchedStretches.push(
        ...stretches.find(
          (s) => s.title === "Morning Wake-Up"
        ).stretches
      );
    }

    // REMOVE DUPLICATES
    const uniqueStretches =
      matchedStretches.filter(
        (stretch, index, self) =>
          index ===
          self.findIndex(
            (s) => s.name === stretch.name
          )
      );

    // FALLBACK
    if (uniqueStretches.length === 0) {

      uniqueStretches.push(
        ...stretches[0].stretches
      );
    }

    setAiRoutine(uniqueStretches);

    setRoutine(uniqueStretches);

    setSelectedGoal({
      title: "AI Generated Routine",
    });

    setCurrentStretchIndex(0);

    setTimeLeft(60);

    setIsComplete(false);
  };

  const startRoutine = () => {
    setIsRunning(true);
  };

  const pauseRoutine = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(60);
    setIsRunning(false);
  };

  const handleNextStretch = () => {

    if (currentStretchIndex < routine.length - 1) {

      const audio = new Audio(
        "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
      );

      audio.play();

      setCurrentStretchIndex((prev) => prev + 1);

      setTimeLeft(60);

    } else {

      setIsRunning(false);

      setIsComplete(true);

      const newCount =
        completedRoutines + 1;

      setCompletedRoutines(newCount);

      localStorage.setItem(
        "completedRoutines",
        newCount
      );
    }
  };

  const progressPercentage =
    ((60 - timeLeft) / 60) * 100;

  // LANDING PAGE
  if (showLandingPage) {

    return (
      <LandingPage
        setShowLandingPage={
          setShowLandingPage
        }
      />
    );
  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">

          <h1 className="text-5xl font-bold mb-4">
            FlexFlow
          </h1>

          <p className="text-zinc-400 text-lg">
            Build quick mobility and stretch
            routines tailored to your goals.
          </p>

          <p className="text-blue-400 mt-3">
            Completed Routines:
            {" "}
            {completedRoutines}
          </p>

        </div>

        {/* GOAL SECTION */}
        {!selectedGoal && (

          <>

            {/* AI GENERATOR */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-10">

              <h2 className="text-2xl font-bold mb-4">
                AI Routine Generator
              </h2>

              <p className="text-zinc-400 mb-6">
                Describe how your body feels
                and FlexFlow will generate a
                personalized stretch routine.
              </p>

              <div className="flex flex-col md:flex-row gap-4">

                <input
                  type="text"
                  value={userPrompt}
                  onChange={(e) =>
                    setUserPrompt(
                      e.target.value
                    )
                  }
                  placeholder="Example: My hips feel tight from sitting all day"
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                />

                <button
                  onClick={generateAiRoutine}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-4 rounded-2xl font-semibold transition hover:scale-105"
                >
                  Generate Routine
                </button>

              </div>

            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-semibold mb-6">
              Choose Your Goal
            </h2>

            {/* DIFFICULTY FILTER */}
            <div className="flex gap-4 mb-8 flex-wrap">

              {[
                "All",
                "Beginner",
                "Intermediate",
                "Advanced",
              ].map((level) => (

                <button
                  key={level}
                  onClick={() =>
                    setSelectedDifficulty(
                      level
                    )
                  }
                  className={`px-5 py-2 rounded-2xl transition ${
                    selectedDifficulty === level
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {level}
                </button>

              ))}

            </div>

            {/* ROUTINE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {stretches
                .filter((stretch) => {

                  if (
                    selectedDifficulty ===
                    "All"
                  ) {
                    return true;
                  }

                  return (
                    stretch.difficulty ===
                    selectedDifficulty
                  );

                })
                .map((stretch) => (

                  <button
                    key={stretch.id}
                    onClick={() =>
                      generateRoutine(stretch)
                    }
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-blue-500 hover:scale-105 transition-all duration-300 text-left"
                  >

                    <h3 className="text-2xl font-bold mb-3">
                      {stretch.title}
                    </h3>

                    <div className="space-y-4 mt-4">

                      {stretch.stretches.map(
                        (s, index) => (

                          <div
                            key={index}
                            className="bg-zinc-800 rounded-2xl overflow-hidden flex flex-col items-center"
                          >

                            <img
                              src={s.image}
                              alt={s.name}
                              className="w-full h-40 object-contain bg-zinc-900 p-4"
                            />

                            <div className="p-3">

                              <p className="text-sm text-white">
                                {s.name}
                              </p>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </button>

                ))}

            </div>

          </>

        )}

        {/* TIMER SECTION */}
        {selectedGoal &&
          routine.length > 0 &&
          !isComplete && (

          <div className="max-w-2xl mx-auto">

            <button
              onClick={() => {

                setSelectedGoal(null);

                setRoutine([]);

                setIsRunning(false);

                setTimeLeft(60);

              }}
              className="mb-8 text-zinc-400 hover:text-white"
            >
              ← Back
            </button>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">

              <p className="text-blue-400 font-medium mb-2">
                {selectedGoal.title}
              </p>

              {selectedGoal.title ===
                "AI Generated Routine" && (

                <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm mb-4">
                  AI Personalized
                </div>

              )}

              <h2 className="text-4xl font-bold mb-6">
                {
                  routine[
                    currentStretchIndex
                  ]?.name
                }
              </h2>

              {routine[currentStretchIndex] && (

                <img
                  src={
                    routine[
                      currentStretchIndex
                    ].image
                  }
                  alt={
                    routine[
                      currentStretchIndex
                    ].name
                  }
                  className="max-w-md mx-auto object-contain rounded-3xl mb-6"
                />

              )}

              {/* CIRCULAR TIMER */}
              <div className="relative w-64 h-64 mx-auto mb-8">

                <svg className="w-full h-full -rotate-90">

                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke="#27272a"
                    strokeWidth="14"
                    fill="transparent"
                  />

                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke="#3b82f6"
                    strokeWidth="14"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={691}
                    strokeDashoffset={
                      691 -
                      (691 *
                        progressPercentage) /
                        100
                    }
                    className="transition-all duration-1000"
                  />

                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <div
                    className={`text-6xl font-bold ${
                      timeLeft <= 10
                        ? "animate-pulse text-red-400"
                        : ""
                    }`}
                  >
                    {timeLeft}
                  </div>

                  <div className="text-zinc-400 mt-2">
                    seconds
                  </div>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4 flex-wrap">

                {!isRunning ? (

                  <button
                    onClick={startRoutine}
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-2xl font-semibold transition"
                  >
                    Start
                  </button>

                ) : (

                  <button
                    onClick={pauseRoutine}
                    className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-2xl font-semibold transition"
                  >
                    Pause
                  </button>

                )}

                <button
                  onClick={resetTimer}
                  className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-2xl font-semibold transition"
                >
                  Reset
                </button>

                <button
                  onClick={handleNextStretch}
                  className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-2xl font-semibold transition"
                >
                  Next Stretch
                </button>

              </div>

            </div>

          </div>

        )}

        {/* COMPLETION SCREEN */}
        {isComplete && (

          <div className="max-w-xl mx-auto text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-4">
              Routine Complete 🎉
            </h2>

            <p className="text-zinc-400 mb-8">
              Great job finishing your
              stretch routine.
            </p>

            <button
              onClick={() => {

                setSelectedGoal(null);

                setRoutine([]);

                setCurrentStretchIndex(0);

                setTimeLeft(60);

                setIsComplete(false);

              }}
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-2xl font-semibold transition"
            >
              Start Another Routine
            </button>

          </div>

        )}

      </div>

    </div>
  );
}