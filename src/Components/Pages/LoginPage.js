
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import PopupSucces from "../../utils/PopupSucces";
import PopupError from "../../utils/PopupError";

/**
 * View the Login form :
 * render a login page into the #page div (formerly login function)
 */
function LoginPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
  // create a login form
  const form = document.createElement("form");
  form.className = "p-5";
  const username = document.createElement("input");
  username.type = "text";
  username.id = "username";
  username.placeholder = "nom d'utilisateur";
  username.required = true;
  username.className = "form-control mb-3";
  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  password.placeholder = "mot de passe";
  password.className = "form-control mb-3";
  const submit = document.createElement("input");
  submit.value = "Se connecter";
  submit.type = "submit";
  submit.className = "btn btn-danger";
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

  async function onSubmit(e) {
    
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");''
    


    
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options); // fetch return a promise => we wait for the response
      
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      

      // try{
      //   const options2 = {
      //     method: "GET",
      //     body: JSON.strinfigy({
      //       username: username.value,
      //     }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   }
      // };


      // save the user into the localStorage
      setSessionObject("user", user);

      // Rerender the navbar for an authenticated user : temporary step prior to deal with token
      Navbar({isAuthenticated:true});

      // call the HomePage via the Router
      Redirect("/");
      PopupSucces("Vous êtes connecté!");
      
    } catch (error) {
      
      PopupError("Mot de passe ou nom d'utilisateur erroné")
    }
  }
}

export default LoginPage;