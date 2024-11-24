import React, { useEffect, useState } from "react";
import styles from "./TodoList.module.css";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState("");
    const [isTodoEmpty, setIsTodoEmpty] = useState(false);

    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem("todos")) || []);

        fetchChecked();
    }, []);

    function fetchChecked() {
        const hasCheckedValues = todoList.find((todo) => {
            return todo.checked;
        });

        return hasCheckedValues;
    }

    const handleCheckedRemove = () => {
        const newTodoList = todoList.filter((todo) => {
            return !todo.checked && todo;
        });

        setTodoList(newTodoList);

        localStorage.setItem("todos", JSON.stringify(newTodoList));
    };

    const handleChange = (event) => {
        setTodoValue(event.target.value);
    };
    const handleSave = () => {
        if (todoValue.length === 0) {
            setIsTodoEmpty(true);
            return;
        }
        setTodoList([{ content: todoValue, checked: false }, ...todoList]);
        localStorage.setItem(
            "todos",
            JSON.stringify([
                { content: todoValue, checked: false },
                ...todoList,
            ])
        );
        setTodoValue("");
        setIsTodoEmpty(false);
    };

    const handleCheckChange = (index) => {
        const updatedTodoList = [...todoList];
        updatedTodoList[index].checked = !updatedTodoList[index].checked;
        setTodoList(updatedTodoList);

        localStorage.setItem('todos', JSON.stringify(updatedTodoList));
    };

    return (
        <div className={styles.container}>
            <div className={styles.saveTodoContainer}>
                <input
                    className={`${styles.inputText} ${
                        isTodoEmpty ? styles.emptyInput : styles.inputText
                    }`}
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
            {fetchChecked() && (
                <button
                    className={`${styles.buttonHidden} ${styles.clearCheckedButton}`}
                    onClick={handleCheckedRemove}
                >
                    Clear completed todos
                </button>
            )}
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
                            <label className={styles.todoItemCheckBoxLabel}>
                                {todo.content}
                            </label>
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
