import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ReaderPage from "./pages/ReaderPage";
import ReaderForm from "./form/AddReaderForm";
import UpdateReader from "./form/UpdateReaderForm";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";

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
        {
            path: "/updateReader/:id",
            element: <UpdateReader />,
        },
        {
            path: "/admin-dashboard",
            element: <Dashboard />, // layout
            children: [
                { index: true, element: <DashboardHome /> }, // ✅ fixed
                { path: "readers", element: <ReaderPage /> },
                { path: "readers", element: <ReaderPage /> },
                // You can add more like:
                // { path: "items", element: <ItemPage /> },
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
