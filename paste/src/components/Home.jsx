import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  
  useEffect(() => {
      if(pasteId){
          const paste = allPastes.find((item) => item._id === pasteId);
          setTitle(paste.title);
          setValue(paste.content);
      }
  }, [pasteId]);
  
  function createPaste() {
    const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }


    if(pasteId){
        //update logic bcoz paste is already created
        dispatch(updateToPastes(paste));
    }
    else{
        //create logic
        dispatch(addToPastes(paste));
    }

    //after creation or updation resetting input boxes to become empty
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-4 "
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste} className="p-2 rounded-2xl mt-4">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="mt-5 rounded-2xl min-w-[500px] p-4"
          value={value}
          placeholder="Enter your content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
