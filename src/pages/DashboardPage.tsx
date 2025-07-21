    import { Outlet } from "react-router-dom";
    import SideBar from "../layout/SideBar";

    const Dashboard = () => {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
                <SideBar />
                <div className="ml-16 flex-1 bg-gradient-to-r from-green-100 to-green-50/80 shadow-inner backdrop-blur-sm md:ml-64">
                    <div className="p-6 lg:p-8">
                        <div className="mx-auto max-w-7xl">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        );

    };

    export default Dashboard;
