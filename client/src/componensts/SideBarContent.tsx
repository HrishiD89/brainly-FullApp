interface SideBarProps {
  svgIcon: React.ReactNode;
  text: string;
  toggleSidebar: boolean;
}
const SideBarContent = ({ svgIcon, text, toggleSidebar }: SideBarProps) => {
  return (
    <div>
      <div
        className={` ${
          toggleSidebar
            ? "w-full px-3 py-2 justify-center  "
            : "px-3 gap-3 h-full py-2 "
        } flex items-center text-black hover:bg-blue-100 rounded-md cursor-pointer  font-inter`}
      >
        <span>{svgIcon}</span>
        <span>{!toggleSidebar && text}</span>
      </div>
    </div>
  );
};

export default SideBarContent;
