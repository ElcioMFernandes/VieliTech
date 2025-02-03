import { useState, useEffect } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

export default useCurrentTime;
