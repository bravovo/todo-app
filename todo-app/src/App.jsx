import React, { useState } from "react";
import styles from "./App.module.css";
const App = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");

    const handleChange = (event) => {
        setTodoValue(event.target.value);
    };
    const handleSave = () => {
        setTodoList([{ content: todoValue, checked: false }, ...todoList]);
        setTodoValue("");
    };

    const handleCheckChange = (index) => {
        const updatedTodoList = [...todoList];
        updatedTodoList[index].checked = !updatedTodoList[index].checked;
        setTodoList(updatedTodoList);
    };

    return (
        <div className={styles.container}>
            <div className={styles.saveTodoContainer}>
                <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter a to do element"
                    onChange={handleChange}
                    value={todoValue}
                />
                <button className={styles.button} onClick={handleSave}>
                    Save to do
                </button>
            </div>
            <div>
                <h1 className={styles.h1}>Your todos</h1>
                {todoList.length > 0 ? (
                    todoList.map((todo, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={todo.checked}
                                onChange={() => handleCheckChange(index)}
                            />
                            <label>{todo.content}</label>
                            <p>{todo.checked ? "Checked" : "Unchecked"}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyArray}>No todos yet!</p>
                )}
            </div>
        </div>
    );
};

export default App;
