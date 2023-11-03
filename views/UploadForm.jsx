import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { preset } from "../src/config/preset";
import { useParams } from "react-router-dom";
import { post_gopro, post_insv } from "./helpers";

function UploadForm() {
  const inPutFileRef = useRef(null);
  const { room } = useParams();

  const socket = io(import.meta.env.VITE_URL_SERVER);
  const idProjectVideo = 109;

  useEffect(() => {
    //Connection serveur webSocket

    //Subscribe event
    socket.emit("join_server", room);
    socket.on("start", (event) => {
      console.log(event);
    });
    socket.on("progress", (event) => {
      console.log(event);
    });

    socket.on("end", (event) => {
      console.log(event);
    });

    socket.on("error", (event) => {
      console.log(event);
    });

    //Cleanup effect
    return () => {
      socket.close();
    };
  }, []);

  const handleSelect = (e) => {
    if (!inPutFileRef.current) return;

    let value = e.target.value;

    value.includes("insv")
      ? (inPutFileRef.current.multiple = true)
      : (inPutFileRef.current.multiple = false);

    inPutFileRef.current.accept = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("join_server", room);
    //let formValues = e.target.file;
    const preset = e.target.preset.value;
    try {
      if (preset == ".360") {
        let goproObject = {
          idProjectVideo: Number(idProjectVideo),
          room,
        };
        post_gopro(goproObject);
      } else {
        let insvProject = {
          idProjectVideo: Number(idProjectVideo),
          room,
        };
        post_insv(insvProject);
      }
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
        <div className="my-5">
          <h1 className="text-center">Test traitement ffmpeg</h1>
        </div>

        <div className="card-body">
          <div className="mb-5">
            <label htmlFor="preset" className="form-label">
              Camera
            </label>
            <select
              className="form-select"
              name="preset"
              id="preset"
              onChange={handleSelect}
            >
              {preset.map((v, i) => (
                <option key={i} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="input-group mb-5">
            <label htmlFor="file" className="input-group-text">
              Fichier video
            </label>
            <br />
            <input
              type="file"
              name="file"
              accept={preset[0].value}
              className="form-control"
              ref={inPutFileRef}
            />
            <p></p>
              </div>*/}

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

export default UploadForm;
