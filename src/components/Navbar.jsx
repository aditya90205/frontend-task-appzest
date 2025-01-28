import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInClick = () => {
    navigate("/"); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate("/register"); // Navigate to the registration page
  };
  return (
    <div className="flex justify-between items-center navbar">
      <div className="navbar-start">
        <a className="navbar-item">Appzest</a>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-primary mr-3"
          onClick={handleSignInClick}
          disabled={location.pathname === "/"}
        >
          Sign In
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSignUpClick}
          disabled={location.pathname === "/register"}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
