import React, { useState, useRef, useEffect } from "react";
import "./SetFileForWallpaper.css";

export default function SetFileForWallpaper({ setFileDataURL }) {
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL({
            "result": result,
            "name": file.name,
            "size": file.size,
            "type": file.type,
          });
          // console.log("result", file);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <section className="set-file">
      <input className="set-file__input" type="file" onChange={handleChange} />
    </section>
  );
}
