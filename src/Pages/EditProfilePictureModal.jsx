import { useState, useEffect } from "react";

function EditProfilePictureModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");
  const totalSteps = 2;

  // Trigger enter animation on mount
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerImage(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", uploadPreset);

    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudForm,
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }
      return res.json();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bannerImage && !profileImage) return;

    setIsSubmitting(true);
    setError(null);

    const uploads = [];
    if (bannerImage) uploads.push(uploadToCloudinary(bannerImage));
    if (profileImage) uploads.push(uploadToCloudinary(profileImage));

    Promise.all(uploads)
      .then((results) => {
        let bannerUrl = null;
        let profileUrl = null;
        let index = 0;

        if (bannerImage) {
          bannerUrl = results[index].secure_url;
          index++;
        }
        if (profileImage) {
          profileUrl = results[index].secure_url;
        }

        // Only include keys for images that were actually changed
        const payload = {};
        if (bannerUrl) payload.banner = bannerUrl;
        if (profileUrl) payload.profile_picture = profileUrl;

        return fetch("https://makola-2.onrender.com/api/update-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update profile");
        }
        return res.json();
      })
      .then((data) => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className={`relative bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 sm:p-8 transition-all duration-300 ease-out ${
          show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-200"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {step === 1 ? "Update Banner Image" : "Update Profile Picture"}
        </h3>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i + 1 <= step ? "bg-indigo-600" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        {/* Step 1: Banner */}
        {step === 1 && (
          <div className="mb-6 animate-[fadeSlideIn_0.3s_ease-out]">
            <div className="w-full aspect-[3/1] rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden mb-4 transition-all duration-300">
              {bannerPreview ? (
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full h-full object-cover animate-[fadeIn_0.4s_ease-out]"
                />
              ) : (
                <span className="text-sm font-medium">No banner uploaded</span>
              )}
            </div>

            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl py-6 px-4 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-200">
              <span className="text-sm text-gray-500 mb-1">
                Click to upload a new banner
              </span>
              <span className="text-xs text-gray-400">
                PNG or JPG, recommended 1200x400px, up to 5MB
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />
            </label>
          </div>
        )}

        {/* Step 2: Profile picture */}
        {step === 2 && (
          <div className="mb-6 animate-[fadeSlideIn_0.3s_ease-out]">
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-semibold text-indigo-600 overflow-hidden transition-all duration-300">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover animate-[fadeIn_0.4s_ease-out]"
                  />
                ) : (
                  "JD"
                )}
              </div>
            </div>

            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-xl py-6 px-4 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-200">
              <span className="text-sm text-gray-500 mb-1">
                Click to upload a new photo
              </span>
              <span className="text-xs text-gray-400">
                PNG or JPG, up to 5MB
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileChange}
              />
            </label>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mb-4 animate-[fadeIn_0.2s_ease-out]">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-150 order-3 sm:order-1"
          >
            Cancel
          </button>

          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-150"
              >
                Back
              </button>
            )}

            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-150"
              >
                Next
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keyframes for step/content animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default EditProfilePictureModal;