# React OTP Verification App (useRef + useEffect)

A modern **OTP Verification UI** built in **React** to demonstrate real-world usage of **useRef** (DOM focus handling) and **useEffect** (timer).  
Includes premium UI, auto-focus, backspace navigation, paste support, and a resend timer.

---

## ✨ Features

- ✅ **4-digit OTP UI**
- ✅ **Auto focus** to next input on typing
- ✅ **Backspace** moves focus to previous input
- ✅ **Paste OTP** (paste full 4 digits at once)
- ✅ **Resend OTP timer** (Resend enabled after countdown)
- ✅ **Resend button hides after successful verification**
- ✅ Clean, responsive, modern CSS design

---

## 🧠 Hooks Used

### `useRef`
Used for:
- Storing input element references to control focus (`.focus()`)
- Storing timer reference (`setInterval`) without unnecessary re-renders

### `useEffect`
Used for:
- Starting and cleaning up the resend timer

---

## 📂 Project Structure

react-otp-verification-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.js
│   │
│   ├── components/
│   │   ├── OTPVerify.js
│   │   └── OTPVerify.css
App.js → Main entry, sirf OTP component call

components/OTPVerify.js → OTP logic (useRef, useEffect, timer, focus)

components/OTPVerify.css → Premium UI styling


README.md → Project documentation

