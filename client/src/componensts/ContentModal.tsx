import { Input } from "./Input";
import { CloseIcon } from "../ui/icons/CloseIcon";
import Buttons from "./Buttons";
import { toast } from "react-toastify";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const ContentModal = ({
  modalOpen,
  setModalOpen,
  setContentAdded,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setContentAdded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);  // Correctly typed for input elements
  const linkRef = useRef<HTMLInputElement>(null);  // Correctly typed for input elements
  const typeRef = useRef<HTMLSelectElement>(null);  // Correctly typed for select element
  const tagRef = useRef<HTMLInputElement>(null);  // Correctly typed for input elements

  const handleSubmitContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;
    const tag = tagRef.current?.value;

    if (!title || !link || !type || !tag) {
      toast.error("Please fill all the fields");
      return;
    }

    const tags  = tag?.split(",").map((tag) => tag.trim());   

    await axios.post(`${BACKEND_URL}/content`,{
      title,
      link,
      type,
      tags
    },{
      headers:{
        Authorization : localStorage.getItem("token")
      }
    }).then(res=>{
      toast.success(res.data.message);
      setContentAdded(true);
      setTimeout(()=>{setModalOpen(false)},1500);
    }).catch(err=>{
      toast.error(err.response.data.message);
    })

  };

  return (
    <>
      {modalOpen && (
        <div className="bg-blue-500 bg-opacity-50 fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-white flex flex-col gap-3 font-inter ring-black ring-2 rounded-md p-4 max-w-lg w-full">
            <p className="flex items-center justify-between">
              Post Content
              <span onClick={() => setModalOpen(false)}>
                <CloseIcon className="size-6 text-red-500 cursor-pointer" />
              </span>
            </p>
            <div className="flex flex-col gap-3">
              <Input reference={titleRef} className="w-full" placeholder="Enter Content Title"></Input>
              <Input reference={linkRef} className="w-full" placeholder="Enter Content Link"></Input>
              <span className="flex gap-3 items-center w-full justify-between">
                <span className="flex items-center gap-3 w-full">
                  <select
                    ref={typeRef}
                    title="Content Type"
                    className="px-4 py-2 outline-none border rounded-md w-full"
                    name="type"
                    id="type"
                  >
                    <option className="px-4 py-2 h-10" value="tweet">
                      Tweet
                    </option>
                    <option className="px-4 py-2" value="youtube">
                      Youtube Video
                    </option>
                  </select>
                </span>
                <span className="w-full">
                  <input
                    ref={tagRef}
                    type="text"
                    id="tagsinput"
                    placeholder="Enter Tags"
                    className="px-4 py-2 outline-none border rounded-md"
                  />
                </span>
              </span>
            </div>
            <Buttons onClick={handleSubmitContent} text="Submit" variant="primary" fullwidth={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default ContentModal;
