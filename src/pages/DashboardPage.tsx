import { Outlet } from "react-router-dom";
import SideBar from "../layout/SideBar";

const Dashboard = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="ml-16 min-h-screen flex-1 bg-gray-100 md:ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
