const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
            }}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
