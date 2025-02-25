import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      <h1>DashBoard</h1>
      <Link to="/login">LogIn</Link>
      {user ? (
        <div>
          <p>👤 UserName: {user.username}</p>
          <p>📧 Email: {user.email}</p>
        </div>
      ) : (
        <p>Please Login First</p>
      )}
    </>
  );
}
