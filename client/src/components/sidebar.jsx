import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Teach Platform</h2>
            <ul className="space-y-4">
                <li>
                    <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">🏠 Dashboard</Link>
                </li>
                <li>
                    <Link to="/courses" className="block p-2 hover:bg-gray-700 rounded">📚 Courses</Link>
                </li>
                <li>
                    <Link to="/tests" className="block p-2 hover:bg-gray-700 rounded">📝 Tests</Link>
                </li>
                <li>
                    <Link to="/assignments" className="block p-2 hover:bg-gray-700 rounded">🎮 Assignments</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
