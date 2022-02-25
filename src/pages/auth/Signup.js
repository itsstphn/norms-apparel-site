import "./Signup.css";
import { useSignup } from "./../../hooks/useSignup";
import { useState } from "react";

const Signup = () => {
  const { error, isPending, signup } = useSignup();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(displayName, email, password);
  };

  return (
    <div className="signup">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Enter your Display Name:</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            required
          />
        </label>

        <label>
          <span>Enter Email:</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>
        <label>
          <span>Enter Password:</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        {isPending ? (
          <button disabled>Signing up...</button>
        ) : (
          <button>Signup</button>
        )}

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
