function EditProfileModal({ data, onClose }) {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Update Profile Info
        </h3>

        
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={`${data.first_name + " "  + data.last_name}`}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Business Name
            </label>
            <input
              type="text"
              defaultValue={`${data.last_name}`}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue={`${data.phone_number}`}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={`${data.email}`}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;