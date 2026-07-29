function EditBannerImageModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Update Banner Image
        </h3>

        {/* Current / preview image */}
        <div className="w-full aspect-[3/1] rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden mb-6">
          <span className="text-sm font-medium">No banner uploaded</span>
        </div>

        {/* Upload area */}
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl py-6 px-4 cursor-pointer hover:border-indigo-300 transition-colors mb-6">
          <span className="text-sm text-gray-500 mb-1">
            Click to upload a new banner
          </span>
          <span className="text-xs text-gray-400">
            PNG or JPG, recommended 1200x400px, up to 5MB
          </span>
          <input type="file" accept="image/*" className="hidden" />
        </label>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
            Save Banner
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBannerImageModal;