import { SideBar } from "../componensts/SideBar";
import Cards from "../componensts/Cards";
import Buttons from "../componensts/Buttons";
import PlusIcon from "../ui/icons/PlusIcon";
import ShareIcon from "../ui/icons/ShareIcon";
import PaperClick from "../ui/icons/PaperClick";
import { CloseIcon } from "../ui/icons/CloseIcon";
import { useContent } from "../hooks/useContent";
import { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../ui/icons/Logo";

import ContentModal from "../componensts/ContentModal";
import axios from "axios";
import { BACKEND_URL, APP_URL } from "../config";

type ContentType = "youtube" | "tweet" | "all";

export const DashBoard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contentRemoved, setContentRemoved] = useState(false);
  const [contentAdded, setContentAdded] = useState(false);
  const [share, setShare] = useState(false);
  const [shareHash, setShareHash] = useState("");
  const [contentType, setContentType] = useState<ContentType>("all");
  const [loadContent, setLoadContent] = useState(false);

  const { contents, refresh }: { contents: Content[]; refresh: () => void } = useContent();

  interface Tag {
    _id: string;
    title: string;
  }
  
  interface User {
    _id: string;
    username: string;
  }
  
  interface Content {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "tweet";
    tags: Tag[];
    userId: User;
    __v: number;
  }
  
  

  // Filtered Content
  const filteredContent = useMemo(() => {
    switch (contentType) {
      case "tweet":
        return contents.filter((content) => content.type === "tweet");
      case "youtube":
        return contents.filter((content) => content.type === "youtube");
      default:
        return contents;
    }
  }, [contents, contentType]);

  useEffect(() => {
    if (contentRemoved || contentAdded) refresh();
    setContentAdded(false);
    setContentRemoved(false);
  }, [contentAdded, contentRemoved, refresh]);

  useEffect(() => {
    setTimeout(() => {
      setLoadContent(true);
    }, 2000);
  }, [filteredContent]);

  const handleToggleSidebar = () => {
    console.log("toggleSidebar", toggleSidebar);
    setToggleSidebar(!toggleSidebar);
  };

  const handleShare = async () => {
    toast.dismiss();
    await axios
      .post(
        `${BACKEND_URL}/brain/share`,
        {
          share: "true",
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setShareHash(res.data.hash);
        setShare(true);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const closeShare = async () => {
    toast.dismiss();
    await axios
      .post(
        `${BACKEND_URL}/brain/share`,
        {
          share: false,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        toast.success("Shared link closed");
        setShareHash("");
        setShare(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="flex relative flex-col sm:flex-row min-h-screen bg-blue-200">
      <SideBar
        setContentType={setContentType}
        onClick={handleToggleSidebar}
        toggleSidebar={toggleSidebar}
      />
      <div
        id="small-screen-navbar"
        className="bg-white h-[72px] w-full px-4 sm:hidden flex fixed top-0 left-0 z-[99] "
      >
        <div
          onClick={handleToggleSidebar}
          className=" cursor-pointer flex items-center gap-3"
        >
          <Logo className="size-10 text-blue-600" />
          <p className="font-bold font-inter text-2xl">DropBrain</p>
        </div>
      </div>
      <div
        className={`flex  font-inter relative ${
          toggleSidebar ? "sm:ml-[72px]" : "sm:ml-64"
        } w-full mt-[72px] sm:mt-0 `}
      >
        <div className="relative flex flex-col w-full min-h-screen">
          <div className="flex flex-col sm:flex-row justify-end gap-3 py-5 px-4 fixed bottom-0 right-0 z-[10]">
            {share && (
              <div className="bg-blue-600 text-white w-full text-sm sm:text-base  sm:w-[512px] p-4 rounded-md">
                <p className="text-sm flex items-center gap-1 mb-1">
                  <PaperClick />{" "}
                  <span className="flex justify-between w-full">
                    {" "}
                    Your Link
                    <span onClick={closeShare}>
                      <CloseIcon className="size-5 text-red-500 cursor-pointer" />
                    </span>
                  </span>{" "}
                </p>
                <div className="text-blue-900 bg-blue-400 ">
                  {APP_URL}/brain/{shareHash}
                </div>
              </div>
            )}
            <span className="flex justify-end gap-3 py-5 px-4 z-[99]">
              <Buttons
                startIcon={<PlusIcon />}
                text="Add Content"
                variant="primary"
                onClick={() => setModalOpen(true)}
              />
              <Buttons
                startIcon={<ShareIcon className="size-5" />}
                text="Share"
                variant="secondary"
                onClick={handleShare}
              />
            </span>
          </div>

          {contents.length === 0 ? (
            <div className="text-9xl text-blue-600 w-full h-screen flex justify-center items-center">
              Drop Your Brain.
            </div>
          ) : loadContent ? (
            <div className="flex flex-wrap gap-4 p-4 overflow-auto pb-20 sm:justify-start justify-center">
              {filteredContent.map(({ _id, type, link, title, tags }) => (
                <Cards
                  setContentRemoved={setContentRemoved}
                  key={_id}
                  id={_id}
                  type={type}
                  link={link}
                  title={title}
                  tags={tags}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-9xl text-blue-600 w-full h-screen flex justify-center items-center">
              Loading...
            </h1>
          )}
        </div>
      </div>
      <ContentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setContentAdded={setContentAdded}
      />
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
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

export default DashBoard;
