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
                        onClick={() => setOpen(!open)}
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
                <ul>
                    <li onClick={() => setOpen(false)}><i className="fa fa-home" /> Home</li>
                    <li><i className="fa fa-info-circle" />About</li>
                    <li><i className="fa fa-phone" /> Contact</li>
                    <li><i className="fa fa-lock"></i> Privacy Policy</li>
                    <li><i className="fa fa-shield-alt"></i>Site Security</li>
                    <li><i className="fa fa-cog"></i> Settings</li>

                </ul>
            </div>
        </>
    );
}

export default Header;
