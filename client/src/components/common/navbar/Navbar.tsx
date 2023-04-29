import LogoutButton from "@features/auth/logout/components/LogoutButton";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state: any) => state.user.user);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand mx-5" href="/">
          Recipe Logo
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            {user && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={`/users/${user.id}/recipes`}
                >
                  My Recipes
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
