import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";
import imageWish from "../../img/logo-wish.png"

const ViewWishList = async () => {
    //private key from amazon api at https://rapidapi.com/b2g.corporation/api/amazon24/
    const RAPID_API_KEY = "05871a0257mshf23d8f2255fb47bp1c1254jsne2d0ab7b6b77";
    //blank the page
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML= "";
    //get user from localStorage
    let user = getSessionObject("user");
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    //get wishlistId from localStorage
    let wishlistId = getSessionObject("wishlistInspected");
    //get data from api getOne();
    console.log(wishlistId + " ID DE LA WISHLIST DANS PAGE VIEW");
    const response = await fetch("/api/wishlists/"+wishlistId);
    const wishlist = await response.json();
    //create table header of my wishlist
    const button = document.createElement("button");
    button.innerText= "Ajouter un produit à votre wishlist";
    button.onclick = function(){
        Redirect("/wishlists/addProduct");
    }
    pageDiv.appendChild(button)
    const table = document.createElement("table");
    table.className = "table table-danger";
    tableWrapper.appendChild(table);
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Titre";
    const header2 = document.createElement("th");
    header2.innerText = "Image";
    const header3 = document.createElement("th");
    header3.innerText = "Prix";
    const header4 = document.createElement("th");
    header4.innerText= "Réserver";
    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    header.appendChild(header4);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    //get id of each product from our wishlist, split the json's string content
    const str = wishlist.content;
    //check here if there is no product in the wishlist
    if(wishlist.content === ''){
        
    }else{
        const words = str.split(', ');
        for(let i=0;i<words.length;i++){
            //amazon api async function to get all details
    
                await searchProductFromId(words[i]);
    
            
        }
    }
    
    table.appendChild(tbody);
    pageDiv.appendChild(tableWrapper);
    async function searchProductFromId(id){
        const response2 = await fetch("/api/gifts/idAmazon/"+id);
        if (!response2.ok) {
            // status code was not 200, error status code
            throw new Error(
              "fetch error : " + response2.status + " : " + response2.statusText
            );
        }
        const product =  await response2.json();
        constructTableLine(product);
    };
    /**
   * construct a line into our table 
   * @param {object} product - gift details from the json
   * 
   */
    function constructTableLine(product){
        const line = document.createElement("tr");
            const titleCell = document.createElement("td");
            titleCell.innerText = product.title;
            line.appendChild(titleCell);
            const imageCell = document.createElement("td");
            const url =document.createElement("a");
            url.href = product.url;
            const image = document.createElement("img");
            image.src = product.image;
            image.width = "50";
            image.height = "100";
            url.appendChild(image);
            imageCell.appendChild(url);
            line.appendChild(imageCell);
            const priceCell = document.createElement("td");
            priceCell.innerText = product.price;
            line.appendChild(priceCell);
            //const reservedCell = document.createElement("td");
            if (product.reserved!="false") {
                const imageOkCell = document.createElement("td");
                const imageOk = document.createElement("img");
                imageOk.src = imageWish;
                imageOk.width ="50";
                imageOk.height = "50";
                imageOkCell.appendChild(imageOk);
                line.appendChild(imageOkCell);
            }else{
                const button2Cell = document.createElement("td");
                const button2 = document.createElement("button");
                button2.innerText = "Réserve-moi";
                button2.onclick = function () {
                    updateProductReserved(product);
                    Redirect("/wishlists/id");
                }
                button2Cell.appendChild(button2);
                line.appendChild(button2Cell);
                
                
            }
            const button = document.createElement("button");
            button.innerText = 
            tbody.appendChild(line);
    };
    /**
   * update gift reserved to reservec
   * @param {object} product - gift details from gift json
   * 
   */
    async function updateProductReserved(product){
        const reserved="true";
        const options = {
            method: "PUT",
            body: JSON.stringify({
                reserved: reserved,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: user.token,
            },
        };
        
        const response4 = await fetch("/api/gifts/"+product.id,options);
    }
    


};

export default ViewWishList;