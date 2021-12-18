import { Navbar as BootstrapNavbar } from "bootstrap";
import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import logo from "../../img/logo-wish.png";

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  let user = getSessionObject("user");
  const logowish = new Image();
  logowish.src = logo;
  logowish.height = 50;
  navbarWrapper.appendChild(logowish)
  
  if (!user) {
    navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-danger">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">${logowish}</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/register">Register</a>
              </li>            
            </ul>
          </div>
        </div>
      </nav>
  `;
  } else {
    navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-danger">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">e-Pizzeria</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Home</a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/wishlists/add">Add a wishlist</a>
              </li>   
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/logout">Logout</a>
              </li>
              <li class="nav-item">
              <a class="nav-item nav-link disabled" href="#">${user.username}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  `;
  }
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;