import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";

import MainBoard from "./Components/MainBoard";
import GetAllEmployees from "./Components/Employees/GetAllEmployees";
import CreateEmployee from "./Components/Employees/CreateEmployee";

import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="flex min-h-screen">
      {/* 左边侧边栏 */}
      <Sidebar />

      {/* 右边内容区：头部 + 主体 */}
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 bg-gray-50 dark:bg-neutral-900">
          <Routes>
            <Route path="/" element={<MainBoard />} />
            <Route path="/employees" element={<GetAllEmployees/>}/>
            <Route path="/createEmployee" element={<CreateEmployee/>}/>
          </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </main>
      </div>
    </div>
  );
}

export default App;
