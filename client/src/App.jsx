import { Routes, Route } from "react-router-dom";
import { DoctorProfile } from "./api/api";
import DocSchedule from "./components/Appointment/DocSchedule/DocSchedule";
import DocData from "./components/Doctor/DocData";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/register" element={<Register />} />
      <Route path="/user/:id" element={<Register  />} />
      <Route path="/doctor/:id" element={<DocData  />} />
    </Routes>
  );
}

export default App;
