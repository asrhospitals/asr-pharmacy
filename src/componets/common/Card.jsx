const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-xl shadow p-6 ${className}`.trim()}
    {...props}
  >
    {children}
  </div>
);

export default Card; 