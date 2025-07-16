export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-gray-700">
        You do not have permission to access this page.
      </p>
    </div>
  );
}
