import { useNavigate } from 'react-router';

export function Welcome(): JSX.Element {

    const navigate = useNavigate()
    const handleSignIn = () => { };
    const handleSignUp = () => { };
    const handleGuest = () => {
        navigate("/home");
    };

    return (
        <div className="main-container flex h-screen">
            <div className="m-auto">
                <p className="main-header">Welcome! Take a Walk With Us.</p>
                <div className="auth-container">
                    <button className="auth-btn" onClick={handleSignIn}>Sign In</button>
                    <button className="auth-btn" onClick={handleSignUp}>Sign Up</button>
                    <button className="auth-btn" onClick={handleGuest}>Guest</button>
                </div>
            </div>
        </div>
    )
}
