import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="chat/:room/:name" element={<Chat></Chat>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
