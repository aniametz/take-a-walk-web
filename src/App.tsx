import { Route, Routes } from "react-router-dom";
import { Home } from "./common/components/Home";
import { SignIn } from "./common/components/SignIn";
import { SignUp } from "./common/components/SignUp";
import { ValidateEmail } from "./common/components/ValidateEmail";
import { Welcome } from "./common/components/Welcome";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/validate-email" element={<ValidateEmail />} />
      </Routes>
    </div>
  );
}
