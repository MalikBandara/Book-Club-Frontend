import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ReaderPage from "./pages/ReaderPage";
import ReaderForm from "./form/AddReaderForm";
import UpdateReader from "./form/UpdateReaderForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ReaderPage />,
    },
    {
      path: "/addReader",
      element: <ReaderForm />,
    },
    {
      path: "/updateReader/:id",
      element: <UpdateReader />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
