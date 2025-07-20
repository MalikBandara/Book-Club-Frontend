import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // redirect to login page after logout
    };
    return (
        <div className="fixed h-screen w-64 bg-gray-800 text-white">
            <div className="border-b border-gray-700 p-4 text-xl font-bold">Admin</div>
            <nav className="mt-4 space-y-2 px-4">
                <Link
                    to="/admin-dashboard/"
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin-dashboard/readers"
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Readers
                </Link>
                <Link
                    to="/admin-dashboard/books"
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Books
                </Link>
                <Link
                    to="/admin-dashboard/books"
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Issue Book
                </Link>
                <Link
                    to="/admin-dashboard/books"
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Return Book
                </Link>
                <Link
                    to="/admin-dashboard/books"
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Settings
                </Link>
                <Button
                    onClick={handleLogout}
                    className="block rounded p-2 hover:bg-gray-700"
                >
                    Logout
                </Button>
            </nav>
        </div>
    );
};

export default SideBar;
