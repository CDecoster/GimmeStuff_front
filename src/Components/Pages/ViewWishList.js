import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";
import { csonParser, parse } from "config/parser";

const ViewWishList = async () => {
    //private key from amazon api at https://rapidapi.com/b2g.corporation/api/amazon24/
    const RAPID_API_KEY = "05871a0257mshf23d8f2255fb47bp1c1254jsne2d0ab7b6b77";
    //blank the page
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML= "";
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    //get data from api getOne();
    const response = await fetch("/api/whishlists/1");
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
    //get id of each product from our wishlist split it into ID 
    const str = wishlist.content;
    const words = str.split(', ');
    for(let i=0;i<words.length;i++){
        //amazon api async function to get all details

            await searchProductFromId(words[i]);

        
    }
    table.appendChild(tbody);
    pageDiv.appendChild(tableWrapper);
    async function searchProductFromId(id){
        //await new Promise(r => setTimeout(r,2000));
        //tried to make it a sleep function because free api can make only 1
        //request every second
        //sleep(2000).then(() => {
        fetch("https://amazon24.p.rapidapi.com/api/product/"+id+"?country=FR", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "amazon24.p.rapidapi.com",
                "x-rapidapi-key": RAPID_API_KEY
            }
        }).then(response => 
            response.json().then(data => ({
                data:data,
                status: response.status    
        })
        ).then(res => {
            constructTableLine(res.data)
        }));
    //});
    };
    
    function constructTableLine(product){
        const line = document.createElement("tr");
            const titleCell = document.createElement("td");
            titleCell.innerText = product.product_title;
            line.appendChild(titleCell);
            const imageCell = document.createElement("td");
            const url =document.createElement("a");
            url.href = product.product_detail_url;
            const image = document.createElement("img");
            image.src = product.product_main_image_url;
            image.width = "50";
            image.height = "100";
            url.appendChild(image);
            imageCell.appendChild(url);
            line.appendChild(imageCell);
            const priceCell = document.createElement("td");
            priceCell.innerText = product.app_sale_price;
            line.appendChild(priceCell);
            tbody.appendChild(line);
    };
    

     function sleep(time){
         return new Promise ((resolve)=> setTimeout(resolve,time));
     }; 

};

export default ViewWishList;