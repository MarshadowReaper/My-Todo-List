import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section>
      <h2>404 - Page Not Found</h2>

      <p>The page you requested does not exist.</p>

      <Link to="/">Go Home</Link>
    </section>
  );
}

export default NotFoundPage;
