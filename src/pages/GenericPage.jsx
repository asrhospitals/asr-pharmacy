
import { Package } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigation } from "../hooks/useNavigation";

const GenericPage = ({ title, path }) => {
  const user = useSelector((state) => state.user.user);
  const { currentPath } = useNavigation();

  if (currentPath === "/profile") {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-2"><strong>Name:</strong> {user?.username}</div>
          <div className="mb-2"><strong>Role:</strong> {user?.role}</div>
          <div className="mb-2"><strong>ID:</strong> {user?.id}</div>
          <div className="mb-2"><strong>Module(s):</strong> {user?.module?.join(", ")}</div>
        </div>
      </div>
    );
  }
  if (currentPath === "/help") {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Help & FAQ</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-2">How do I use the app?</h2>
          <p className="mb-4">Navigate using the sidebar. Your access is based on your role. Contact admin for more help.</p>
          <h2 className="font-semibold mb-2">How do I logout?</h2>
          <p className="mb-4">Click your avatar in the top right and select "Logout".</p>
          <h2 className="font-semibold mb-2">Who do I contact for support?</h2>
          <p>Email: support@asrpharmacy.com</p>
        </div>
      </div>
    );
  }
  // fallback for other generic pages
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Content for {title} ({path})</p>
      </div>
    </div>
  );
};

export default GenericPage;