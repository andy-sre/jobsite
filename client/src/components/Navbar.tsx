import React, {useState} from 'react';
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
import {FaAlignLeft, FaCaretDown, FaUserCircle} from "react-icons/fa";
import {useAppContext} from "../context/appContext";
const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const {toggleSidebar, logoutUser, user} = useAppContext();

    return (
        <Wrapper>
            <div className="nav-center">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FaAlignLeft/>
                </button>
                <div>
                    <Logo/>
                    <h3 className="logo-text">dashboard</h3>
                </div>
                <div className="btn-container">
                    <button className="btn" onClick={() => setShowLogout(!showLogout)}>
                        <FaUserCircle/>
                        {user?.name.split(" ")[0]}
                        <FaCaretDown/>
                    </button>
                    <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                        <button className="dropdown-btn" onClick={logoutUser}>Logout</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;