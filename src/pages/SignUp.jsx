import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../lib/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const result = signUp(formData.email, formData.password, formData.name, role);
    
    if (result.success) {
      alert("Account created successfully! Please sign in.");
      navigate("/signin");
    } else {
      setError(result.error || "Sign up failed");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="signup-main">
        <div className="signup-container">
          <div className="signup-card">
            <div className="signup-header">
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Sign up to get started</p>
            </div>

            <div className="role-selector">
              <button
                onClick={() => setRole("student")}
                className={`role-btn ${role === "student" ? "role-btn-active" : ""}`}
              >
                Student
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`role-btn ${role === "admin" ? "role-btn-active" : ""}`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="signup-footer">
              Already have an account?{" "}
              <Link to="/signin" className="signup-link">Sign In</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
