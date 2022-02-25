import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignin } from "./../../hooks/useSignin";
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, error, isPending } = useSignin();

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <h3>Signin</h3>
        <label>
          <span>Email:</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        {isPending ? (
          <button disabled>Signing in...</button>
        ) : (
          <button>Signin</button>
        )}

        {error && <p>{error}</p>}
      </form>

      <p>No account yet?</p>

      <Link to="/signup">
        <button className="btn-redirect-signup">Register</button>
      </Link>
    </div>
  );
};

export default Signin;
