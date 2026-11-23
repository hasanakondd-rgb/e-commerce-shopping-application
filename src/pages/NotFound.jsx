import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty-box">
      <div className="empty-icon">🔍</div>
      <h2>404 – Page not found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}
