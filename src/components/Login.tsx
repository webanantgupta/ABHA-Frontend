import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
 
import { 
  FaEnvelope, 
  FaLock, 
  FaSignInAlt, 
} from "react-icons/fa"; 
 
import { useAuth } from "../context/AuthContext"; 

const Login = () => { 
  const navigate = useNavigate(); 
 
  const { login, loading } = useAuth(); 
 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
 
  const [error, setError] = useState(""); 

  const handleSubmit = async ( 
    e: React.FormEvent<HTMLFormElement> 
  ) => { 
    e.preventDefault(); 
 
    setError(""); 
 
    if (!email.trim() || !password.trim()) { 
      setError("Please enter both email and password."); 
      return; 
    } 
 
    try { 
      // Calls the AuthContext login function
      const user = await login(email, password); 
alert("Login successfull")
      // Optional: Role-based navigation based on backend response
      if (user?.role === "patient") {
        navigate("/dashboard"); 
      } else {
        navigate("/dashboard"); 
      }
    } catch (err: any) { 
      // Extracts backend error response or falls back to generic message
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please check your credentials.";

      setError(errorMessage); 
    } 
  }; 
 
  return ( 
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4"> 
 
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"> 
 
        {/* Header */} 
        <div className="text-center mb-8"> 
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100"> 
            <FaSignInAlt className="text-2xl text-blue-600" /> 
          </div> 
 
          <h1 className="text-3xl font-bold text-gray-800"> 
            Welcome Back 
          </h1> 
 
          <p className="mt-2 text-gray-500"> 
            Login to your account 
          </p> 
        </div> 
 
        {/* Error Alert */} 
        {error && ( 
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium"> 
            {error} 
          </div> 
        )} 
 
        {/* Form */} 
        <form 
          onSubmit={handleSubmit} 
          className="space-y-5" 
        > 
 
          {/* Email */} 
          <div> 
            <label className="mb-2 block text-sm font-medium text-gray-700"> 
              Email Address
            </label> 
 
            <div className="relative"> 
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> 
 
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
              /> 
            </div> 
          </div> 
 
          {/* Password */} 
          <div> 
            <label className="mb-2 block text-sm font-medium text-gray-700"> 
              Password 
            </label> 
 
            <div className="relative"> 
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> 
 
              <input 
                type="password" 
                required
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
              /> 
            </div> 
          </div> 
 
          {/* Submit Button */} 
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center" 
          > 
            {loading ? "Logging in..." : "Login"} 
          </button> 
 
        </form> 
 
        {/* Signup Link */} 
        <p className="mt-6 text-center text-sm text-gray-600"> 
          Don't have an account?{" "} 
          <Link 
            to="/patient-signup" 
            className="font-semibold text-blue-600 hover:underline" 
          > 
            Create Account 
          </Link> 
        </p> 
 
      </div> 
 
    </div> 
  ); 
}; 

export default Login;