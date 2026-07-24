import { useState } from "react";
import { toast } from "react-toastify";
function ForgotPassword() {
  const [ email, setEmail]=useState({email:""})
    
   function handleSubmit(e){
    e.preventDefault()

    if(email ===" ")
    {
        toast.error("Please fill your email")
    }

    fetch('https://makola-2.onrender.com/api/forgot-password',{
        method:'POST',
        header:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify(email)
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
    })
   } 
  return (
    <div className="bg-blue-400 min-h-screen flex items-center gap-4 justify-center">
      <div className="p-3 bg-gray-100 rounded-md shadow-md  w-[500px] flex flex-col items-center">
        <h1 className="font-semibold text-xl text-blue-600">
          Forgot Password ?
        </h1>
        <form action="" className="w-full">
               <div className=" w-full m-2 mt-3 p-4">
          <label className="flex font-semibold items-start" htmlFor="">
            Email
          </label>
          <input
            className="w-full border p-2 mt-1  rounded-md outline-none"
            placeholder="name@example.com"
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="px-4 w-full">
          <button onClick={handleSubmit} className="my-2 mx-2 font-semibold bg-blue-500 cursor-pointer hover:bg-blue-700 text-white rounded-md w-full p-2 mx">Send Link</button>
        </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
