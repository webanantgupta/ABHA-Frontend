import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div>

            <Navbar />

            <div className="p-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user?.name} 👋
                </h1>
                <p className="mt-2 text-gray-600">
                    Welcome to your dashboard.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;