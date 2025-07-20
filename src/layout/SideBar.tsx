import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Book, BookOpen, BookCheck, Settings, LogOut, Library } from "lucide-react";

const SideBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // redirect to login page after logout
    };

    return (
        <div className="fixed h-screen w-64 border-r border-green-200/50 bg-green-100/80 shadow-2xl backdrop-blur-md">
            <div className="relative border-b border-green-200/50 bg-gradient-to-r from-green-400/10 to-green-600/10 p-6 text-center">
                <div className="relative">
                    <div className="mb-3 flex items-center justify-center gap-3">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
                            <Library className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <h1 className="bg-gray-600 bg-clip-text font-serif text-2xl font-bold tracking-wide text-transparent">ADMIN PANEL</h1>
                    <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-green-400 to-green-300"></div>
                </div>
            </div>

            <nav className="mt-6 space-y-3 px-4">
                {[
                    { to: "/admin-dashboard/", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
                    { to: "/admin-dashboard/readers", label: "Readers", icon: <Users size={16} /> },
                    { to: "/admin-dashboard/books", label: "Books", icon: <Book size={16} /> },
                    { to: "/admin-dashboard/issue-book", label: "Issue Book", icon: <BookOpen size={16} /> },
                    { to: "/admin-dashboard/return-book", label: "Return Book", icon: <BookCheck size={16} /> },
                    { to: "/admin-dashboard/settings", label: "Settings", icon: <Settings size={16} /> },
                ].map(({ to, label, icon }) => (
                    <Link
                        key={label}
                        to={to}
                        className="group flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-green-700 shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-xl hover:shadow-green-500/30 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-none"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white transition-transform duration-300 group-hover:rotate-180">
                            {icon}
                        </div>
                        {label}
                    </Link>
                ))}

                <div className="border-t border-green-200/50 pt-4">
                    <Button
                        onClick={handleLogout}
                        className="group flex w-full items-center justify-start gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-red-600 shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-xl hover:shadow-red-600/30 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:outline-none"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 transition-transform duration-300 group-hover:rotate-180">
                            <LogOut
                                size={16}
                                className="text-white"
                            />
                        </div>
                        Sign Out
                    </Button>
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
