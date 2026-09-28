import { useState } from "react";
function OtpInput({ length, onChangeOTP }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  function handleChange(element, index) {
    // Get the value
    const value = element.value;
    
    // Create a copy of the otp
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      element.nextSibling.focus();
    }
    
    if (!value && index > 0) {
      element.previousSibling.focus();
    }
    
    onChangeOTP(newOtp.join(""));
  }
  
//   const handleBackspace = (element, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = "";
//     setOtp(newOtp);
   

//     if (index > 0) {
//       element.previousSibling.focus();
//     }
//      onChangeOTP(newOtp.join(""));
//   };

  return (
    <div className="flex gap-3 ">
      {otp.map((item, id) => (
        <input
          onChange={(e) => handleChange(e.target, id)}
          key={id}
         
          type="text"
          className="border-2 border-gray-300 rounded-md w-12 h-12"
        />
      ))}
    </div>
  );
}

export default OtpInput;