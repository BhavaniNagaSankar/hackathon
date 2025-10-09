import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../lib/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const result = signIn(email, password, role);
    
    if (result.success) {
      navigate(role === "admin" ? "/admin-dashboard" : "/student-dashboard");
    } else {
      setError(result.error || "Sign in failed");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="signin-main">
        <div className="signin-container">
          <div className="signin-card">
            <div className="signin-header">
              <h1 className="signin-title">Welcome Back</h1>
              <p className="signin-subtitle">Sign in to your account</p>
            </div>

            <div className="role-selector">
              <button
                onClick={() => setRole("student")}
                className={`role-btn ${role === "student" ? "role-btn-active" : ""}`}
              >
                Student Sign In
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`role-btn ${role === "admin" ? "role-btn-active" : ""}`}
              >
                Admin Sign In
              </button>
            </div>

            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="demo-credentials">
              <p className="demo-title">Demo Credentials:</p>
              <p className="demo-text">
                <strong>Student:</strong> student@school.edu / student123<br />
                <strong>Admin:</strong> admin@school.edu / admin123
              </p>
            </div>

            <p className="signin-footer">
              Don't have an account?{" "}
              <Link to="/signup" className="signin-link">Sign Up</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
