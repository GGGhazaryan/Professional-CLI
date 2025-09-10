import { useState } from "react";
import "../CSS/Header.css";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="headerBox">
        <div className="leftItemsBar">
          <div 
            className={`burger-menu ${open ? "open" : ""}`} 
            onClick={() => setOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div 
        className={`overlay ${open ? "show" : ""}`} 
        onClick={() => setOpen(false)}
      ></div>

      <div className={`sidebar ${open ? "show" : ""}`}>
        <div className="close-btn" onClick={() => setOpen(false)}>✖</div>
        <ul>
          <li onClick={()=> setOpen(false)}>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
}

export default Header;
