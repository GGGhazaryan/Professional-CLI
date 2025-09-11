import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
