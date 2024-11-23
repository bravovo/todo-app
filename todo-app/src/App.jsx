import React from "react";
import styles from "./App.module.css";
import TodoList from "./components/todoList/TodoList";

const App = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to todo app!</h1>
            <TodoList />
        </div>
    );
};

export default App;
