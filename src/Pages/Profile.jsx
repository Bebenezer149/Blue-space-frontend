import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { toast } from "react-toastify";
import EditProfilePictureModal from "./EditProfilePictureModal";
import EditProfileModal from "./EditProfileModal";

function Profile() {
  const [isEditPictureOpen, setIsEditPictureOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch("https://makola-2.onrender.com/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserData(res.user);
      });
  },[]);

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
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-semibold text-indigo-600">
                <img className="h-full w-full rounded-full object-cover" src={userData.profile_picture} alt="" />
              </div>
              <button
                onClick={() => setIsEditPictureOpen(true)}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs hover:bg-indigo-700 transition-colors border-2 border-white"
              >
                ✎
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {userData.first_name + " " + userData.last_name}
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
              <p className="text-base text-gray-800">
                {" "}
                {userData.first_name + " " + userData.last_name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Business Name
              </p>
              <p className="text-base text-gray-800">
                {" "}
                {userData.business_name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Phone Number
              </p>
              <p className="text-base text-gray-800">{userData.phone_number}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-1">
                Email
              </p>
              <p className="text-base text-gray-800">{userData.email}</p>
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
