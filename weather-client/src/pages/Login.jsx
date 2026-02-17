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

    // Styling for input fields with validation
    const getInputStyle = (fieldName) => ({
        width: "100%",
        marginBottom: errors[fieldName] ? "5px" : "10px",
        padding: "8px",
        border: errors[fieldName] ? "1px solid #ef4444" : "1px solid #ccc",
        borderRadius: "4px"
    });

    const errorStyle = {
        color: "#ef4444",
        fontSize: "12px",
        marginBottom: "10px",
        display: "block"
    };

    return (
        <div style={{ maxWidth: "300px", margin: "100px auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        style={getInputStyle("email")}
                    />
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={getInputStyle("password")}
                    />
                    {errors.password && <span style={errorStyle}>{errors.password}</span>}
                </div>

                <button type="submit" style={{ width: "100%", marginBottom: "15px", padding: "10px", cursor: "pointer" }}>
                    Login
                </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <span>Don't have an account? </span>
                <Link to="/register" style={{ color: "#6366f1", fontWeight: "600", textDecoration: "none" }}>
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
