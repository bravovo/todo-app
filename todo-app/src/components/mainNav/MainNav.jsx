import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./MainNav.module.css";

const MainNav = () => {
    return (
        <div>
            <div className={styles.container}>
                <NavLink
                    to={"/todos"}
                    className={({ isActive }) =>
                        isActive ? styles.linkActive : styles.link
                    }
                >
                    Todos
                </NavLink>
                <NavLink
                    to={"/notes"}
                    className={({ isActive }) =>
                        isActive ? styles.linkActive : styles.link
                    }
                >
                    Notes
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default MainNav;
