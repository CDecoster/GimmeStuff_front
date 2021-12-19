import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";

/**
 * Form to edit a wishlist :
 * Anonymous users shall be redirected to "/login" Page
 */
async function EditWishlistPage() {
    let wishlistModifiedId = getSessionObject("wishlistModified");
    let user = getSessionObject("user");

    // reset #page div
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = "";


    if (!user) {
        return Redirect("/login");

    }

    else {


        try {

            const response = await fetch(`/api/wishlists/${wishlistModifiedId}`);

            if (!response.ok) {
                throw new Error(
                    "fetch error : " + response.status + " : " + response.statusText
                );
            }
            const wishlist = await response.json();
            // create the "edit a wishlist" form
            const form = document.createElement("form");
            form.className = "p-5";

            const title = document.createElement("input");
            title.type = "text";
            title.id = "title";
            title.placeholder = wishlist.title;
            title.className = "form-control mb-3";

            const description = document.createElement("input");
            description.type = "text";
            description.id = "description";
            description.placeholder = wishlist.description;
            description.className = "form-control mb-3";
            // const content = document.createElement("input");

            // content.type = "text";
            // content.id = "content";

            // content.placeholder = "content of wishlist ";
            // content.className = "form-control mb-3";

            const wishListDate = wishlist.end.split("-");
            const wishListDay = wishListDate[2].split("T");
            // const moisPlaceHolder = wishListDate[1];
            // const jourPlaceHolder = wishListDay[0];
            // const anneePlaceHolder = wishListDate[0];
            // const end = document.createElement("div");

            // end.innerHTML = "Date de naissance :";
            const jour = document.createElement("input");
            jour.type = "text";
            jour.id = "jour";
            jour.placeholder = wishListDay[0];
            jour.className = "form-control mb-3";

            const mois = document.createElement("input");
            mois.type = "text";
            mois.id = "mois";
            mois.placeholder = wishListDate[1];
            mois.className = "form-control mb-3";

            const annee = document.createElement("input");
            annee.type = "text";
            annee.id = "annee";
            annee.placeholder = wishListDate[0];
            annee.className = "form-control mb-3";




            // end.appendChild(labelJour);
            // end.appendChild(jour);
            // end.appendChild(labelMois);
            // end.appendChild(mois);
            // end.appendChild(labelAnnee);
            // end.appendChild(annee);


            const submit = document.createElement("input");
            submit.value = "Modifier";
            submit.type = "submit";
            submit.className = "btn btn-danger";


            const labelTitle = document.createElement("label");
            labelTitle.innerText = "Titre de votre wishlist : ";
            const labelDescription = document.createElement("label");
            labelDescription.innerText = "Description de votre wishlist : ";
            const labelJour = document.createElement("label");
            labelJour.innerText = "Date de naissance : \n Jour : ";
            const labelMois = document.createElement("label");
            labelMois.innerText = "Mois : ";
            const labelAnnee = document.createElement("label");
            labelAnnee.innerText = "Annee : ";

            form.appendChild(labelTitle);
            form.appendChild(title);
            form.appendChild(labelDescription);
            form.appendChild(description);
            // form.appendChild(end);
            // form.appendChild(content);
            form.appendChild(labelJour);
            form.appendChild(jour);
            form.appendChild(labelMois);
            form.appendChild(mois);
            form.appendChild(labelAnnee);
            form.appendChild(annee);
            form.appendChild(submit);
            form.addEventListener("submit", onSubmit);
            pageDiv.appendChild(form);
            

            async function onSubmit(e) {
                e.preventDefault();

                

                
                

                if (!title.value) {
                    title.value = title.placeholder;
                    console.log("placeholder into value title : " + title.placeholder);
                }
                if (!description.value) {
                    description.value = description.placeholder;
                    console.log("placeholder into value description : " + description.placeholder);
                }
                if (!annee.value) {
                    annee.value = annee.placeholder;
                    console.log("placeholder into value annee : " + annee.placeholder);

                }
                if (!mois.value) {
                    mois.value = mois.placeholder;
                    console.log("placeholder into value mois : " + mois.placeholder);
                    
                }
                if (!jour.value) {
                    jour.value = jour.placeholder;
                    console.log("placeholder into value jour : " + jour.placeholder);
                    
                }

                var stringAvantJour = "-";
                const stringJour = jour.value.toString();
                
                if (jour.value < 10 && stringJour[0] != "0") {
                    console.log("premier chiffre jour : "+ stringJour[0]);
                    stringAvantJour = "-0";
                }




               
                var stringAvantMois = "-";
                const stringMois = mois.value.toString();
                if (mois.value < 10 && stringMois[0 != "0"]) {
                    console.log("premier chiffre mois : "+ stringMois[0]);
                    stringAvantMois = "-0";
                }





                const end = annee.value + stringAvantMois + mois.value + stringAvantJour + jour.value + "T00:00";
                console.log("date string : "+end);
                // const content = document.getElementById("content");





                console.log("forms values : ", title.value, description.value, end);
                try {
                    const options = {
                        method: "PUT", // *GET, POST, PUT, DELETE, etc.
                        body: JSON.stringify({
                            title: title.value,
                            description: description.value,
                            end: end
                        }), // body data type must match "Content-Type" header
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: user.token,
                        },
                    };

                    const response = await fetch(`/api/wishlists/${wishlistModifiedId}`, options); // fetch return a promise => we wait for the response

                    if (!response.ok) {
                        throw new Error(
                            "fetch error : " + response.status + " : " + response.statusText
                        );
                    }
                    const wishlist = await response.json(); // json() returns a promise => we wait for the data
                    console.log("wishlist modifiee : ");

                    // call the HomePage via the Router
                    Redirect("/");
                } catch (error) {
                    console.error("EditWishlistPage::error: ", error);
                }
            }
        } catch (error) {
            console.error("EditWishlistPage::error: ", error);
        }


    }


}




// function checkYear(annee) {
//     // console.log("year.value.length : " + year.value.length);
//     // if(year === void 0) year.value = yearPlaceHolder;
//     console.log("annee.value : " + annee.value);
// }


export default EditWishlistPage;