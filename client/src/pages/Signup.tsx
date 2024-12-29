import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import Logo from "../ui/icons/Logo";
import Buttons from "../componensts/Buttons";
import { EyeCLose } from "../ui/icons/EyeCLose";
import { EyeOpen } from "../ui/icons/EyeOpen";
import { BACKEND_URL } from "../config";

interface SignupResponse {
  status: 'success' | 'error';
  message: string;
  errors?: Array<{ message: string }>;
}

export const Signup: React.FC = () => {
  const [passwordHide, setPasswordHide] = useState<boolean>(true);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post<SignupResponse>(`${BACKEND_URL}/auth/signup`, {
        username,
        password,
      });

      // Type-safe toast method call
      toast[response.data.status](response.data.message, {
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors = (err.response?.data as SignupResponse)?.errors;
        if (errors && Array.isArray(errors)) {
          errors.forEach((error) => {
            toast.error(error.message);
          });
        }
      }
      toast.error("Signup failed. Check your credentials.");
    }
  };

  return (
    <div className="bg-blue-100 w-screen h-screen relative flex items-center justify-center font-inter">
      <div className="bg-white p-10 max-w-96 w-full rounded-xl">
        <h1 className="flex items-center bg-white sm:bg-transparent gap-3 p-5 flex-col w-full justify-center">
          <span>
            <Logo className="size-16 text-blue-700" />
          </span>
          <p className="text-2xl">SIGN UP</p>
        </h1>
        <form className="flex flex-col gap-7">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              ref={usernameRef}
              className="pl-4 h-10 outline-none border-2 border-blue-700 rounded-md"
              type="text"
              id="username"
              placeholder="demonMan"
            />
          </div>
          <div className="flex flex-col relative w-full h-full">
            <label className="text-sm text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              ref={passwordRef}
              className="pl-4 h-10 outline-none border-2 rounded-md border-blue-700"
              type={passwordHide ? "password" : "text"}
              id="password"
              placeholder="Demo@12345"
            />
            <span
              className="w-5 absolute top-[30px] right-4 cursor-pointer"
              onClick={() => setPasswordHide(!passwordHide)}
            >
              {passwordHide ? <EyeCLose /> : <EyeOpen />}
            </span>
          </div>
          <div>
            <p className="text-sm py-2 text-gray-700">
              Already have an account?{" "}
              <span className="text-blue-700 hover:underline">
                <Link to="/signin">Login</Link>
              </span>
            </p>
            <Buttons
              text="SIGN UP"
              variant="primary"
              onClick={handleSignup}
              fullwidth={true}
              loading={false}
            />
          </div>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
};