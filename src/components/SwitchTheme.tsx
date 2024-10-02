import { themeAtom } from "@/utils/themeAtom";
import { useAtom } from "jotai/react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const SwitchTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const themeSwitch = () => {
    setTheme((prev) => !prev);
  };

  return (
    <>
      <div onClick={themeSwitch} className="cursor-pointer">
        {theme ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Moon />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -180 }}
            transition={{ duration: 0.5 }}
          >
            <Sun />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SwitchTheme;
