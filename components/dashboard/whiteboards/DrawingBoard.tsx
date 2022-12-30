import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { fabric } from "fabric";

const DrawingNavbar = () => {
  return (
    <Box sx={{ height: "64px", width: "100vw", backgroundColor: "white" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>
    </Box>
  );
};

type Line = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
};

type Current = {
  color: string;
  x?: number;
  y?: number;
};

const DrawingBoard = () => {
  const boardRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("black");

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = boardRef.current!;
    const context = canvas.getContext("2d")!;

    // ----------------------- Colors --------------------------------------------------

    // set the current color
    const current: Current = {
      color: color,
    };

    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = ({ x0, y0, x1, y1, color }: Line, emit: boolean) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

        console.log("drawing line", { x0, y0, x1, y1, color })

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      drawLine(
        {
          x0: current.x!,
          y0: current.y!,
          x1: e.clientX || e.touches[0].clientX,
          y1: e.clientY || e.touches[0].clientY,
          color: current.color,
        },
        true
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        {
          x0: current.x!,
          y0: current.y!,
          x1: e.clientX || e.touches[0].clientX,
          y1: e.clientY || e.touches[0].clientY,
          color: current.color,
        },
        true
      );
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data: Line) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(
        {
          x0: data.x0 * w,
          y0: data.y0 * h,
          x1: data.x1 * w,
          y1: data.y1 * h,
          color: data.color,
        },
        true
      );
    };
  }, [color]);

  return (
    <>
      <Box sx={{ position: "fixed" }}>
        <DrawingNavbar />
      </Box>
      <Box
        sx={{
          minHeight: "calc(100vh-64px)",
          backgroundColor: "white",
        }}
      >
        <canvas ref={boardRef} />
      </Box>
    </>
  );
};

export default DrawingBoard;
