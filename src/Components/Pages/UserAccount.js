import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";
import PopupSucces from "../../utils/PopupSucces";
import PopupError from "../../utils/PopupError";




async function UserAcount() {
  let user = getSessionObject("user");

  try {
    const response = await fetch("/api/users/" + user.id);
    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }


    const userFound = await response.json();
    // Get the user from the API for PUT purpose


    //empty the page
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = `<h1> Mon profil <h1>`;
    const form = document.createElement("form");
    form.className = "p-5";

    const username = document.createElement("input");
    username.type = "text";
    username.id = "username";
    username.placeholder = userFound.username;
    username.className = "form-control mb-3";

    const email = document.createElement("input");
    email.type = "email"
    email.id = "email"
    email.placeholder = userFound.email;
    email.className = "form-control mb-3";

    const currentPassword = document.createElement("input");
    currentPassword.type = "password";
    currentPassword.id = "currentPassword";
    currentPassword.required = true;
    currentPassword.placeholder = "Mot de passe actuel";
    currentPassword.className = "form-control mb-3";

    const password = document.createElement("input");
    password.type = "password";
    password.id = "password";
    password.placeholder = "Mot de passe";
    password.className = "form-control mb-3";

    const confirmPassword = document.createElement("input");
    confirmPassword.type = "password";
    confirmPassword.id = "confirmPassword";
    confirmPassword.placeholder = "Mot de passe";
    confirmPassword.className = "form-control mb-3";


    /* if we want to let the user change his birthday date*/
    // const jour = document.createElement("input");
    // jour.type = "text";
    // jour.id = "jour";
    // jour.placeholder = "25";
    // jour.className = "form-control mb-3";

    // const mois = document.createElement("input");
    // mois.type = "text";
    // mois.id = "mois";
    // mois.placeholder = "08";
    // mois.className = "form-control mb-3";

    // const annee = document.createElement("input");
    // annee.type = "text";
    // annee.id = "annee";
    // annee.placeholder = "2022";
    // annee.className = "form-control mb-3";

    const submit = document.createElement("input");

    const labelUtilisateur = document.createElement("label");
    labelUtilisateur.innerText = "Pseudo : ";
    const labelEmail = document.createElement("label");
    labelEmail.innerText = "Email : ";
    const labelCurrentPassword = document.createElement("label");
    labelCurrentPassword.innerText = "Mot de passe actuel(obligatoire) : ";
    const labelMdp = document.createElement("label");
    labelMdp.innerText = "Mot de passe : ";
    const labelConfirmMpd = document.createElement("label");
    labelConfirmMpd.innerText = "Confirmer mot de passe : ";
    // const labelJour = document.createElement("label");
    // labelJour.innerText = "Date de naissance : \n Jour : ";
    // const labelMois = document.createElement("label");
    // labelMois.innerText = "Mois : ";
    // const labelAnnee = document.createElement("label");
    // labelAnnee.innerText = "Annee : ";


    submit.value = "Modifier";
    submit.type = "submit";
    submit.className = "btn btn-danger";
    form.appendChild(labelUtilisateur);
    form.appendChild(username);
    form.appendChild(labelEmail);
    form.appendChild(email);
    form.appendChild(labelCurrentPassword);
    form.appendChild(currentPassword);
    form.appendChild(labelMdp);
    form.appendChild(password);
    form.appendChild(labelConfirmMpd);
    form.appendChild(confirmPassword);
    // form.appendChild(labelJour);
    // form.appendChild(jour);
    // form.appendChild(labelMois);
    // form.appendChild(mois);
    // form.appendChild(labelAnnee);
    // form.appendChild(annee);
    form.appendChild(submit);
    form.addEventListener("submit", onSubmit);
    pageDiv.appendChild(form);

  


    async function onSubmit(e) {
      e.preventDefault();
      if (!username.value) {
        username.value = username.placeholder;
        console.log("placeholder into value username : " + username.placeholder);
      }
      if (!email.value) {
        email.value = email.placeholder;
        console.log("placeholder into value email : " + email.placeholder);
      }
      


      var newPasswordUser = currentPassword.value;
      console.log("newPasswordUser :"+newPasswordUser);

      const options3 = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          username: userFound.username,
          password: currentPassword.value,
          
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options3); // fetch return a promise => we wait for the response
      
      if (!response.ok) {
        throw new Error(
          "fetch error current password is wrong: " + response.status + " : " + response.statusText
        );
      }
       await response.json(); // json() returns a promise => we wait for the data

       if (password.value != confirmPassword.value) {
         
        throw new Error(
          "Password dont match"
          
        );
      }

      if(confirmPassword.value){
        newPasswordUser = confirmPassword.value;
      }

      console.log("username :"+username.value);
      console.log("email :"+email.value);
      console.log("password :"+newPasswordUser);
      console.log("birthday :"+userFound.birthday);

      const options2 = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: newPasswordUser,
          birthday: userFound.birthday

        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,

        },
      };

      const response2 = await fetch(`/api/users/${userFound.id}`, options2); // fetch return a promise => we wait for the response

      if (!response2.ok) {
        PopupError();
        throw new Error(
          "update error : " + response2.status + " : " + response2.statusText

        );


      }
      await response2.json(); // json() returns a promise => we wait for the data
      




      // call the HomePage
      Redirect("/");

      // Display the succes Pop-up
      PopupSucces("Credentials changed!");





    }
  } catch (error) {
    console.error("RegisterPage::error: ", error);
    PopupError("Try again");
  }
}

export default UserAcount;