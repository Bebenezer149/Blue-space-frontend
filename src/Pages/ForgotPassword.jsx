import { useState } from "react";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [email, setEmail] = useState("")
    
   function handleSubmit(e){
    e.preventDefault()

    if (!email) {
        toast.error("Please fill your email")
        return
    }

    fetch('https://makola-2.onrender.com/api/forgot-password',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify({ email })
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message || "Something went wrong")
        }
    })
    .catch(err=>{
        console.log(err)
        toast.error("Network error. Please try again.")
    })
   } 
  return (
    <div className="bg-blue-400 min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="p-4 sm:p-6 bg-gray-100 rounded-md shadow-md w-full max-w-sm sm:max-w-md flex flex-col items-center">
        <h1 className="font-semibold text-lg sm:text-xl text-blue-600 text-center">
          Forgot Password ?
        </h1>
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className="w-full">
            <label className="flex font-semibold items-start text-sm sm:text-base" htmlFor="">
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
              Send Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
