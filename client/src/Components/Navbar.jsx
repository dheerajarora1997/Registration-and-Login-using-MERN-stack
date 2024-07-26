import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <nav>
          <div className="container">
            <h1>Logo</h1>
            <ul>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
