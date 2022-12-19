import { Card, CardHeader } from "@mui/material";
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
    <Card>
      <CardHeader title="Clock" subheader={time.toLocaleTimeString()} className="select-none" />
    </Card>
  );
};

export default ClockWidget;
