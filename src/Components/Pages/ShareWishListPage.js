import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";

/**
 * Form to edit a wishlist :
 * Anonymous users shall be redirected to "/login" Page
 */
async function ShareWishListPage() {

    let wishlistSharedId = getSessionObject("wishlistShared");
    
    let user = getSessionObject("user");
    // reset #page div
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = "";

    if (!user) {
        return Redirect("/login");

    }

    else {


        // const response = await fetch(`/api/wishlists/${wishlistSharedId}`);

        // if (!response.ok) {
        //     throw new Error(
        //         "fetch error : " + response.status + " : " + response.statusText
        //     );
        // }
        // const wishlist = await response.json();


        /*

        formulaire pour ajouter un utilisateur à une wishlist , recherchée par son username ou son email

        */
        const form = document.createElement("form");
        form.className = "p-5";

        const username = document.createElement("input");
        username.type = "text";
        username.id = "username ";
        username.required = true;
        username.placeholder = "Pseudo utilisateur ou son email";
        username.className = "form-control mb-3";

        const submit = document.createElement("input");
        submit.value = "Ajouter";
        submit.type = "submit";
        submit.className = "btn btn-danger";

        form.appendChild(username);
        form.appendChild(submit);
        form.addEventListener("submit", onSubmit);
        pageDiv.appendChild(form);


        async function onSubmit(e) {
            e.preventDefault();


            try {


                const response = await fetch(`/api/users/find/${username.value}`);

                if (!response.ok) {
                    throw new Error(
                        "fetch error : " + response.status + " : " + response.statusText
                    );
                }

                const userFound = await response.json();
                
                if(userFound.id == user.id){
                    
                    throw new Error(
                        "Vous ne pouvez pas vous ajotuer vous même" 
                      );
                      
                } 
                
                const str = userFound.sharedWishList;
               
                const words = str.split(",");
                for (let i = 0; i < words.length; i++) {
                    //check if wishlist is already in sharedwishlist of the user

                    if(words[i] === wishlistSharedId ) throw new Error(
                        "L'utilisateur peut déjà consulter cette wishList : " 
                      );



                }
                var newWishListShared = "";
                if(words==""){
                    newWishListShared = str.concat(wishlistSharedId);
                }else{
                    newWishListShared = str.concat(","+wishlistSharedId);
                }
                
                
                const options = {
                    method: "PUT", // *GET, POST, PUT, DELETE, etc.
                    body: JSON.stringify({
                        "sharedWishList": newWishListShared
                    }), // body data type must match "Content-Type" header
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user.token,
                    },
                };

                const response2 = await fetch(`/api/users/${userFound.id}`, options); // fetch return a promise => we wait for the response

                if (!response2.ok) {
                    throw new Error(
                        "fetch error : " + response2.status + " : " + response2.statusText
                    );
                }
                else{
                    /*popup reussie*/
                    Redirect("/wishlists/share");
                }
                
                
                

            }
            catch (error) {
               
            }

            
        }



    }
   

}

export default ShareWishListPage;