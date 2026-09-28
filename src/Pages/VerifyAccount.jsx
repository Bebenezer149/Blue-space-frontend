import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import OtpInput from "../Components/OtpInput/OtpInput";
import { useState } from "react";
import { API_URL } from "../config";
function VerifyAccount({ phone_number }) {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  function onChangeOtp(newOtp) {
    console.log(newOtp);
    setOtpCode(newOtp);
  }



  function verifyOtp() {
    setLoading(true);
    fetch(`${API_URL}/verify-otp?otp=${otpCode}&&phone_number=0539278827`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      
       
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl overflow-hidden flex flex-col md:flex-row my-auto">
        {/* Lottie — shows on top for mobile, on right for md+ */}
        <div className="order-first md:order-last flex items-center justify-center bg-slate-50 p-4 md:p-6 md:flex-1">
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-full md:max-w-[200px] lg:max-w-[280px] md:aspect-square">
            <DotLottieReact
              src="https://lottie.host/3a489ca6-f5c9-4cbe-b00c-4c505c2aa092/yrWhWIBozY.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        {/* OTP section */}
        <div className="flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8 lg:p-10 md:flex-1">
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
              Let's verify You
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Enter the 6-digit code sent to your sms
            </p>
          </div>

          <div className="flex justify-center md:justify-start">
            <OtpInput length={6} onChangeOTP={onChangeOtp} />
          </div>

          <button
            onClick={verifyOtp}
            type="button"
            className="w-full md:w-auto cursor-pointer bg-blue-500 hover:bg-blue-400  text-white text-sm sm:text-base font-medium py-2.5 sm:py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? (
              <div className="flex gap-4 justify-center">
                <h1>Verifying</h1>
                <span className="h-4 w-4 rounded-full p-3 border-b-2 animate-spin"></span>
              </div>
            ) : (
              "Verify"
            )}
          </button>

          <p className="text-[11px] sm:text-xs text-gray-400 text-center md:text-left">
            Didn't receive a code?{" "}
            <button className="text-blue-500 cursor-pointer font-medium hover:underline">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;