import { Link } from "@remix-run/react";

const links = `text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8`;

export default function NavBar() {
  return (
    <nav className="flex gap-4 p-2">
      <Link className={links} to="/">
        Home
      </Link>
      <Link className={links} to="/join">
        Sign up
      </Link>
      <Link className={links} to="/login">
        Login
      </Link>
      <Link className={links} to="/customers">
        Customers
      </Link>
      <span className="absolute right-2">
        <Link className={links} to="/logout">
          Logout
        </Link>
      </span>
    </nav>
  );
}
