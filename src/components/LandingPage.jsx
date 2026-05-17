import { motion } from "framer-motion";

export default function LandingPage({
  setShowLandingPage,
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20 relative">

        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-20 relative z-10">

          <h2 className="text-3xl font-bold">
            FlexFlow
          </h2>

          <button
            onClick={() => setShowLandingPage(false)}
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl transition"
          >
            Launch App
          </button>

          <a
  href="/about"
  className="text-zinc-400 hover:text-white transition"
>
  About
</a>

        </div>

        {/* BACKGROUND GLOW */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

        {/* HERO CONTENT */}
        <motion.div
          className="text-center mb-20 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Build Better Habits with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              FlexFlow
            </span>
          </h1>

          <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-10">
            Personalized stretch routines designed to improve
            flexibility, posture, and daily movement.
          </p>

          <button
            onClick={() => setShowLandingPage(false)}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold transition hover:scale-105"
          >
            Start Stretching
          </button>

        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >

          {/* CARD 1 */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >

            <div className="text-4xl mb-4">🧘</div>

            <h3 className="text-2xl font-bold mb-3">
              Guided Routines
            </h3>

            <p className="text-zinc-400">
              Generate quick mobility routines tailored to
              your goals.
            </p>

          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >

            <div className="text-4xl mb-4">⏱️</div>

            <h3 className="text-2xl font-bold mb-3">
              Built-In Timer
            </h3>

            <p className="text-zinc-400">
              Stay focused with timed stretches and smooth
              guided flow.
            </p>

          </motion.div>

          {/* CARD 3 */}
          <motion.div
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >

            <div className="text-4xl mb-4">✨</div>

            <h3 className="text-2xl font-bold mb-3">
              Daily Mobility
            </h3>

            <p className="text-zinc-400">
              Improve posture, flexibility, and movement
              consistency.
            </p>

          </motion.div>

        </motion.div>

      </div>

    </div>
  );
}