import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import "./Admin.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import Language from "../Header/Language";
import NavDropdown from "react-bootstrap/NavDropdown";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span className="leftside" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </span>
          <div className="rightside">
            <Language />
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
