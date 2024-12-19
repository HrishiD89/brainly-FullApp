

import ShareIcon from "../ui/icons/ShareIcon";
import YoutubeIcon from "../ui/icons/YoutubeIcon";
import { TwitterIcon } from "../ui/icons/TwitterIcon";
import { Link } from "react-router-dom";
import { useEffect} from "react";


interface CardProp {
  type: "youtube" | "tweet";
  title: string;
  link: string;
  tags: { _id: string; title: string }[];
}

const SharedCards = ({ type, title, link, tags }: CardProp) => {
 


  
  useEffect(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();  
    }
  }, [link]);  

  return (
    <div className={`w-96 bg-white p-4 rounded-md gap-3 flex flex-col shadow-md ${type === "youtube" ? "h-96  " : "h-96 overflow-y-hidden hover:overflow-y-scroll "}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span>{type === "youtube" && <YoutubeIcon />} {type === "tweet" && <TwitterIcon />}</span>
        <span className="text-lg font-semibold truncate">{title}</span>
        <div className="flex items-center gap-2">
          <Link to={link} target="_blank" rel="noopener noreferrer">
            <ShareIcon className="cursor-pointer size-6  hover:text-cyan-600"/>
          </Link>
        </div>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags?.map((tag) => (
          <span
            key={tag._id}
            className="bg-blue-100 px-2 py-1 text-blue-600 rounded-xl text-xs"
          >
            {tag.title}
          </span>
        ))}
      </div>

      {/* Content */}
      {type === "youtube" && (
        <iframe
          className="rounded-md mt-2 w-full h-full"
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
      {type === "tweet" && (
        <blockquote className="twitter-tweet ">
          <a href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
      )}
    </div>
  );
};

export default SharedCards;
