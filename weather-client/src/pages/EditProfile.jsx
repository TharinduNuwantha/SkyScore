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
    // Styling for input fields with validation
    const getInputStyle = (fieldName) => ({
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: errors[fieldName] ? "1px solid #ef4444" : "1px solid #ddd",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-primary)"
    });

    const errorStyle = {
        color: "#ef4444",
        fontSize: "12px",
        marginTop: "5px",
        display: "block"
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "var(--card-bg)", color: "var(--text-primary)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Profile</h2>
            {submitError && <div style={{ color: "#ef4444", marginBottom: "15px", textAlign: "center" }}>{submitError}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        style={getInputStyle("firstName")}
                    />
                    {errors.firstName && <span style={errorStyle}>{errors.firstName}</span>}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        style={getInputStyle("lastName")}
                    />
                    {errors.lastName && <span style={errorStyle}>{errors.lastName}</span>}
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        style={getInputStyle("email")}
                    />
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontWeight: "bold"
                    }}
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
