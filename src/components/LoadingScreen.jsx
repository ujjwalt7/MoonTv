import { motion } from "framer-motion";
import { tmdbBasicImg } from "@/components/values";

export default function LoadingScreen({ isLoading, bgImage }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bgDark ${
        isLoading ? "" : "pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {bgImage && (
          <img
            src={tmdbBasicImg + "original" + bgImage}
            alt="backdrop"
            className="w-full h-full object-cover opacity-20 blur-md"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/80 to-bgDark/60" />
      </div>
      
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-primary"
        >
          TARE
        </motion.div>
        
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-16 h-16"
          >
            <div className="w-full h-full rounded-full border-4 border-primary/30"></div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-1"
          >
            <h2 className="text-textWhite text-xl font-medium">Loading your content</h2>
            <p className="text-textSec text-sm">Please wait a moment...</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}