
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import PopupSucces from "../../utils/PopupSucces";
import PopupError from "../../utils/PopupError";


/**
 * View the Register form :
 * render a register page into the #page div (formerly render function)
 */
function RegisterPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
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
  email.type = "email"
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
  const confirmPassword = document.createElement("input");
  confirmPassword.type = "password";
  confirmPassword.id = "confirmPassword";
  confirmPassword.required = true;
  confirmPassword.placeholder = " Confirm password";
  confirmPassword.className = "form-control mb-3";
  const submit = document.createElement("input");

  const jour = document.createElement("input");
  jour.type = "text";
  jour.id = "jour";
  jour.required = true;
  jour.placeholder = "25";
  jour.className = "form-control mb-3";

  const mois = document.createElement("input");
  mois.type = "text";
  mois.id = "mois";
  mois.required = true;
  mois.placeholder = "08";
  mois.className = "form-control mb-3";

  const annee = document.createElement("input");
  annee.type = "text";
  annee.id = "annee";
  annee.required = true;
  annee.placeholder = "2022";
  annee.className = "form-control mb-3";

  const labelJour = document.createElement("label");
  labelJour.innerText = "Date de naissance : \n Jour : ";
  const labelMois = document.createElement("label");
  labelMois.innerText = "Mois : ";
  const labelAnnee = document.createElement("label");
  labelAnnee.innerText = "Annee : ";

  submit.value = "Register";
  submit.type = "submit";
  submit.className = "btn btn-danger";
  form.appendChild(username);
  form.appendChild(email);
  form.appendChild(password);
  form.appendChild(confirmPassword);
  form.appendChild(labelJour);
  form.appendChild(jour);
  form.appendChild(labelMois);
  form.appendChild(mois);
  form.appendChild(labelAnnee);
  form.appendChild(annee);
  form.appendChild(submit);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

  async function onSubmit(e) {
    let checkPassword = true;
    e.preventDefault();


    checkInputs();
    console.log("credentials", username.value, password.value, email.value);

    function checkInputs() {
      const passwordValue = password.value.trim();
      const password2Value = confirmPassword.value.trim();


      if (password2Value !== passwordValue) {
        PopupError();
        return;
      }



    }



    // function setSuccesFor(input) {
    //   const formControl = input.parentElement;
    //   formControl.className = 'form-control mb-3 succes';
    // }

    var stringAvantJour = "-";
    const stringJour = jour.value.toString();

    if (jour.value < 10 && stringJour[0] != "0") {
      console.log("premier chiffre jour : " + stringJour[0]);
      stringAvantJour = "-0";
    }


    var stringAvantMois = "-";
    const stringMois = mois.value.toString();
    if (mois.value < 10 && stringMois[0] != "0") {
      console.log("premier chiffre mois : " + stringMois[0]);
      stringAvantMois = "-0";
    }

    const birthday = annee.value + stringAvantMois + mois.value + stringAvantJour + jour.value + "T00:00";
    console.log("date string : " + birthday);



    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          email: email.value,
          birthday: birthday

        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/register", options); // fetch return a promise => we wait for the response

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
      Navbar({ isAuthenticated: true });


      // call the HomePage
      Redirect("/");

      // Display the succes Pop-up
      PopupSucces();


    } catch (error) {
      console.error("RegisterPage::error: ", error);

    }





  }
}

export default RegisterPage;