import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./Components/Layout";
import Splash from "./Components/Splash";
import MainBoard from "./Components/MainBoard";
import GetAllEmployees from "./Components/Employees/GetAllEmployees";
import CreateEmployee from "./Components/Employees/CreateEmployee";
import SingleEmployee from "./Components/SingleEmployee";

function App() {
  return (
    <>
      <Routes>
        {/* Welcom Splash */}
        <Route path="/" element={<Splash />} />

        {/*mainboard with header and sidebar */}
        <Route element={<Layout />}>
          <Route path="/mainboard" element={<MainBoard />} />
          <Route path="/employees" element={<GetAllEmployees />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/singleEmployee/:name" element={<SingleEmployee />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
