import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = "";

        switch (name) {
            case "email":
                if (!value.trim()) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email address";
                break;
            case "password":
                if (!value) error = "Password is required";
                else if (value.length < 8) error = "Password must be at least 8 characters";
                else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) error = "Password must contain letters and numbers";
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Live validation
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validate(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            login(data.user, data.token);
            alert("Login successful");
            navigate("/");
        } else {
            alert(data.message || "Invalid credentials");
        }
    };

    return (
        <div className="page-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="auth-link">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
