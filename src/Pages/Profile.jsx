import { useState, useEffect } from "react";
import Header from "../Components/Header";
import EditProfilePictureModal from "./EditProfilePictureModal";
import EditProfileModal from "./EditProfileModal";
import { API_URL } from "../config";

function Profile() {
  const [isEditPictureOpen, setIsEditPictureOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.user || {});
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setUserData({});
      });
  }, [token]);

  const firstName = userData.first_name || "";
  const lastName = userData.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim() || "User";
  const profilePicture = userData.profile_picture;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Avatar + name section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-semibold text-indigo-600 overflow-hidden">
                {profilePicture ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={profilePicture}
                    alt=""
                  />
                ) : (
                  <span>{firstName.charAt(0).toUpperCase() || "U"}</span>
                )}
              </div>
              <button
                onClick={() => setIsEditPictureOpen(true)}
                className="p-1 absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs hover:bg-indigo-700 transition-colors border-none "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {fullName}
              </h2>
              <p className="text-sm text-gray-500">Store Owner</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Full Name
              </p>
              <p className="text-base text-gray-800">{fullName}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Business Name
              </p>
              <p className="text-base text-gray-800">
                {userData.business_name || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Phone Number
              </p>
              <p className="text-base text-gray-800">
                {userData.phone_number || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Email
              </p>
              <p className="text-base text-gray-800">{userData.email || "—"}</p>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Update Info
            </button>
          </div>
        </div>
      </main>

      <EditProfilePictureModal
        isOpen={isEditPictureOpen}
        onClose={() => setIsEditPictureOpen(false)}
      />
      {isEditProfileOpen && (
        <EditProfileModal
          data={userData}
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}
    </div>
  );
}

export default Profile;

