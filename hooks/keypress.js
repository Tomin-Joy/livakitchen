"use client";
import { useEffect } from "react";

export default function useKeyPress(callback) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.shiftKey && event.altKey && event.key.toLowerCase() === "d") {
        // Trigger the callback function when Shift + Alt + D is pressed
        callback();
      }
    };

    // Attach the event listener for keydown
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback]);
}
