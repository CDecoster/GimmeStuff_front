import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";
import PopupSucces from "../../utils/PopupSucces";
import PopupError from "../../utils/PopupError";
import { left } from "@popperjs/core";


const UserAcount = async()=>{
let user = getSessionObject("user");
const userid = user.id;
// Get the user from the API for PUT purpose
const responseU = await fetch("/api/users/"+userid);
const userFromAPi = await responseU.json();
const pageDiv = document.querySelector("#page");
pageDiv.innerHTML = `<h1> Mon profil <h1>`;
const form1 = document.createElement("form");
form1.className = "p-5";
const emailtext = document.createElement("div");
emailtext.innerText = "Email";
const email = document.createElement("input")
email.type = "test"
email.id = "myEmail"
email.placeholder = user.email;
email.className = "form-control mb-3";

const currentPasswordText = document.createElement("div");
currentPasswordText.innerText = "Current password";
const currentPassword = document.createElement("input");
currentPassword.type = "password";
currentPassword.id = "curPassword";

currentPassword.placeholder = " Current password";
currentPassword.className = "form-control mb-3";
const newPasswordText = document.createElement("div");
newPasswordText.innerText = "new password";
const newPassword = document.createElement("input");
newPassword.type = "password";
newPassword.id = "newPassword";
newPassword.placeholder = " new password";
newPassword.className = "form-control mb-3";
const confirmPasswordText = document.createElement("div");
confirmPasswordText.innerText = "confirm password";
const confirmPassword = document.createElement("input");
confirmPassword.type = "password";
confirmPassword.id = "confirmPassword";
confirmPassword.placeholder = " confirm password";
confirmPassword.className = "form-control mb-3";
const passwordChange = document.createElement("input");
passwordChange.value = "Save change"
passwordChange.type = "submit"
passwordChange.className = "btn btn-danger";

form1.appendChild(emailtext);
form1.appendChild(email);
form1.appendChild(currentPasswordText);
form1.appendChild(currentPassword);
form1.appendChild(newPasswordText);
form1.appendChild(newPassword);
form1.appendChild(confirmPasswordText);
form1.appendChild(confirmPassword);
form1.appendChild(passwordChange);
pageDiv.appendChild(form1);
form1.addEventListener("submit", onSubmit);


async function onSubmit(e) {
e.preventDefault();
const emailU = userFromAPi.email;
const passwordU = userFromAPi.password;
let email = document.getElementById("myEmail");
let oldPassword  = document.getElementById("curPassword");
let newPasswordUser = document.getElementById("newPassword");
let confirmPassword = document.getElementById("confirmPassword");

//Check if the current password is the good one


// Check if it's the email or the password who has to be changed
if(email.value==='' && newPasswordUser.value !=''){
    email.value = emailU;

}

if(newPasswordUser.value ==='' && email!='' ){
  newPasswordUser.value = passwordU;
}
console.log("email ="+email.value);
console.log("pass ="+newPasswordUser.value);


if(newPasswordUser=! confirmPassword){
  console.log("oldpassword =" +oldPassword);
  console.log("passwordU = "+ passwordU);
    PopupError("password does not match");
    Redirect("/UserAccount");
}else{
try {
    const options = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        email: email.value,
        password: newPasswordUser.value,
        
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        
      },
    };

    const response = await fetch(`/api/users/${userid}`, options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      PopupError();
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
        
      );
    
      
    }
    const user = await response.json(); // json() returns a promise => we wait for the data
    console.log("user authenticated", user);



  
    // call the HomePage
    Redirect("/");
  
    // Display the succes Pop-up
    PopupSucces("Credentials changed!");
    
   
  } catch (error) {
    console.error("RegisterPage::error: ", error);
    PopupError("Try again");
  }

}
}
}

export default UserAcount;