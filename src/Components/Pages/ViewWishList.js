// import { Redirect } from "../Router/Router";
// import { getSessionObject } from "../../utils/session";
// import { csonParser, parse } from "config/parser";

import { getSessionObject } from "../../utils/session";

const ViewWishList = async () => {
    //private key from amazon api at https://rapidapi.com/b2g.corporation/api/amazon24/
    const RAPID_API_KEY = "05871a0257mshf23d8f2255fb47bp1c1254jsne2d0ab7b6b77";
    //blank the page
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML= "";
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    //get data from api getOne();
    let wishlistId = getSessionObject("wishlistInspected");
    const response = await fetch("/api/wishlists/"+wishlistId);
    const wishlist = await response.json();
    //create table header of my wishlist

    
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
    header3.innerText = "Price";
    const header4 = document.createElement("th");
    header4.innerText= "Reserved";
    header.appendChild(header1);
    header.appendChild(header2);
    header.appendChild(header3);
    header.appendChild(header4);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    //get id of each product from our wishlist, split the json's string content
    const str = wishlist.content;
    const words = str.split(', ');
    for(let i=0;i<words.length;i++){
        //amazon api async function to get all details

            await searchProductFromId(words[i]);

        
    }
    table.appendChild(tbody);
    pageDiv.appendChild(tableWrapper);
    async function searchProductFromId(id){
        const response2 = await fetch(`/api/gifts/idAmazon/${id}`);
        const product =  await response2.json();
        constructTableLine(product);
    };
    //construct the line of the table in async function (after amazon call)
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
            tbody.appendChild(line);
    };
    

     function sleep(time){
         return new Promise ((resolve)=> setTimeout(resolve,time));
     }; 

};

export default ViewWishList;