import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        enrolledCourses: 0,
        completedCourses: 0,
        rating: 0,
        coins: 0,
    });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5000/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data.user);
                setStats(res.data.stats);
            } catch (err) {
                console.error("Error fetching user data:", err.response?.data?.message || err.message);
                localStorage.removeItem("token"); // Clear invalid token
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <Navbar />
                <h2 className="text-3xl font-semibold">Welcome, {user?.name} 👋</h2>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    <StatCard title="Enrolled Courses" value={stats.enrolledCourses} />
                    <StatCard title="Completed Courses" value={stats.completedCourses} />
                    <StatCard title="Rating" value={`${stats.rating} ⭐`} />
                    <StatCard title="Earned Coins" value={`${stats.coins} 🪙`} />
                </div>

                {/* Quick Links */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <ActionButton text="📚 View Courses" color="blue" onClick={() => navigate("/courses")} />
                        <ActionButton text="📝 Take a Test" color="green" onClick={() => navigate("/tests")} />
                        <ActionButton text="🎮 Gamified Assignments" color="purple" onClick={() => navigate("/assignments")} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Component for Stat Cards
const StatCard = ({ title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow text-center">
        <h3 className="text-xl font-bold">{value}</h3>
        <p className="text-gray-500">{title}</p>
    </div>
);

// Reusable Component for Action Buttons
const ActionButton = ({ text, color, onClick }) => (
    <button
        onClick={onClick}
        className={`p-4 bg-${color}-500 text-white rounded-lg shadow-lg hover:bg-${color}-600 transition`}
    >
        {text}
    </button>
);

export default Dashboard;
