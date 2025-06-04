import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react"; // Lucide icons
import "aos/dist/aos.css";
import AOS from "aos";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        data-aos="fade-up"
      >
        <img
          src="https://www.huboweb.com/assets/logo_dark-CZo1AmUt.png"
          alt="Huboweb Logo"
          className="mx-auto mb-4 w-50 h-12"
          data-aos="fade-down"
        />
        <h2
          className="text-2xl font-semibold text-center text-gray-800"
          data-aos="fade-down"
        >
          Login
        </h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email */}
          <div className="mb-4 relative" data-aos="fade-right">
            <User
              className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-300 ${
                isEmailFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative" data-aos="fade-left">
            <Lock
              className={`absolute left-3 top-3 w-5 h-5 transition-colors duration-300 ${
                isPasswordFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:scale-95"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#1E3A8A] to-[#4891e4]  text-white p-3 rounded-lg transition duration-300"
            data-aos="zoom-in"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
