import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setAccessToken } from "../../features/auth/authSlice";
import { signUp, verifyOtp } from "../../api/authAPI";
import Button from "../Common/Button";

export default function Signup() {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [loginCredentials, setloginCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    password: "",
    is_merchant: 1,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const validatePasswords = () => {
    if (loginCredentials.password !== confirmPassword) {
      setPasswordError("Passwords do not match :(");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const togglePasswordField = () => {
    const input = passwordRef.current;
    const newState = !showPassword;
    input.type = newState ? "text" : "password";
    setShowPassword(newState);
  };

  const handleSubmit = async (e) => {
    // TODO: Loadder and disable the button
    e.preventDefault();

    // Match the password and re password
    if (validatePasswords()) {
      // TODO: encrypt the password

      // Calling Backend API
      try {
        const res = await signUp(loginCredentials); // just pass the state object directly

        // dispatch(setAccessToken({ accessToken: res.data.accessToken }));
        // navigate(res.data.redirectTo);

        if (res.data.status) setOtpSent(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOTPComplete = async (otp) => {
    const data = { email: loginCredentials.email, otp };
    const res = await verifyOtp(data);
    dispatch(setAccessToken({ accessToken: res.data.accessToken }));
    navigate(res.data.redirectTo);
  };

  const handleOAuth = () => {
    window.open(`http://localhost:8080/api/auth/google?userType=1`, "_self");
  };

  const OTPInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputs = useRef([]);

    const handleChange = (e, index) => {
      const { value } = e.target;
      if (!/^\d?$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputs.current[index + 1].focus();
      }

      if (newOtp.every((v) => v !== "")) {
        onComplete?.(newOtp.join(""));
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        e.preventDefault(); // prevent default delete
        const newOtp = [...otp];
        if (otp[index] === "" && index > 0) {
          inputs.current[index - 1].focus();
        } else {
          newOtp[index] = "";
          setOtp(newOtp);
        }
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").trim();

      if (!/^\d+$/.test(pasteData)) return; // only digits

      const pasteArray = pasteData.split("").slice(0, length);
      const newOtp = [...otp];

      for (let i = 0; i < length; i++) {
        newOtp[i] = pasteArray[i] || "";
      }

      setOtp(newOtp);

      if (pasteArray.length === length) {
        onComplete?.(pasteArray.join(""));
      }
    };

    return (
      <div className="flex justify-center">
        {otp.map((digit, index) => (
          <input
            className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded focus:outline-green-800"
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background" id="sign-up">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-2xl w-full">
          {/* <Link to="javascript:void(0)">
            <img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40 mb-8 mx-auto block" />
          </Link> */}
          <Link
            className="block mb-8 mx-auto text-center text-3xl font-bold font-[cursive] text-primary"
            to="/"
          >
            FreshFromFarm
          </Link>

          <div className="bg-muted-background p-4 rounded-2xl shadow">
            {!otpSent ? (
              <>
                <p className="text-foreground text-center text-2xl font-semibold">
                  Sign up into your account
                </p>
                <form
                  method="POST"
                  onSubmit={handleSubmit}
                  encType={"application/x-www-form-urlencoded"}
                  className="mt-3 space-y-2 "
                >
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-foreground text-sm font-medium mb-2 block"
                      >
                        First Name
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="first_name"
                          name="first_name"
                          type="text"
                          autoComplete="given-name"
                          className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-green-800"
                          placeholder="Alex"
                          onChange={(e) =>
                            setloginCredentials((prevState) => ({
                              ...prevState,
                              first_name: e.target.value,
                            }))
                          }
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="#bbb"
                          className="w-4 h-4 absolute right-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="10"
                            cy="7"
                            r="6"
                            data-original="#000000"
                          ></circle>
                          <path
                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-foreground text-sm font-medium mb-2 block"
                      >
                        Last Name
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="last_name"
                          name="last_name"
                          type="text"
                          autoComplete="family-name"
                          className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-green-800"
                          placeholder="Dev"
                          onChange={(e) =>
                            setloginCredentials((prevState) => ({
                              ...prevState,
                              last_name: e.target.value,
                            }))
                          }
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="#bbb"
                          className="w-4 h-4 absolute right-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="10"
                            cy="7"
                            r="6"
                            data-original="#000000"
                          ></circle>
                          <path
                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-foreground text-sm font-medium mb-2 block"
                      >
                        Email
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-green-800"
                          placeholder="abc@xyz.com"
                          onChange={(e) =>
                            setloginCredentials((prevState) => ({
                              ...prevState,
                              email: e.target.value,
                            }))
                          }
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#bbb"
                          stroke="#bbb"
                          className="hs-XqwWvWI-d38fc7b22d18hs-XqwWvWI- w-4 hs-XqwWvWI-d38fc7b22dhs-XqwWvWI- hs-XqwWvWI-44f58bcbb718hs-XqwWvWI- h-4 hs-XqwWvWI-44f58bcbb7hs-XqwWvWI- hs-XqwWvWI-763ded78b918hs-XqwWvWI- absolute hs-XqwWvWI-763ded78b9hs-XqwWvWI- hs-XqwWvWI-abafed64de18hs-XqwWvWI- right-4 hs-XqwWvWI-abafed64dehs-XqwWvWI-"
                          viewBox="0 0 682.667 682.667"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              />
                            </clipPath>
                          </defs>
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.33 0 0 -1.33 0 682.667)"
                          >
                            <path
                              fill="none"
                              strokeMiterlimit="10"
                              strokeWidth="40"
                              d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                              data-original="#000000"
                            />
                            <path
                              d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                              data-original="#000000"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="mobile-no"
                        className="text-foreground text-sm font-medium mb-2 block"
                      >
                        Mobile No.
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="mobile-no"
                          name="mobile-no"
                          type="tel"
                          autoComplete="auto"
                          className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-green-800"
                          placeholder="1234567890"
                          onChange={(e) =>
                            setloginCredentials((prevState) => ({
                              ...prevState,
                              mobile_no: e.target.value,
                            }))
                          }
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          fillOpacity="0.4"
                          stroke="#bbb"
                          className="w-4 h-4 absolute right-4"
                          viewBox="0 0 15 15"
                        >
                          <path
                            d="M6 11.5H9M3.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V1.5C12.5 0.947715 12.0523 0.5 11.5 0.5H3.5C2.94772 0.5 2.5 0.947716 2.5 1.5V13.5C2.5 14.0523 2.94772 14.5 3.5 14.5Z"
                            stroke="#bbb"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="text-foreground text-sm font-medium mb-2 block"
                      >
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          ref={passwordRef}
                          id="password"
                          name="password"
                          type="password"
                          className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-green-800"
                          placeholder="* * * * * *"
                          onChange={(e) =>
                            setloginCredentials((prevState) => ({
                              ...prevState,
                              password: e.target.value,
                            }))
                          }
                        />
                        {showPassword ? (
                          <svg
                            onClick={togglePasswordField}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#bbb"
                            stroke="#bbb"
                            className="w-4 h-4 absolute right-4 cursor-pointer"
                            viewBox="0 0 128 128"
                          >
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            />
                            <line
                              x1="20"
                              y1="20"
                              x2="108"
                              y2="108"
                              stroke="#bbb"
                              strokeWidth="8"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            onClick={togglePasswordField}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#bbb"
                            stroke="#bbb"
                            className="w-4 h-4 absolute right-4 cursor-pointer"
                            viewBox="0 0 128 128"
                          >
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="text-foreground text-sm font-medium mb-2 block"
                      >
                        Confirm Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          id="cpassword"
                          name="cpassword"
                          type="password"
                          className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md focus:outline-green-800"
                          placeholder="* * * * * *"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {passwordError && (
                    <p className="text-red-600 text-center font-semibold bg-rose-200 rounded-md ">
                      {passwordError}
                    </p>
                  )}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full min-h-10 px-8 rounded-md my-2"
                      // type="submit"
                      // className="w-full py-2 px-4 border text-[15px] font-medium tracking-wide rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer dark:bg-gray-950"
                    >
                      Sign up
                    </Button>
                  </div>
                  <p className="text-foreground text-sm text-center">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-primary dark:text-white hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Sign In
                    </Link>
                  </p>
                </form>
                <div className="space-y-3 mt-3">
                  <div className="divider">
                    <span className="text-sm text-foreground px-2">
                      Or Continue With
                    </span>
                  </div>

                  <div
                    className="g-signin2"
                    data-onsuccess="onSignIn"
                    data-theme="dark"
                  >
                    <Button
                      onClick={handleOAuth}
                      variant="contrast"
                      size="sm"
                      className="w-full min-h-10 px-8 rounded-md"
                    >
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                      <span>Google</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="dark:text-white text-2xl font-semibold">
                    We sent you a code
                  </h2>
                  <p className="dark:text-gray-300 text-lg">
                    Enter the 6-digit code we sent to your email.
                  </p>
                  <OTPInput
                    length={6}
                    onComplete={(otp) => handleOTPComplete(otp)}
                  />
                  {/* <input placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} /> */}
                  {/* <button
                    type="submit"
                    className="py-2 px-4 border text-[15px] font-medium tracking-wide rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer dark:bg-gray-950 dark:hover:bg-gray-900"
                    // onClick={}
                  >
                    Resend OTP
                  </button> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
