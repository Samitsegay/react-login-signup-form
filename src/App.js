import { useState } from "react";
import "./Login.css";

function App() {
  const [isSignup, setIsSignup] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const emailExists = users.find((u) => u.email === email);
    if (emailExists) {
      alert("Email already registered");
      return;
    }

    const newUser = { fname, lname, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Signup successful! Please login.");
    setIsSignup(false);
    setFname("");
    setLname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    alert(`Welcome ${user.fname}!`);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={isSignup ? handleSignup : handleLogin}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {!isSignup && <a href="#" className="forgot">Forgot password?</a>}

        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default App;
