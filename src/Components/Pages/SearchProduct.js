// import { Redirect } from "../Router/Router";
// import { getSessionObject } from "../../utils/session";
// import { csonParser, parse } from "config/parser";

import { getSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";


const SearchProduct = async () => {
    //var idProduct = "";
    const tableWrapper = document.createElement("div");
    //private key of the amazon api
    const RAPID_API_KEY = "05871a0257mshf23d8f2255fb47bp1c1254jsne2d0ab7b6b77";
    //blank the page
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML= "";
    //get user from localStorage
    let user = getSessionObject("user");
    //get wishlist id from localStorage
    let wishlistId = getSessionObject("wishlistInspected");
    //get data from api getOneWishlist
    const response =  await fetch("/api/wishlists/"+wishlistId);
    const wishlist =  await response.json();
    //button bar to start search on amazon api
    const form = document.createElement("form");
    form.className = "p-5";
    const searchTerm = document.createElement("input");
    searchTerm.type = "text";
    searchTerm.id = "searchTerm";
    searchTerm.value = "Livre";
    searchTerm.required = true;
    searchTerm.className = "form-control mb-3";
    const submit = document.createElement("input");
    submit.value = "Chercher";
    submit.type = "submit";
    submit.className = "btn btn-danger";
    form.appendChild(searchTerm);
    form.appendChild(submit);

    form.addEventListener("submit", onSubmit);
    pageDiv.appendChild(form);

    async function onSubmit(e){
        e.preventDefault();
        const searchTerm = document.getElementById("searchTerm");
        tableWrapper.innerHTML="";
        searchProducts(searchTerm.value);
    }


  /**
   * dynamically create the table
   * @param {json} prod - the json with details of the products from amazon
   * 
   */
    function showTable(prod){
        tableWrapper.className = "table-responsive pt-5";
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
        header4.innerText = "évaluation";
        const header5 = document.createElement("th");
        header5.innerText = "Ajouter à la wishlist"
        header.appendChild(header1);
        header.appendChild(header2);
        header.appendChild(header3);
        header.appendChild(header4);
        header.appendChild(header5);
        table.appendChild(thead);
        //data for the table
        const tbody = document.createElement("tbody");
        // add the data in the table
        var tableIdProduct = new Array (prod.length);
        var i = 0;
        prod.forEach((doc) => { 
            const line = document.createElement("tr");
            const titleCell = document.createElement("td");
            titleCell.innerText = doc.product_title;
            line.appendChild(titleCell);
            const imageCell = document.createElement("td");
            const url =document.createElement("a");
            url.href = doc.product_detail_url;
            const image = document.createElement("img");
            image.src= doc.product_main_image_url;
            image.width = "50";
            image.height = "100";
            url.appendChild(image);
            imageCell.appendChild(url);
            line.appendChild(imageCell);
            const priceCell = document.createElement("td");
            priceCell.innerText = doc.app_sale_price;
            line.appendChild(priceCell);
            const ratingCell = document.createElement("td");
            ratingCell.innerText = doc.evaluate_rate;
            line.appendChild(ratingCell);
            const buttonCell = document.createElement("td");
            const button = document.createElement("button");
            button.innerText = "ajouter à la wishlist";
            button.onclick = function(){
                addGift(doc);
                addGiftToWishList(doc.product_id);    
            }
            buttonCell.appendChild(button);
            line.appendChild(buttonCell);
            tbody.appendChild(line);
            tableIdProduct[i] = doc.product_id;
            i++;
            

        });
        console.log(tableIdProduct[1]);
        table.appendChild(tbody);
        pageDiv.appendChild(tableWrapper);
        
    };


  /**
   * call the amazon api to get a list of result
   * @param {string} term - the search term
   * @returns {json} but call showTable function to create table
   */
    async function searchProducts(term) {   
      fetch("https://amazon24.p.rapidapi.com/api/product?categoryID=aps&keyword=" + term+"&country=FR", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "amazon24.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY
        }
      }).then(response => 
        response.json().then(data => ({
          data: data,
          status: response.status
        })
        ).then(res => {
          showTable(res.data.docs);
          //addGift(res.data.docs); 
        }));
    } 

     /**
   * Adds the gift to the gift json if not already there
   * @param {object} gift - the gift with all details needed to do the CREATE
   * @returns none but redirect to wishlist/id
   */
    async function addGift(gift){
      const title = gift.product_title;
      const image = gift.product_main_image_url;
      const price = gift.app_sale_price;
      const reserverd = false;
      const url = gift.product_detail_url;
      const idAmazon = gift.product_id;
      const option = {
        method: "POST",
        body: JSON.stringify({
          title: title,
          image: image,
          price: price,
          reserved: false,
          url: url,
          idAmazon: idAmazon,
        }),
          headers: {
            "Content-Type": "application/json",
          },
      };
      const response = await fetch("/api/gifts",option);
      if(!response.ok){
        throw new Error("fetch error : "+ response.status+" : "+response.statusText);
      }
      //const gift = await response.json();
    }
    /**
   * Adds the gift to the wishlist
   * @param {number} id - idAmazon of the gift to add in the content of whishlist
   * @returns none but redirect to wishlist/id
   */
    async function addGiftToWishList(id){
      var content = "";
      //if json empty, need to change the start string     
      if (wishlist.content===""){
        content = wishlist.content+id;
      }else{
        content= wishlist.content+", "+id;
      }
      const options = {
        method: "PUT",
        body: JSON.stringify({
          content: content,
        }),
         headers: {
           "Content-Type": "application/json",
           Authorization: user.token,
         },
      };
      const response3 = await fetch(`/api/wishlists/${wishlistId}`,options);
     

      Redirect("/wishlists/id");
    }
    

} 

export default SearchProduct;