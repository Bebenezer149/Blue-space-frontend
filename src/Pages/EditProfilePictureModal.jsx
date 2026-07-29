function EditProfilePictureModal({ isOpen, onClose }) {
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
          Update Banner & Profile Picture
        </h3>

        {/* Banner section */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">
            Banner Image
          </p>

          <div className="w-full aspect-[3/1] rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden mb-4">
            <span className="text-sm font-medium">No banner uploaded</span>
          </div>

          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl py-6 px-4 cursor-pointer hover:border-indigo-300 transition-colors">
            <span className="text-sm text-gray-500 mb-1">
              Click to upload a new banner
            </span>
            <span className="text-xs text-gray-400">
              PNG or JPG, recommended 1200x400px, up to 5MB
            </span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Profile picture section */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">
            Profile Picture
          </p>

          <div className="flex justify-center mb-4">
            <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-semibold text-indigo-600 overflow-hidden">
              JD
            </div>
          </div>

          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl py-6 px-4 cursor-pointer hover:border-indigo-300 transition-colors">
            <span className="text-sm text-gray-500 mb-1">
              Click to upload a new photo
            </span>
            <span className="text-xs text-gray-400">
              PNG or JPG, up to 5MB
            </span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors mt-4 sm:mt-4"
          >
            Cancel
          </button>
          <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors mt-4 sm:mt-4">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePictureModal;