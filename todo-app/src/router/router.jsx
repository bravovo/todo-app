import { Navigate, createBrowserRouter } from "react-router-dom";
import TodoList from "../components/todoList/TodoList";
import Notes from "../components/notes/Notes";
import MainNav from "../components/mainNav/MainNav";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainNav />,
        children: [
            {
                index: true,
                element: <Navigate to={"/todos"} />,
            },
            {
                path: "/todos",
                element: <TodoList />,
            },
            {
                path: "/notes",
                element: <Notes />,
            },
            {
                path: "*",
                element: (
                    <h1>
                        You entered page that do not exist. Please choose
                        different page
                    </h1>
                ),
            },
        ],
    },
]);
