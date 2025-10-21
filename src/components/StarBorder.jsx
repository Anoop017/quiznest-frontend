import React from "react";

const StarBorder = ({
  children,
  color = "#60a5fa",
  speed = "6s",
  size = "8px",
}) => {
  return (
    <div
      className="relative inline-flex items-center justify-center px-4 py-2 text-white font-semibold rounded-lg overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
      }}
    >
      {/* Star trails */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 5px,
            ${color} 5px,
            ${color} 6px
          )`,
          animation: `star-movement-bottom ${speed} linear infinite alternate`,
          maskImage:
            "linear-gradient(to top, transparent, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1))",
          WebkitMaskImage:
            "linear-gradient(to top, transparent, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1))",
        }}
      ></div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            270deg,
            transparent,
            transparent 5px,
            ${color} 5px,
            ${color} 6px
          )`,
          animation: `star-movement-top ${speed} linear infinite alternate`,
          maskImage:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1))",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8) 40%, rgba(0,0,0,1))",
        }}
      ></div>

      {/* Actual button text */}
      <span className="relative z-10">{children}</span>
    </div>
  );
};

export default StarBorder;
