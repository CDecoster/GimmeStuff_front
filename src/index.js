import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/style.css";

//import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import {Router} from "./Components/Router/Router";
import Sidebar from "./Components/Navbar/Sidebar";

// Improve the header with dynamic HTML generation
//Header();

/// Improve the navbar : deal with the click events on navbar items
Navbar();

/// SidebarLayout
Sidebar();

// Improve the header with dynamic HTML generation
Footer();


// Call the router
// Call the HomePage
Router();