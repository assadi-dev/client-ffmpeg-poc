import uniqid from "uniqid";
const BASE_URL = import.meta.env.VITE_URL_API_SERVER;
const URL_ROOT_SERVER = import.meta.env.VITE_URL_SERVER;

export const post_gopro = async (goproObject) => {
  const URL = `${BASE_URL}/process/gopro`;
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      idProjectVideo: goproObject?.idProjectVideo,
      room: goproObject?.room,
      camera: "gopro",
      fileObject: {
        id: uniqid(),
        filename: `${timestamp()}_GS010040.360`,
        path: `${URL_ROOT_SERVER}/gopro/GS010040.360`,
      },
    }),
  });
};
export const post_insv = async (insvObject) => {
  const URL = `${BASE_URL}/process/insv`;
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      idProjectVideo: insvObject?.idProjectVideo,
      room: insvObject.room,
      camera: "insv",
      fileObject: {
        id: uniqid(),
        filename: `${timestamp()}_VID_20230414_164335_00_011.insv`,
        front: `${URL_ROOT_SERVER}/insv/VID_20230414_164335_00_011.insv`,
        back: `${URL_ROOT_SERVER}/insv/VID_20230414_164335_10_011.insv`,
      },
    }),
  });
};

const timestamp = () => {
  const dt = new Date();
  return dt.getTime();
};
