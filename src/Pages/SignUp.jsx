import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState("");
  //   const [user, setUser]= useState({})

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordConfirmation !== password) {
      setMessage("Passwords do not match");
    } else {
      const data = {
        first_name: firstName,
        last_name: lastName,
        business_name: businessName,
        phone_number: phoneNumber,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      };

      fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);

          setFirstName("");
          setLastName("");
          setBusinessName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          setPasswordConfirmation("");
          localStorage.setItem("token", res.token);
          setMessage("Account created successfully")
          setSuccess(true);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setMessage("Something went wrong");
          setErrorMessage(true);
        });
    }
  }

  return (
    <div className="h-screen bg-blue-400 flex justify-center items-center">
      <div className=" bg-white w-[600px] rounded-lg shadow-md flex items-center justify-center  px-6 flex-col py-4 gap-4">
        <h1 className="font-semibold text-2xl">Get An Account</h1>
        {success && (
          <div className="p-4 border  rounded-lg border-green-500 bg-green-200  text-green-500">
            <h1 className="flex gap-2">
             {
                message
             }
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </h1>
          </div>
        )}
        {errorMessage && (
          <div className="p-4 border  rounded-lg border-red-500 bg-red-200  text-red-500">
            <h1 className="flex gap-2">
              {message}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </h1>
          </div>
        )}
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          {/* First Name + Last Name */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label>First Name</label>
              <input
                className="border px-2 outline-none rounded-md h-8"
                type="text"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label>Last Name</label>
              <input
                className="border px-2 outline-none rounded-md h-8"
                type="text"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Business Name + Email */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label>Business Name</label>
              <input
                className="border px-2 outline-none rounded-md h-8"
                type="text"
                name="business_name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label>Email</label>
              <input
                className="border px-2 outline-none rounded-md h-8"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label>Phone Number</label>
            <input
              className="border px-2 outline-none rounded-md h-8"
              type="text"
              name="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Password + Confirm Password */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label>Password</label>
              <input
                className="border px-2 outline-none rounded-md h-8"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label>Confirm Password</label>
              <input
                className="border px-2 outline-none rounded-md h-8"
                type="password"
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-2">
            <h1>Already have an account?</h1>
            <Link to={"/"}>
              <h1 className="cursor-pointer text-blue-400">Sign In</h1>
            </Link>
          </div>

          <button className="border w-full py-2 rounded-md font-semibold bg-blue-400 text-white cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
