import Logo from "../ui/icons/Logo";
import SideBarContent from "./SideBarContent";
import { TwitterIcon } from "../ui/icons/TwitterIcon";
import YoutubeIcon from "../ui/icons/YoutubeIcon";
import { DashboardIcon } from "../ui/icons/Dashboard";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import { toast } from "react-toastify";

interface SideBarProps {
  onClick: () => void;
  toggleSidebar: boolean;
  setContentType: React.Dispatch<React.SetStateAction<ContentType>>;
}

type ContentType = "youtube" | "tweet" | "all";

export const SideBar = ({
  onClick,
  toggleSidebar,
  setContentType,
}: SideBarProps) => {
  const handleSetContent = (type: ContentType) => {
    setContentType(type);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");

    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <div
      className={`${
        toggleSidebar
          ? "w-[72px] sm:flex justify-center hidden"
          : "w-64 flex flex-col "
      } :  h-screen p-4 flex flex-shrink-0 bg-white fixed justify-between  top-0 left-0 z-[99] `}
    >
      <div className="w-full h-ful flex flex-col gap-4">
        <div
          onClick={onClick}
          className=" cursor-pointer flex items-center gap-3"
        >
          <Logo className="size-10 text-blue-600" />
          {!toggleSidebar && (
            <p className="font-bold font-inter text-2xl">DropBrain</p>
          )}
        </div>
        <span onClick={() => handleSetContent("all")}>
          <SideBarContent
            toggleSidebar={toggleSidebar}
            svgIcon={<DashboardIcon />}
            text="Dashboard"
          />
        </span>
        <span onClick={() => handleSetContent("youtube")}>
          <SideBarContent
            toggleSidebar={toggleSidebar}
            svgIcon={<YoutubeIcon />}
            text="Youtube"
          />
        </span>
        <span
          className="h-full flex flex-col justify-between"
          onClick={() => handleSetContent("tweet")}
        >
          <SideBarContent
            toggleSidebar={toggleSidebar}
            svgIcon={<TwitterIcon />}
            text="Tweets"
          />

          {toggleSidebar && (
            <span className="py-6">
              <Buttons
                onClick={handleLogout}
                variant="primary"
                text="Logout"
                fullwidth={true}
              />
            </span>
          )}
        </span>
      </div>

      {toggleSidebar ? (
        ""
      ) : (
        <span className="py-6">
          <Buttons
          onClick={handleLogout}
          variant="primary"
          text="Logout"
          fullwidth={true}
        />
        </span>
      )}
    </div>
  );
};
