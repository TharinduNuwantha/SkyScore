import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert(data.message);
            navigate("/");
        } else {
            alert(data.message || "Registration failed");
        }
    };

    return (
        <div style={{ maxWidth: "300px", margin: "100px auto" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    ref={firstNameRef}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    ref={lastNameRef}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    style={{ width: "100%", marginBottom: "10px" }}
                    required
                />
                <button type="submit" style={{ width: "100%" }}>Register</button>
            </form>
        </div>
    );
};

export default Register;