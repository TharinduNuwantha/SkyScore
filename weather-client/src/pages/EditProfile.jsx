import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user, token, updateUser } = useAuth();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        if (user) {
            setFormState({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""
            });
        }
    }, [user]);

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
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formState).forEach(key => {
            const error = validate(key, formState[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setSubmitError(null);

        try {
            const res = await fetch("http://localhost:5000/api/auth/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formState)
            });

            const data = await res.json();

            if (res.ok) {
                updateUser(data.user);
                alert("Profile updated successfully");
                navigate("/"); // Or stay on the page
            } else {
                setSubmitError(data.message || "Failed to update profile");
            }
        } catch (err) {
            console.error("Update error:", err);
            setSubmitError("An error occurred while updating profile");
        } finally {
            setLoading(false);
        }
    };

    // Styling for input fields with validation
    return (
        <div className="page-container">
            <div className="auth-card">
                <h2 className="auth-title">Edit Profile</h2>
                {submitError && <div className="error-message" style={{ textAlign: "center", marginBottom: "16px" }}>{submitError}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label style={{ fontWeight: "600", color: "var(--text-secondary)" }}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            className={`form-input ${errors.firstName ? 'error' : ''}`}
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                        <label style={{ fontWeight: "600", color: "var(--text-secondary)" }}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                            className={`form-input ${errors.lastName ? 'error' : ''}`}
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                        <label style={{ fontWeight: "600", color: "var(--text-secondary)" }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-button"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
