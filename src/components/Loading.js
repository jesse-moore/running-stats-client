import React, { useEffect, useState } from "react";

const Loading = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setText((text) => text + ".");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-overlay-text">
        <span className="invisible">{text}</span>
        Loading
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Loading;
