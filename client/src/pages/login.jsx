import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg p-8 w-96"
            >
                <h2 className="text-2xl font-bold text-white text-center mb-4">Welcome Back</h2>

                {error && <p className="text-red-400 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-300">Or continue with</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30">
                            <FaGoogle size={24} />
                        </button>
                        <button className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30">
                            <FaGithub size={24} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
