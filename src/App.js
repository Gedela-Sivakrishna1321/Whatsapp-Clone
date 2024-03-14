import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Status from "./Components/Status/Status";
import Statusviewer from "./Components/Status/Statusviewer";
import Signin from "./Components/Register/Signin";
import Signup from "./Components/Register/Signup";


function App() {
  return (
    <div >

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/status" element={<Status/>} />
            <Route path="/status/{userId}" element={<Statusviewer/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
        </Routes>
          
    </div>
  );
}

export default App;
