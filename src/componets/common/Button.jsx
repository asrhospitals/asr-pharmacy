const base = "px-2 py-1 rounded font-medium transition focus:outline-none";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700",
};
const iconButton =
  "p-2 rounded-full bg-transparent hover:bg-gray-100 focus:outline-none flex items-center justify-center";

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  startIcon,
  endIcon,
  ...props
}) => {
  const isIcon = type === "icon";
  return (
    <button
      type={isIcon ? "button" : type}
      className={
        isIcon
          ? `${iconButton} ${className}`.trim()
          : `${base} ${className} ${
              variants[variant] || ""
            } flex items-center cursor-pointer`.trim()
      }
      {...props}
    >
      {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
      <span className="flex items-center">{children}</span>
      {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
