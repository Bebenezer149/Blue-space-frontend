import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

function DeletePrompt({ 
  setDeleteOpen, 
  id, 
  deleteProduct, 
  productName = "Product" 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
     
      setDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setDeleteOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <TrashIcon />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Delete Product</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          
          <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700 font-medium text-center">
              {productName}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
          <DeleteButton 
            isLoading={isLoading} 
            onClick={handleDelete} 
          />
          <CancelButton 
            isLoading={isLoading} 
            onClick={handleClose} 
          />
        </div>

        {/* Close button */}
        <CloseButton 
          isLoading={isLoading} 
          onClick={handleClose} 
        />
      </div>
    </div>
  );
}

// Sub-components for better organization
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-red-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const DeleteButton = ({ isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`
      flex-1 px-4 py-2.5 
      ${isLoading ? "bg-red-400" : "bg-red-500 hover:bg-red-600"}
      text-white rounded-lg font-medium 
      transition-all duration-200 
      ${!isLoading && "transform hover:scale-[1.02] active:scale-[0.98]"}
      shadow-md hover:shadow-lg 
      cursor-pointer disabled:cursor-not-allowed
      flex items-center justify-center gap-2
    `}
  >
    {isLoading ? (
      <>
        <LoadingSpinner />
        Deleting...
      </>
    ) : (
      "Delete Product"
    )}
  </button>
);

const CancelButton = ({ isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Cancel
  </button>
);

const CloseButton = ({ isLoading, onClick }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default DeletePrompt;