import { Route, Routes } from "react-router-dom";
import { Home } from "./common/components/Home";
import { Welcome } from "./common/components/Welcome";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
