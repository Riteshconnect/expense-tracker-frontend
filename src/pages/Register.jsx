import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/users/register", {
        email,
        password
      });

      alert("Registration successful");

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Registration failed");

    }

  };

  return (

    <div>

      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>
        Register
      </button>

      <p onClick={() => navigate("/")}>
        Already have account? Login
      </p>

    </div>

  );

}

export default Register;