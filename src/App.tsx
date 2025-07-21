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
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import IssueBookForm from "./form/issueBook/IssueBookForm";
import ReturnBookPage from "./pages/ReturnBook";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />,
        },
        {
            path: "/signup",
            element: <SignupPage />,
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
