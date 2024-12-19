import Logo from "../ui/icons/Logo";
import SideBarContent from "./SideBarContent";
import { TwitterIcon } from "../ui/icons/TwitterIcon";
import YoutubeIcon from "../ui/icons/YoutubeIcon";
import { DashboardIcon } from "../ui/icons/Dashboard";

interface SideBarProps {
  onClick: () => void;
  toggleSidebar: boolean;
}

export const SideBar = ({ onClick, toggleSidebar }: SideBarProps) => {
  return (
    <div
      className={`${
        toggleSidebar ? "w-[72px] flex justify-center" : "w-64 flex flex-col"
      } : bg-white h-screen p-4 flex flex-shrink-0 fixed top-0 left-0 z-[99]`}
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
        <SideBarContent toggleSidebar={toggleSidebar} svgIcon={<DashboardIcon/>} text="Dashboard" />
        <SideBarContent toggleSidebar={toggleSidebar} svgIcon={<YoutubeIcon/>} text="Youtube" />
        <SideBarContent toggleSidebar={toggleSidebar} svgIcon={<TwitterIcon/>} text="Tweets" />
      </div>
    </div>
  );
};
