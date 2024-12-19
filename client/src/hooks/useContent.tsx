import { useEffect,useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent =  () => {
  const [contents,setContents] = useState([]);

  async function  refresh(){
    try{
        (await axios.get(`${BACKEND_URL}/content`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(response=>{
            setContents(response.data.contents);
        console.log(response.data.contents);

        }))
    }catch(err){
        console.log("Error Fetching data");
        throw err;
    }
  }

  useEffect(()=>{
    refresh();
  },[]);

  return {contents,refresh};
};

