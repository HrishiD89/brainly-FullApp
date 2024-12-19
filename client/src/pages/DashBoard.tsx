import { SideBar } from "../componensts/SideBar";
import Cards from "../componensts/Cards";
import Buttons from "../componensts/Buttons";
import PlusIcon from "../ui/icons/PlusIcon";
import ShareIcon from "../ui/icons/ShareIcon";
import PaperClick from "../ui/icons/PaperClick";
import { CloseIcon } from "../ui/icons/CloseIcon";
import { useContent } from "../hooks/useContent";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ContentModal from "../componensts/ContentModal";
// import ShareModal from "../componensts/ShareModal";
import axios from "axios";
import { BACKEND_URL, APP_URL } from "../config";

export const DashBoard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contentRemoved, setContentRemoved] = useState(false);
  const [contentAdded, setContentAdded] = useState(false);
  const { contents, refresh } = useContent();
  const [share, setShare] = useState(false);
  const [shareHash, setShareHash] = useState("");

  useEffect(() => {
    if (contentRemoved || contentAdded) refresh();
    setContentAdded(false);
    setContentRemoved(false);
  }, [contentAdded, contentRemoved, refresh]);

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
    <div className="flex relative w-full min-h-screen bg-blue-200">
      <SideBar onClick={handleToggleSidebar} toggleSidebar={toggleSidebar} />

      <div
        className={`flex font-inter relative ${
          toggleSidebar ? "ml-[72px]" : "ml-64"
        } w-full`}
      >
        <div className="relative flex flex-col w-full min-h-screen">
          <div className="flex justify-end gap-3 py-5 px-4 fixed bottom-0 right-0 z-[10]">
            {share && (
              <div className="bg-white w-[512px] p-4 rounded-md">
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
                <div className="bg-blue-100 ">
                  {APP_URL}/brain/{shareHash}
                </div>
              </div>
            )}
            <span className="flex justify-end gap-3 py-5 px-4">
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
              Drop Your Brain...
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 p-4 overflow-auto pb-20">
              {contents.map(({ _id, type, link, title, tags }) => (
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
