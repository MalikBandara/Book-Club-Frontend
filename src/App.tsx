import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ReaderPage from "./pages/ReaderPage";
import ReaderForm from "./form/AddReaderForm";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
