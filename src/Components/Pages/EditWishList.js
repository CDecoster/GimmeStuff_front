import { end } from "@popperjs/core";
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
            const moisPlaceHolder = wishListDate[1];
            const jourPlaceHolder = wishListDay[0];
            const anneePlaceHolder = wishListDate[0];
            const end = document.createElement("div");

            end.innerHTML = "Date de naissance :";
            const jour = document.createElement("input");
            jour.type = "text";
            jour.id = "jour";
            jour.placeholder = jourPlaceHolder;
            jour.className = "form-control mb-3";

            const mois = document.createElement("input");
            mois.type = "text";
            mois.id = "mois";
            mois.placeholder = moisPlaceHolder;
            mois.className = "form-control mb-3";
            const annee = document.createElement("input");
            annee.type = "text";
            annee.id = "annee";
            annee.placeholder = anneePlaceHolder;
            annee.className = "form-control mb-3";
            const labelJour = document.createElement("label");
            labelJour.innerText = "Jour : ";
            const labelMois = document.createElement("label");
            labelMois.innerText = "Mois : ";
            const labelAnnee = document.createElement("label");
            labelAnnee.innerText = "Annee : ";
            const breakPoint = document.createElement("label");
            breakPoint.innerText = "";
            end.appendChild(breakPoint);
            end.appendChild(labelJour);
            end.appendChild(jour);
            end.appendChild(labelMois);
            end.appendChild(mois);
            end.appendChild(labelAnnee);
            end.appendChild(annee);


            const submit = document.createElement("input");
            submit.value = "Modifier";
            submit.type = "submit";
            submit.className = "btn btn-danger";

            const labelTitle = document.createElement("label");
            labelTitle.innerText = "Titre de votre wishlist : ";
            const labelDescription = document.createElement("label");
            labelDescription.innerText = "Description de votre wishlist : ";
            form.appendChild(labelTitle);
            form.appendChild(title);
            form.appendChild(labelDescription);

            form.appendChild(description);
            form.appendChild(end);
            // form.appendChild(content);
            form.appendChild(submit);
            form.addEventListener("submit", onSubmit);
            pageDiv.appendChild(form);

            async function onSubmit(e) {
                e.preventDefault();
                const title = document.getElementById("title");


                // console.log("title :" + title.value);
                // console.log("annee :" + annee);
                // const description = document.getElementById("description");
                // console.log("on submit before check data");
                // if (mois === void 0) mois = moisPlaceHolder;
                // if (annee === void 0) annee = anneePlaceHolder;
                // if (jour === void 0) jour = jourPlaceHolder;

                if (!title.value) {
                    title.value = title.placeholder;
                }
                if (!description.value) {
                    description.value = title.placeholder;
                }
               
                console.log("on submit after check data");
                const jour = document.getElementById("jour");
                const mois = document.getElementById("mois");
                const annee = document.getElementById("annee");
                console.log("before check");
                const end = checkYear(annee.value) + "-" + checkMonth(mois.value) + "-" + checkDay(jour.value) + "T00:00";
                console.log("date de fin wishlist : " + end);
                // const content = document.getElementById("content");

                console.log("title place holder: " + title.placeholder);



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


function checkDay(jour) {
    // console.log("jour.value.length : " + jour.value.length);
    // if(jour === void 0) jour.value = jourPlaceHolder;
    if (jour < 10) return "0" + jour;
    console.log("jour.value : " + jour.value);
}

function checkMonth(mois) {
    // console.log("mois.value.length : " + mois.value.length);
    // if(mois === void 0) mois.value = moisPlaceHolder;
    if (mois < 10) return "0" + mois;
   console.log("mois.value : " + mois.value);
}

function checkYear(annee) {
    // console.log("year.value.length : " + year.value.length);
    // if(year === void 0) year.value = yearPlaceHolder;
    console.log("annee.value : " + annee.value);
}


export default EditWishlistPage;