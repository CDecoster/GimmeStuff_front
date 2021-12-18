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

            const submit = document.createElement("input");
            submit.value = "Modifier";
            submit.type = "submit";
            submit.className = "btn btn-danger";
            form.appendChild(title);

            form.appendChild(description);
            // form.appendChild(content);
            form.appendChild(submit);
            form.addEventListener("submit", onSubmit);
            pageDiv.appendChild(form);

            async function onSubmit(e) {
                e.preventDefault();
                const title = document.getElementById("title");



                const description = document.getElementById("description");

                // const content = document.getElementById("content");

                console.log("forms values : ", title.value, description.value);
                try {
                    const options = {
                        method: "PUT", // *GET, POST, PUT, DELETE, etc.
                        body: JSON.stringify({
                            title: title.value,
                            description: description.value
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
export default EditWishlistPage;