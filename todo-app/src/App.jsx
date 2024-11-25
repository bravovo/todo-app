import React from "react";
import styles from "./App.module.css";

import { RouterProvider } from "react-router-dom";
import { router } from './router/router';

const App = () => {
    return (
        <div className={styles.container}>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
