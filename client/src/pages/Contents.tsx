import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import SharedCards from "../componensts/SharedCards";

const Contents = () => {
  const [sharedContent, setShareContent] = useState([]);
  const [userName, setUserName] = useState([]);

  const params = useParams();
  console.log(params.hash);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/brain/${params.hash}`)
      .then((res) => {
        setShareContent(res.data.sharedContent);
        setUserName(res.data.username);
      })
      .catch((err) => console.log(err));
  }, [params.hash]);

  return (
    <div className="w-full h-full bg-blue-200 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-blue-600 font-inter p-4">Shared by {userName}</h1>

      <div className="flex flex-wrap gap-4 p-4 overflow-auto justify-center ">
        {sharedContent.map(({ type, link, title, tags }) => (
          <div key={link}>
            <SharedCards type={type} link={link} title={title} tags={tags} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;