const Loader = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <span className="loader"></span>
    <span className="text-gray-600 text-sm mt-2">{text}</span>
  </div>
);

export default Loader;
