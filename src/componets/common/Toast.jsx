import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, options = {}) => {
  toast(message, { position: 'top-right', autoClose: 3000, ...options });
};

const Toast = () => <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;

export default Toast; 