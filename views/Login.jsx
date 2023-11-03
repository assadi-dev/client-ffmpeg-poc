import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target?.room?.value;

    if (!room) return;
    const redirectLink = `/project/${room}`;
    navigate(redirectLink, { replace: true });
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
            <label htmlFor="room" className="form-label">
              Entrez un nom de session
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="EX: room_255 ,255, projet-22"
              aria-label="room"
              name="room"
              id="room"
              required
            />
          </div>

          <div className="text-center my-3">
            <button className="btn btn-dark" type="submit">
              ENTRER
            </button>
          </div>
          <div className="text-center my-3">
            <Link className="btn btn-dark" to={"/uploads"}>
              Uploader un fichier
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
