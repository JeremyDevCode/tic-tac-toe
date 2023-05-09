import React from "react";

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      className={className}
    >
      <path
        d="M18 22a3 3 0 100-6 3 3 0 000 6zM18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15.5 6.5l-7 4M8.5 13.5l7 4"
        stroke="currentColor"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}

export { ShareIcon };
