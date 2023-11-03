import { useEffect, useMemo, useRef, useState } from "react";
import { preset } from "../src/config/preset";
import { useParams } from "react-router-dom";
import UploadFieldCustom from "./UploadFieldCustom";
import Flow from "@flowjs/flow.js";
import uniqid from "uniqid";

function UploadFlowJs() {
  const uploadElement = useRef(null);
  const flowRef = useRef(null);
  const target = import.meta.env.VITE_URL_SERVER + "/flow/upload";
  const [fileList, setFileList] = useState([]);

  const flow = useMemo(() => {
    return new Flow({
      target: target,
      chunkSize: 1024 * 1024 * 100, // 100MB
      singleFile: false,
      testChunks: false,
      progressCallbacksInterval: 1000,
      forceChunkSize: true,
      prioritizeFirstAndLastChunk: true,
      query: { test: "hello" },
    });
  }, []);

  /* 
    flow.assignDrop(domNode, false, true);

    flow.assignBrowse(domNode, false, true); */
  flow.on("filesSubmitted", (arr, evt) => {});

  // (C5) ON UPLOAD PROGRESS
  flow.on("fileProgress", (file, chunk) => {
    console.log("progress");
  });

  // (C6) ON UPLOAD SUCCESS
  flow.on("fileSuccess", (file, message, chunk) => {
    console.log("sucssess", message);
  });

  // (C7) ON UPLOAD ERROR
  flow.on("fileError", (file, message) => {
    let error = { message };
    console.log(message);
  });

  const handleChangeInput = async (e) => {
    const fileList = e.target.files;

    flow.addFiles(fileList);

    for (const file of fileList) {
      const dt = new Date();
      const uniqueIdentifier = uniqid() + dt.getTime();
      const name = file.name;
      const size = file.size;

      const obj = { uniqueIdentifier, name, file, size };

      setFileList((prevState) => {
        return [...prevState, obj];
      });
    }
  };
  /* 
    useEffect(() => {
      
      

    if (fileList.length > 0 && flow) {
      let filesObject = [...fileList].map((v) => v.file);
      flow.addFiles(filesObject);
    }
  }, [fileList, flow]); */

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (fileList.length == 0) return alert("no files added");

    try {
      console.log(flow.files);
      flow.upload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container place-content">
      <form
        className="card col-md-10 col-xl-6  my-3 mx-auto form-position"
        onSubmit={handleSubmit}
      >
        <div className="my-3">
          <h1 className="text-center">Test Upload fichier</h1>
        </div>

        <div className="card-body">
          <UploadFieldCustom
            uploadRef={uploadElement}
            classNameUploadZone="upload-zone"
            filesObjectList={fileList}
            handleChangeInput={handleChangeInput}
          />

          <div className="text-center my-3">
            <button className="btn btn-dark" type="submit">
              Envoyer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadFlowJs;
