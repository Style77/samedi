import { useEffect, useState } from "react";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-black text-3xl justify-center items-center flex font-bold font-mono border-2 p-4 border-gray-800 bg-gray-300 w-full h-full select-none">
      {time.toLocaleTimeString()}
    </div>
  );
};

export default ClockWidget;
