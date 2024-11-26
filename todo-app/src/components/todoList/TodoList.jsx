import React, { useEffect, useState } from "react";
import sharedStyles from "../../assets/inputStyles.module.css";
import pageStyles from "./TodoList.module.css";

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

        localStorage.setItem("todos", JSON.stringify(updatedTodoList));
    };

    return (
        <div className={sharedStyles.container}>
            <div className={sharedStyles.saveContainer}>
                <input
                    className={`${sharedStyles.inputText} ${
                        isTodoEmpty
                            ? sharedStyles.emptyInput
                            : sharedStyles.inputText
                    }`}
                    type="text"
                    placeholder="Enter what needs to be done"
                    onChange={handleChange}
                    value={todoValue}
                />
                <button className={sharedStyles.button} onClick={handleSave}>
                    Save todo
                </button>
            </div>
            <h1 className={sharedStyles.h1}>Your todos</h1>
            {fetchChecked() && (
                <button
                    className={`${pageStyles.buttonHidden} ${pageStyles.clearCheckedButton}`}
                    onClick={handleCheckedRemove}
                >
                    Clear completed todos
                </button>
            )}
            <div className={pageStyles.todoListContainer}>
                {todoList.length > 0 ? (
                    todoList.map((todo, index) => (
                        <div
                            key={index}
                            className={pageStyles.todoItemContainer}
                        >
                            <input
                                className={pageStyles.todoItemCheckBoxInput}
                                type="checkbox"
                                checked={todo.checked}
                                onChange={() => handleCheckChange(index)}
                            />
                            <label className={pageStyles.todoItemCheckBoxLabel}>
                                {todo.content}
                            </label>
                        </div>
                    ))
                ) : (
                    <p className={sharedStyles.emptyArray}>No todos yet!</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
