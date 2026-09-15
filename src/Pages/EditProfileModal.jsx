import { useState, useEffect } from "react";
import { API_URL } from "../config";

function EditProfileModal({ data, onClose }) {
  const [formData, setFormData] = useState({
    full_name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    business_name: data.business_name || "",
    phone_number: data.phone_number || "",
    email: data.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({
      full_name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      business_name: data.business_name || "",
      phone_number: data.phone_number || "",
      email: data.email || "",
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // split full_name into first_name and last_name
          first_name: formData.full_name.split(" ")[0] || "",
          last_name: formData.full_name
            .split(" ")
            .slice(1) 
            .join(" ")
            .trim() || "",
          business_name: formData.business_name,
          phone_number: formData.phone_number,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`(${response.status}) ${errorData.message || "Failed to update profile"}`);
      }

      const result = await response.json();
      setSuccess("Profile updated successfully!");
      // Optionally close modal after delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p>{success}</p>
          </div>
        )}

        <form  className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Full Name
            </label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Business Name
            </label>
            <input
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Phone Number
            </label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              type="tel"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 cursor-pointer rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;