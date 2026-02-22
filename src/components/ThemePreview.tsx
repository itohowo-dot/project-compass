import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const LIGHT = {
  bg: "hsl(40 40% 96%)",
  card: "hsl(40 30% 100%)",
  border: "hsl(40 20% 88%)",
  text: "hsl(30 10% 15%)",
  muted: "hsl(30 8% 55%)",
  bar: "hsl(36 90% 54%)",
  barBg: "hsl(40 20% 90%)",
  dot1: "hsl(0 70% 60%)",
  dot2: "hsl(45 80% 55%)",
  dot3: "hsl(140 50% 50%)",
};

const DARK = {
  bg: "hsl(30 15% 8%)",
  card: "hsl(30 10% 12%)",
  border: "hsl(30 10% 20%)",
  text: "hsl(40 20% 92%)",
  muted: "hsl(30 8% 55%)",
  bar: "hsl(36 90% 54%)",
  barBg: "hsl(30 10% 20%)",
  dot1: "hsl(0 70% 60%)",
  dot2: "hsl(45 80% 55%)",
  dot3: "hsl(140 50% 50%)",
};

export function ThemePreview() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setIsDark((d) => !d), 3000);
    return () => clearInterval(interval);
  }, []);

  const t = isDark ? DARK : LIGHT;

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <motion.div
        className="w-[280px] sm:w-[300px] rounded-xl overflow-hidden shadow-lg"
        animate={{
          backgroundColor: t.bg,
          borderColor: t.border,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ border: "1px solid" }}
      >
        {/* Mini header */}
        <motion.div
          className="flex items-center justify-between px-4 py-2.5"
          animate={{ backgroundColor: t.card, borderColor: t.border }}
          transition={{ duration: 0.6 }}
          style={{ borderBottom: "1px solid" }}
        >
          <div className="flex items-center gap-1.5">
            <motion.div className="w-2.5 h-2.5 rounded-full" animate={{ backgroundColor: t.dot1 }} transition={{ duration: 0.6 }} />
            <motion.div className="w-2.5 h-2.5 rounded-full" animate={{ backgroundColor: t.dot2 }} transition={{ duration: 0.6 }} />
            <motion.div className="w-2.5 h-2.5 rounded-full" animate={{ backgroundColor: t.dot3 }} transition={{ duration: 0.6 }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <Moon className="w-3.5 h-3.5" style={{ color: t.muted }} /> : <Sun className="w-3.5 h-3.5" style={{ color: t.muted }} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Card body */}
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <motion.span
              className="text-xs font-semibold"
              animate={{ color: t.text }}
              transition={{ duration: 0.6 }}
            >
              Active Stream
            </motion.span>
            <motion.span
              className="text-[10px] font-mono"
              animate={{ color: t.muted }}
              transition={{ duration: 0.6 }}
            >
              42%
            </motion.span>
          </div>

          {/* Progress bar */}
          <motion.div
            className="h-2 rounded-full overflow-hidden"
            animate={{ backgroundColor: t.barBg }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "42%", backgroundColor: t.bar }}
              transition={{ width: { duration: 1.5, ease: "easeOut" }, backgroundColor: { duration: 0.6 } }}
            />
          </motion.div>

          <div className="flex items-center justify-between">
            <motion.span
              className="text-sm font-mono font-bold"
              animate={{ color: t.text }}
              transition={{ duration: 0.6 }}
            >
              0.42 sBTC
            </motion.span>
            <motion.span
              className="text-[10px]"
              animate={{ color: t.muted }}
              transition={{ duration: 0.6 }}
            >
              of 1.00 sBTC
            </motion.span>
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground">
        Supports dark and light themes
      </p>
    </div>
  );
}
