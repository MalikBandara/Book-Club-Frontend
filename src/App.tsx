import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ReaderPage from "./pages/ReaderPage";
import ReaderForm from "./form/AddReaderForm";
import UpdateReader from "./form/UpdateReaderForm";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import BookPage from "./pages/BookPage";
import AddBook from "./form/AddBookForm";
import UpdateBook from "./form/UpdateBookForm";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard />,
        },
        {
            path: "/addReader",
            element: <ReaderForm />,
        },

        //updates
        {
            path: "/updateReader/:id",
            element: <UpdateReader />,
        },
        {
            path: "/updateBook/:id",
            element: <UpdateBook />,
        },


        // dashboard routes
        {
            path: "/admin-dashboard",
            element: <Dashboard />, // layout
            children: [
                { index: true, element: <DashboardHome /> }, // ✅ fixed
                { path: "readers", element: <ReaderPage /> },
                { path: "Books", element: <BookPage /> },
                // You can add more like:
                // { path: "items", element: <ItemPage /> },
            ],
        },
        {
            path: "/addBook",
            element: <AddBook />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
