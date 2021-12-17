
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";

/**
 * View the Register form :
 * render a register page into the #page div (formerly render function)
 */
function RegisterPage() {
  let check = false;
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "<h2>Create account</h2>";
  // create a login form
  const form = document.createElement("form");
  form.className = "p-5";
  const username = document.createElement("input");
  username.type = "text";
  username.id = "username";
  username.placeholder = "username";
  username.required = true;
  username.className = "form-control mb-3";
  const email = document.createElement("input");
  email.type = "test"
  email.id = "email"
  email.placeholder = "exemple@hotmail.com"
  email.required = true;
  email.className = "form-control mb-3";
  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  password.placeholder = "password";
  password.className = "form-control mb-3";
  const Cpassword = document.createElement("input");
  Cpassword.type = "password";
  Cpassword.id = "Cpassword";
  Cpassword.required = true;
  Cpassword.placeholder = " Confirm password";
  Cpassword.className = "form-control mb-3";
  const submit = document.createElement("input");
  submit.value = "Register";
  submit.type = "submit";
  submit.className = "btn btn-danger";
  form.appendChild(username);
  form.appendChild(email);
  form.appendChild(password);
  form.appendChild(Cpassword);
  form.appendChild(submit);
 
 
  
 

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const password2 = document.getElementById("Cpassword");
    checkInputs();
    console.log("credentials", username.value, password.value);

    function checkInputs(){
      const usernameValue = username.value.trim();
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      const password2Value = password2.value.trim();

      if(usernameValue ===''){
        setErrorFor(username,'Username cannot be blank');
      }else{
        setSuccesFor(username);
      }
      if(password2Value!== passwordValue){
        setErrorFor(password2,'Password does not match');
        check = false;
      }


    }

    function setErrorFor(input,message){
      const formControl = input;
      console.log(formControl);
      formControl.className='form-control mb-3 error';

    }

    function setSuccesFor(input){
      const formControl = input.parentElement;
      formControl.className ='form-control mb-3 succes'; 
    }

    if(check==true){
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

      const response = await fetch("/api/auths/register", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);

      // save the user into the localStorage
      setSessionObject("user", user);
      

      // Rerender the navbar for an authenticated user : temporary step prior to deal with token
      Navbar({isAuthenticated:true});

    
      // call the HomePage
      Redirect("/");
     
    } catch (error) {
      console.error("RegisterPage::error: ", error);
    }
  }
  }
}

export default RegisterPage;