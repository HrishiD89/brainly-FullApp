import Logo from "../ui/icons/Logo";
import Buttons from "../componensts/Buttons";
import { EyeCLose } from "../ui/icons/EyeCLose";
import { EyeOpen } from "../ui/icons/EyeOpen";
import { useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


interface SiginResponse {
  status : 'success' | 'error';
  message:string;
  errors?:Array<{message:string}>
  token?:string
}

export const Signin: React.FC = ({setToken}) => {
  const [passwordHide, setPasswordHide] = useState(true);

  // Fix: Set useRef to null initially
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post<SiginResponse>(`${BACKEND_URL}/auth/signin`, {
        username,
        password,
      });
      toast[response.data.status](response.data.message);
      const jwt = response.data.token;
      localStorage.setItem("token", jwt as string);
      setToken(jwt as string);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Signin failed. Check your credentials.");
    }
  };

  return (
    <div className="bg-blue-100 w-screen h-screen relative flex items-center justify-center font-inter">
      <div className="bg-white p-10 max-w-96 w-full rounded-xl">
        <h1 className="flex items-center bg-white sm:bg-transparent gap-3 p-5 flex-col w-full justify-center">
          <span>
            <Logo className="size-16 text-blue-700" />
          </span>
          <p className="text-2xl">BrainDrop</p>
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
          <p className="text-sm py-2 text-gray-700">Don't have an account? <span className="text-blue-700 hover:underline"><Link to="/signup">Sign up</Link></span></p>
          <Buttons
            text="Log in"
            variant="primary"
            onClick={handleSignin}
            fullwidth={true}
            loading={false}
          />
          </div>
        </form>
        <div>
          <ToastContainer
            position="bottom-right"
            autoClose={1500}
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
    </div>
  );
};
