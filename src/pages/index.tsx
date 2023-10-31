import Link from "next/link";

function Index(): JSX.Element {
  const handleGuest = () => {
    // todo add state for guest mode
    return;
  };

  return (
    <div className="common-container flex h-screen">
      <div className="m-auto">
        <p className="main-header">Welcome! Take a Walk With Us.</p>
        <div className="auth-container">
          <Link href="/sign-in" aria-label="SignIn">
            <button className="btn">Sign In</button>
          </Link>
          <Link href="/sign-up" aria-label="SignUp">
            <button className="btn">Sign Up</button>
          </Link>
          <Link href="/home" aria-label="Guest">
            <button className="btn" onClick={handleGuest}>
              Guest
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
