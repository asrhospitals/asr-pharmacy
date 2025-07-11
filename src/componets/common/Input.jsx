import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`.trim()}
    {...props}
  />
));

export default Input; 