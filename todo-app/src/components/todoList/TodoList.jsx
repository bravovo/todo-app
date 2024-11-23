import React, { useState } from "react";
import styles from "./TodoList.module.css";

const TodoList = () => {
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
                    placeholder="Enter what needs to be done"
                    onChange={handleChange}
                    value={todoValue}
                />
                <button className={styles.button} onClick={handleSave}>
                    Save todo
                </button>
            </div>
            <h1 className={styles.h1}>Your todos</h1>
            <div className={styles.todoListContainer}>
                {todoList.length > 0 ? (
                    todoList.map((todo, index) => (
                        <div key={index} className={styles.todoItemContainer}>
                            <input
                                className={styles.todoItemCheckBoxInput}
                                type="checkbox"
                                checked={todo.checked}
                                onChange={() => handleCheckChange(index)}
                            />
                            <label>{todo.content}</label>
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyArray}>No todos yet!</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
