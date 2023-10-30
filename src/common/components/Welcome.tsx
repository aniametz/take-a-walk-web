import { useNavigate } from "react-router";

export function Welcome(): JSX.Element {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/sign-in");
  };
  const handleSignUp = () => {
    navigate("/sign-up");
  };
  const handleGuest = () => {
    navigate("/home");
  };

  return (
    <div className="common-container flex h-screen">
      <div className="m-auto">
        <p className="main-header">Welcome! Take a Walk With Us.</p>
        <div className="auth-container">
          <button className="btn" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="btn" onClick={handleGuest}>
            Guest
          </button>
        </div>
      </div>
    </div>
  );
}
