import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <motion.main
        className="container py-6 pb-24 md:pb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
}
