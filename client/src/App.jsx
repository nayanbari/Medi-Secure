import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/register" element={<Register />} />
      <Route path="/user/:id" element={<Register  />} />
    </Routes>
  );
}

export default App;
