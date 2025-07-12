import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", width, ...props }, ref) => (
  <input
    ref={ref}
    className={`${className} ${width ? width : "w-full"} p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`.trim()}
    {...props}
  />
));

export default Input; 