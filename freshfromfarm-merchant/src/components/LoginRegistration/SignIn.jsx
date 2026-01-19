import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setAccessToken } from "../../features/auth/authSlice";
import { setUserInitials } from "../../features/user/userSlice";

import { logIn, forgetPassword } from "../../api/authAPI";
import Button from "../Common/Button";

export default function Signin() {
  const dispatch = useDispatch();

  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const [loginCredentials, setloginCredentials] = useState({
    email: "",
    password: "",
    is_merchant: 1,
  });

  const [isForgetPassword, setIsForgetPassword] = useState(false);


  const togglePasswordField = () => {
    const input = passwordRef.current;
    const newState = !showPassword;
    input.type = newState ? "text" : "password";
    setShowPassword(newState);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calling Backend API
    try {
      const res = await logIn(loginCredentials); // just pass the state object directly
      dispatch(setAccessToken({ accessToken: res.data.accessToken }));
      localStorage.setItem("userInitials", res.data.userInitials);
      dispatch(setUserInitials({ userInitials: res.data.userInitials }));
      navigate(res.data.redirectTo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const data = { email: loginCredentials.email }
      await forgetPassword(data)
      setIsForgetPassword(false); // Go back to sign in
    } catch (err) {
      console.error(err);
    }
  }

  const handleOAuth = () => {
    window.open(`http://localhost:8080/api/auth/google?userType=1`, "_self");
  };

  return (
    <div className="bg-background" id="sign-in">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          {/* <Link to="javascript:void(0)">
            <img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-40 mb-8 mx-auto block" />
          </Link> */}
          <Link
            className="text-primary mx-auto mb-8 block text-center font-[cursive] text-3xl font-bold"
            to="/"
          >
            FreshFromFarm
          </Link>

          <div className="bg-muted-background rounded-2xl p-8 ">
            {!isForgetPassword ? (
              <>
                <p className="text-foreground text-center text-2xl font-semibold">
                  Sign in to your account
                </p>
                <form
                  method="POST"
                  onSubmit={handleSubmit}
                  encType={"application/x-www-form-urlencoded"}
                  className="mt-3 space-y-3"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="on"
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
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
                        className="hs-XqwWvWI-d38fc7b22d18hs-XqwWvWI- hs-XqwWvWI-d38fc7b22dhs-XqwWvWI- hs-XqwWvWI-44f58bcbb718hs-XqwWvWI- hs-XqwWvWI-44f58bcbb7hs-XqwWvWI- hs-XqwWvWI-763ded78b918hs-XqwWvWI- hs-XqwWvWI-763ded78b9hs-XqwWvWI- hs-XqwWvWI-abafed64de18hs-XqwWvWI- hs-XqwWvWI-abafed64dehs-XqwWvWI- absolute right-4 h-4 w-4"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path d="M0 512h512V0H0Z" data-original="#000000" />
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
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        ref={passwordRef}
                        id="password"
                        name="password"
                        type="password"
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
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
                          className="absolute right-4 h-4 w-4 cursor-pointer"
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
                          className="absolute right-4 h-4 w-4 cursor-pointer"
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

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded accent-green-600"
                  />
                  <label
                    for="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div> */}
                    <div className="text-sm">
                      <Link
                        to="jajvascript:void(0)"
                        onClick={() => setIsForgetPassword(true)}
                        className="font-semibold text-primary dark:text-white hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full min-h-10 px-8 rounded-md my-2"
                      // type="submit"
                      // className="w-full cursor-pointer rounded-md border bg-green-600 px-4 py-2 text-[15px] font-medium tracking-wide text-white hover:bg-green-700 focus:outline-none dark:!bg-gray-950"
                    >
                      Sign in
                    </Button>
                  </div>
                  <p className="text-center text-sm text-foreground">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="ml-1 whitespace-nowrap font-semibold text-green-600 hover:underline dark:text-white"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
                <div className="mt-3 space-y-3">
                  <div className="divider">
                    <span className="px-2 text-sm text-foreground">
                      Or Continue With
                    </span>
                  </div>

                  <div
                    className="g-signin2"
                    data-onsuccess="onSignIn"
                    data-theme="dark"
                  >
                    <Button
                      variant="contrast"
                      size="sm"
                      className="w-full min-h-10 px-8 rounded-md my-2"
                      // className="w-full rounded-2 flex items-center justify-center gap-2 rounded-md border px-4 py-2 dark:!bg-gray-950"
                      onClick={handleOAuth}
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
                  <p className="dark:text-gray-300 text-lg">
                    Enter your registered email.
                  </p>
                  <form
                    // method="POST"
                    onSubmit={handleForgetPasswordSubmit}
                    encType={"application/x-www-form-urlencoded"}
                    className="mt-3 space-y-3"
                  >
                    <div className="relative flex items-center">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="on"
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
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
                        className="hs-XqwWvWI-d38fc7b22d18hs-XqwWvWI- hs-XqwWvWI-d38fc7b22dhs-XqwWvWI- hs-XqwWvWI-44f58bcbb718hs-XqwWvWI- hs-XqwWvWI-44f58bcbb7hs-XqwWvWI- hs-XqwWvWI-763ded78b918hs-XqwWvWI- hs-XqwWvWI-763ded78b9hs-XqwWvWI- hs-XqwWvWI-abafed64de18hs-XqwWvWI- hs-XqwWvWI-abafed64dehs-XqwWvWI- absolute right-4 h-4 w-4"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path d="M0 512h512V0H0Z" data-original="#000000" />
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
                    <button
                      type="submit"
                      className="py-2 px-4 border text-[15px] font-medium tracking-wide rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer dark:bg-gray-950 dark:hover:bg-gray-900"
                    >
                      Reset Password Link
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
