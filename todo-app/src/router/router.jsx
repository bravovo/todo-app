import { createBrowserRouter } from "react-router-dom";
import TodoList from "../components/todoList/TodoList";
import Notes from "../components/notes/Notes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <TodoList />,
    },
    {
        path: "todos", 
        element: <TodoList />
    },
    {
        path: 'notes', 
        element: <Notes />
    }
]);