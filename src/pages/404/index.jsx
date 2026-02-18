import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorImg from "../../assets/images/404-error-idea.gif";

const NotFound = () => {
  const { user } = useSelector((state) => state.auth);

  const redirectPath = user ? "/app/dashboard" : "/auth/login";

  return (
    <div className="flex flex-col h-screen text-center justify-center bg-dark text-pure">
      <div className="max-w-md mx-auto">
        <img
          src={ErrorImg}
          alt="404"
          className="w-full max-w-lg mx-auto"
        />
        <h1 className="text-4xl font-bold mb-4">Oops!!!</h1>
        <h4 className="text-xl mb-4">
          This page you are looking for could not be found.
        </h4>

        <Link to={redirectPath}>
          <button className="btn-primary py-2 px-6 mt-4">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
