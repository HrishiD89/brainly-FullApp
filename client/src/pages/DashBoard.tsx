import { SideBar } from "../componensts/SideBar";
import Cards from "../componensts/Cards";
import Buttons from "../componensts/Buttons";
import PlusIcon from "../ui/icons/PlusIcon";
import ShareIcon from "../ui/icons/ShareIcon";
import { useContent } from "../hooks/useContent";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ContentModal from "../componensts/ContentModal";
// import ShareModal from "../componensts/ShareModal";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const DashBoard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // const [shareModalOpen, setShareModalOpen] = useState(false);
  const [contentRemoved, setContentRemoved] = useState(false);
  const [contentAdded, setContentAdded] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    if (contentRemoved || contentAdded) refresh();
    setContentAdded(false);
    setContentRemoved(false);
  }, [contentAdded, contentRemoved, refresh]);

  const handleToggleSidebar = () => {
    console.log("toggleSidebar", toggleSidebar);
    setToggleSidebar(!toggleSidebar);
  };

  const handleShare = ()=>{
    axios.post(`${BACKEND_URL}/brain/share`,{
      share : "true"
    },{
      headers:{
        Authorization : localStorage.getItem("token")
      }
    }).then(res=>{
      toast.success(res.data.message);
    }).catch(err=>toast.error(err.response.data.message));
  }


  if (contents.length === 0) {
    return (
      <div className="text-9xl w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  

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
            <Buttons
              startIcon={<PlusIcon />}
              text="Add Content"
              variant="primary"
              onClick={() => setModalOpen(true)}
            />
            <Buttons
              startIcon={<ShareIcon />}
              text="Share"
              variant="secondary"
              onClick={handleShare}
            />
          </div>

          <div className="flex flex-wrap gap-4 p-4 overflow-auto">
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
        </div>
      </div>
      {/* <ShareModal shareModalOpen={shareModalOpen} setShareModalOpen={setShareModalOpen}/>  */}
      <ContentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setContentAdded={setContentAdded}
      />
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
  );
};

export default DashBoard;
