import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Trash2, Info, CheckCircle, XCircle } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", 
  icon: CustomIcon,
  isDeleting = false,
  children = null, 
  confirmButtonVariant = "primary",
  showCancel = true,
  size = "md" 
}) => {
  if (!isOpen) return null;


  const getDefaultIcon = () => {
    switch (type) {
      case "danger":
        return Trash2;
      case "warning":
        return AlertTriangle;
      case "info":
        return Info;
      case "success":
        return CheckCircle;
      default:
        return AlertTriangle;
    }
  };

  const Icon = CustomIcon || getDefaultIcon();


  const getColorScheme = () => {
    switch (type) {
      case "danger":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          buttonBg: "bg-red-600 hover:bg-red-700",
          buttonBorder: "border-red-600 hover:border-red-700"
        };
      case "warning":
        return {
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          buttonBg: "bg-orange-600 hover:bg-orange-700",
          buttonBorder: "border-orange-600 hover:border-orange-700"
        };
      case "info":
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          buttonBorder: "border-blue-600 hover:border-blue-700"
        };
      case "success":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          buttonBg: "bg-green-600 hover:bg-green-700",
          buttonBorder: "border-green-600 hover:border-green-700"
        };
      default:
        return {
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
          buttonBg: "bg-gray-600 hover:bg-gray-700",
          buttonBorder: "border-gray-600 hover:border-gray-700"
        };
    }
  };

  const colors = getColorScheme();


  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "lg":
        return "max-w-2xl";
      default:
        return "max-w-lg";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      className={getSizeClass()}
    >
      <div className="space-y-4">
        
        <div className="flex justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${colors.iconBg}`}>
            <Icon className={`w-8 h-8 ${colors.iconColor}`} />
          </div>
        </div>

        
        <div className="text-center space-y-2">
          {children ? (

            children
          ) : (

            <p className="text-gray-600">
              {message}
            </p>
          )}
        </div>

        
        <div className="flex justify-end space-x-3 pt-4">
          {showCancel && (
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`px-4 py-2 ${colors.buttonBg} ${colors.buttonBorder}`}
            startIcon={type === "danger" ? <Trash2 className="w-4 h-4" /> : undefined}
          >
            {isDeleting ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal; 