import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { DarkMode, LightMode, MenuBook } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";

const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const isLinkActive = (link: string) => {
    return location.pathname === link;
  };

  return (
    <div className="navbar">
      <div className="brand">
        <span>Resume<span className="green-text">Management</span></span>
      </div>
      <div className={open ? "menu open" : "menu"}>
        <ul>
          {links.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link
                to={item.href}
                style={{
                  color: isLinkActive(item.href) ? "green" : "white",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <MenuBook onClick={ToggleOpenMenu} />
      </div>
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
      </div>
    </div>
  );
};

export default Navbar;
