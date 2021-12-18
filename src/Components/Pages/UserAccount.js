import { getSessionObject } from "../../utils/session";



function UserAcount(){
let user = getSessionObject("user");
const pageDiv = document.querySelector("#page");
pageDiv.innerHTML = `<h1> User's profil<h1>`;
const form = document.createElement("form");
form.className = "p-5";
const emailtext = document.createElement("div");
emailtext.innerText = "Email";
const email = document.createElement("input");
email.type = "test"
email.id = "email"
email.placeholder = user.username;
email.required = true;
email.className = "form-control mb-3";
const emailChange = document.createElement("input");
emailChange.value = "Change email"
emailChange.type = "submit"
emailChange.className = "btn btn-danger";
const currentPasswordText = document.createElement("div");
currentPasswordText.innerText = "Current password";
const currentPassword = document.createElement("input");
currentPassword.type = "password";
currentPassword.id = "curPassword";
currentPassword.required = true;
currentPassword.placeholder = " Current password";
currentPassword.className = "form-control mb-3";
const newPasswordText = document.createElement("div");
newPasswordText.innerText = "new password";
const newPassword = document.createElement("input");
newPassword.type = "password";
newPassword.id = "newPassword";
newPassword.required = true;
newPassword.placeholder = " new password";
newPassword.className = "form-control mb-3";
const confirmPasswordText = document.createElement("div");
confirmPasswordText.innerText = "confirm password";
const confirmPassword = document.createElement("input");
confirmPassword.type = "password";
confirmPassword.id = "confirmPassword";
confirmPassword.required = true;
confirmPassword.placeholder = " confirm password";
confirmPassword.className = "form-control mb-3";
const passwordChange = document.createElement("input");
passwordChange.value = "Change password"
passwordChange.type = "submit"
passwordChange.className = "btn btn-danger";
form.appendChild(emailtext);
form.appendChild(email);
form.appendChild(emailChange);
form.appendChild(currentPasswordText);
form.appendChild(currentPassword);
form.appendChild(newPasswordText);
form.appendChild(newPassword);
form.appendChild(confirmPasswordText);
form.appendChild(confirmPassword);
form.appendChild(passwordChange);
form.addEventListener("collapse", onClickCollapse);
pageDiv.appendChild(form);

async function onClickCollapse(e) {
e.preventDefault();
console.log("test");



try {
    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        //email: email.value,
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auths/userAccount", options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      PopupError();
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
  
    // Display the succes Pop-up
    PopupSucces();
    
   
  } catch (error) {
    console.error("RegisterPage::error: ", error);
    
  }

}
}

export default UserAcount;