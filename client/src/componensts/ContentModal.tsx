import { Input } from "./Input";
import { CloseIcon } from "../ui/icons/CloseIcon";
import Buttons from "./Buttons";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
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
  // const [tag,setTag] = useState([]);

  // async function loadTags() {
  //   const response = await axios.get(`${BACKEND_URL}/tags`);
  //   setTag(response.data.data); // No need to preserve previous state
  //   console.log(tag);
  // }

  // useEffect(()=>{
  //   loadTags();
  // },[])

  const titleRef = useRef<HTMLInputElement>(null); // Correctly typed for input elements
  const linkRef = useRef<HTMLInputElement>(null); // Correctly typed for input elements
  const typeRef = useRef<HTMLSelectElement>(null); // Correctly typed for select element

  const [customCategory, setCustomCategory] = useState("");
  const [selectCount, setSelectCount] = useState(new Set<string>()); // Specify type

  const handleAdd = (value: string) => {
    setSelectCount(new Set([...selectCount, value])); // Create new Set
  };

  const handleAddTag = () => {
    if (customCategory.trim() !== "") {
      handleAdd(customCategory.trim());
      setCustomCategory(""); // Clear input field
    }
  };

  const handleRemove = (value: string) => {
    const updatedSet = new Set([...selectCount]); // Create new Set
    updatedSet.delete(value); // Delete the tag
    setSelectCount(updatedSet); // Trigger update
  };

  const handleSubmitContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;

    if (!title || !link || !type) {
      toast.error("Please fill all the fields");
      return;
    }

    // const tags = tag?.split(",").map((tag) => tag.trim());
    const tags = Array.from(selectCount);
    console.log("tags", tags);

    await axios
      .post(
        `${BACKEND_URL}/content`,
        {
          title,
          link,
          type,
          tags,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setContentAdded(true);
        setSelectCount(new Set()); // Resets to an empty Set
        setTimeout(() => {
          setModalOpen(false);
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
              <Input
                reference={titleRef}
                className="w-full"
                placeholder="Enter Content Title"
              ></Input>
              <Input
                reference={linkRef}
                className="w-full"
                placeholder="Enter Content Link"
              ></Input>
              <p className="text-sm">Select your Content Type</p>
              <span className="w-full flex gap-3 flex-col">
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
                <p className="text-sm">Enter your Tags</p>
                <span className="w-full py-2 px-4 border border-gray-200 rounded-md flex flex-wrap gap-3">
                  {/* Dynamic Tags */}
                  {[...selectCount].map((item) => (
                    <span
                      key={item}
                      className=" py-1 border border-blue-700 relative px-3 text-blue-700 text-xs rounded-md flex items-center gap-1"
                    >
                      {item}
                      <span
                        className=" cursor-pointer absolute top-[-.5rem] right-[-.5rem] rounded-full text-white text-center bg-red-500 w-4 h-4"
                        onClick={() => handleRemove(item)}
                      >
                        x
                      </span>
                    </span>
                  ))}

                  <span className="flex justify-between items-center w-full gap-2">
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      id="tagsinput"
                      placeholder="Enter Tags"
                      className="outline-none w-5/6"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className=" w-1/6 text-xs bg-blue-500 text-white px-2 py-1 rounded-md "
                    >
                      Add Tags
                    </button>
                  </span>
                </span>
              </span>
            </div>
            <Buttons
              onClick={handleSubmitContent}
              text="Submit"
              variant="primary"
              fullwidth={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ContentModal;
