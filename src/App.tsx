import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ReaderPage from "./pages/ReaderPage";
import ReaderForm from "./form/readers/AddReaderForm";
import UpdateReader from "./form/readers/UpdateReaderForm";
import Dashboard from "./pages/DashboardPage";
import DashboardHome from "./pages/DashboardHomePage";
import BookPage from "./pages/BookPage";
import AddBook from "./form/book/AddBookForm";
import UpdateBook from "./form/book/UpdateBookForm";

import SignupPage from "./pages/SignUpPage";
import IssueBookForm from "./form/issueBook/IssueBookForm";
import ReturnBookPage from "./pages/ReturnBook";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import OverduePage from "./pages/OverduePage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/signup",
            element: <SignupPage />,
        },
        {
            path: "/login",
            element: <Login />,
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
                { path: "issueBook", element: <IssueBookForm /> },
                { path: "returnBook", element: <ReturnBookPage /> },
                { path: "overdueBook", element: <OverduePage /> },
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
