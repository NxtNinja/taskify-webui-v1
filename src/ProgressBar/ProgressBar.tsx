import React, { useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";

interface ProgressBarProps {
  initialValue?: number;
  increment?: number;
  delay?: number; // Delay in milliseconds between increments
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  initialValue = 0,
  increment = 10,
  delay = 500,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + increment)); // Reset at 100%
    }, delay);

    return () => clearInterval(interval); // Cleanup the interval
  }, [increment, delay]);

  return (
    <Progress
      aria-label="Loading..."
      size="md"
      value={value}
      color="success"
      showValueLabel={true}
      className="max-w-md"
    />
  );
};

export default ProgressBar;
