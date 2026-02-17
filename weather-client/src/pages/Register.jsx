import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = "";

        switch (name) {
            case "firstName":
            case "lastName":
                if (!value.trim()) error = "This field is required";
                break;
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

        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (res.ok) {
            login(data.user, data.token);
            alert(data.message);
            navigate("/");
        } else {
            alert(data.message || "Registration failed");
        }
    };

    return (
        <div className="page-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`form-input ${errors.firstName ? 'error' : ''}`}
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`form-input ${errors.lastName ? 'error' : ''}`}
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>

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

                    <button type="submit" className="auth-button">Register</button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account? </span>
                    <a href="/login" className="auth-link">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Register;