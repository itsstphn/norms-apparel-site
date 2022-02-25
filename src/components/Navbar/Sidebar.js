import { Link } from "react-router-dom";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { useSignout } from "./../../hooks/useSignout";
import "./Sidebar.css";

const Sidebar = ({ closeSidebar, isActive }) => {
  const { user } = useAuthContext();
  const { error, isPending, signout } = useSignout();

  const handleSignout = () => {
    signout();
    closeSidebar();
    console.log(user);
  };

  return (
    <div
      className={`sidebar ${isActive ? "active" : ""}`}
      style={{ height: window.innerHeight }}
    >
      <button onClick={closeSidebar}>
        <i className="far fa-times-circle"></i>
      </button>

      {user && (
        <div className="profile">
          <p>Welcome {user.displayName}!.</p>
          <button onClick={handleSignout}>Signout</button>
          {error && <p>{error}</p>}
        </div>
      )}

      {!user && (
        <Link onClick={closeSidebar} to="/signin">
          Sign In / Register
        </Link>
      )}

      <Link onClick={closeSidebar} to="/">
        Home
      </Link>

      <Link onClick={closeSidebar} to="/">
        Vouchers
      </Link>
      <Link onClick={closeSidebar} to="/">
        My Orders
      </Link>
      <Link onClick={closeSidebar} to="/create-listing">
        Create a New Listing
      </Link>
    </div>
  );
};

export default Sidebar;
