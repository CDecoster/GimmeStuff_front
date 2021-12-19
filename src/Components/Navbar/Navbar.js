
import { getSessionObject} from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
import logo from "../../img/logo-wish.png";


const Navbar = async () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  let user = getSessionObject("user");
  const logowish = new Image();
  logowish.src = logo;
  logowish.height = 50;
  navbarWrapper.appendChild(logowish);




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
                <a class="nav-link" href="#" data-uri="/login">Se connecter</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/register">S'inscrire</a>
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
                <a class="nav-link active" aria-current="page" href="#" data-uri="/">Accueil</a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/wishlists/add">Ajouter wishlist</a>
              </li>
              <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ">
          Mes wishlist 
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">            
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
          </div>
          </li>
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Wishlist partagées
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
            </div>
            </li>
              <li class="nav-item">
              <a class="nav-link" href="#" data-uri="/UserAccount">Mon compte</a>
            </li>      
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/logout">Se déconnecter</a>
              </li>
              <li class="nav-item">
              <a class="nav-item nav-link disabled" href="#">${user.username}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  `
  


  
  
  navbarWrapper.innerHTML = navbar;
};
}
export default Navbar;