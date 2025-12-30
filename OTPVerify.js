import React, { useRef, useState, useEffect } from "react";
import "./OTPVerify.css";

function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  // ✅ IMPORTANT: verified flag
  const [isVerified, setIsVerified] = useState(false);

  // input refs
  const inputRefs = useRef([]);

  // timer ref
  const timerRef = useRef(null);

  /* ---------------- TIMER START (only once) ---------------- */
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /* ---------------- OTP INPUT CHANGE ---------------- */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* ---------------- BACKSPACE SUPPORT ---------------- */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ---------------- PASTE OTP SUPPORT ---------------- */
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.split("").slice(0, 4);
    while (digits.length < 4) digits.push("");

    setOtp(digits);
    inputRefs.current[3]?.focus();
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 4) {
      setMessage("❌ Please enter complete OTP");
      return;
    }

    // ✅ set verified true (this hides Resend button)
    setIsVerified(true);

    // optional: stop timer
    clearInterval(timerRef.current);
    setTimeLeft(0);

    setMessage(`✅ OTP Verified: ${finalOtp}`);
  };

  /* ---------------- RESEND OTP ---------------- */
  const resendOtp = () => {
    setOtp(["", "", "", ""]);
    setMessage("");
    setIsVerified(false);
    setTimeLeft(30);

    inputRefs.current[0]?.focus();
    startTimer();
  };

  return (
    <div className="otp-card">
      <h2 className="otp-title">🔐 OTP Verification</h2>
      <p className="otp-subtitle">Enter 4-digit OTP</p>

      <div className="otp-box-row" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            className="otp-input"
            value={digit}
            maxLength="1"
            inputMode="numeric"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            disabled={isVerified} // ✅ lock inputs after verify (optional)
          />
        ))}
      </div>

      <div className="btn-row">
        <button
          className="btn btn-verify"
          onClick={verifyOtp}
          disabled={isVerified}
        >
          {isVerified ? "Verified" : "Verify"}
        </button>

        {/* ✅ Resend button: will NOT render after verify */}
        {!isVerified && (
          <button
            className="btn btn-resend"
            disabled={timeLeft > 0}
            onClick={resendOtp}
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend OTP"}
          </button>
        )}
      </div>

      {message && <div className="message">{message}</div>}

      <div className="note">
        <b>useRef</b> is used for input focus + storing timer id without causing
        re-render.
      </div>
    </div>
  );
}

export default OTPVerify;
