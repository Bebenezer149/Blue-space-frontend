import { useState } from "react";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill your email");
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    fetch("https://makola-2.onrender.com/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.success) {
          setSuccessMessage(res.message);
        } else {
          setErrorMessage(res.message || "Unable to send link please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Network error. Please try again.");
        setLoading(false);
      });
  }
  return (
    <div className="bg-blue-400 min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="p-4 sm:p-6 bg-gray-100 rounded-md shadow-md w-full max-w-sm sm:max-w-md flex flex-col items-center">
        <h1 className="font-semibold text-lg sm:text-xl text-blue-600 text-center">
          Forgot Password ?
        </h1>
        <p className="text-gray-500 text-sm sm:text-base text-center mt-2">
          Let us know your email and we'll send you a reset link.
        </p>
        {errorMessage && (
          <div className="p-3 w-full mt-3 border border-red-600 bg-red-100 rounded-lg text-red-600 text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 w-full mt-3 border border-green-600 bg-green-100 rounded-lg text-green-600 text-sm">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className="w-full">
            <label
              className="flex font-semibold items-start text-sm sm:text-base"
              htmlFor=""
            >
              Email
            </label>
            <input
              className="w-full border p-2 mt-1 rounded-md outline-none text-sm sm:text-base"
              placeholder="name@example.com"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full mt-4 sm:mt-6">
            <button className="font-semibold bg-blue-500 cursor-pointer hover:bg-blue-700 text-white rounded-md w-full p-2 text-sm sm:text-base transition-colors duration-200">
              {loading ? (
                <div className="flex justify-center items-center gap-4">
                  <h1>Sending</h1>
                  <div className="p-1 rounded-full h-4 w-4 animate-spin border-t-2 border-white"></div>
                </div>
              ) : (
                <div>Send Link</div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
