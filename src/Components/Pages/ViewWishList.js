import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";
import { csonParser, parse } from "config/parser";

function ViewWishList() {
    const RAPID_API_KEY = "732761fc38msh2f411d236ffbc8ep1a3f51jsn0f4c136dfa4a";
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML= "";

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
    submit.value = "Search";
    submit.type = "submit";
    submit.className = "btn btn-danger";
    form.appendChild(searchTerm);
    form.appendChild(submit);

    form.addEventListener("submit", onSubmit);
    pageDiv.appendChild(form);

    async function onSubmit(e){
        e.preventDefault();
        const searchTerm = document.getElementById("searchTerm");

        console.log("forms values : ", searchTerm.value);
        
        //parse
        const docs = searchProducts(searchTerm);
        console.log("SEARCH PRODUCT : "+docs);
        showTable(docs);
    }


    //array of products from Amazon API
    
    function showTable(docs){
        //create htmltable dynamic
        console.log("JE SUIS ICI 1");
        const tableWrapper = document.createElement("div");
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
        header3.innerText = "Price";
        const header4 = document.createElement("th");
        header4.innerText = "Rating";
        const header5 = document.createElement("th");
        header5.innerText = "Url";
        header.appendChild(header1);
        header.appendChild(header2);
        header.appendChild(header3);
        header.appendChild(header4);
        header.appendChild(header5);
        table.appendChild(thead);

        console.log("JE SUIS ICI 2");
        //data for the table
        const tbody = document.createElement("tbody");
        const docss = JSON.parse(docs);
        docss.forEach((doc) => {
        //for(const doc of docs){
            console.log("DOC : ", doc);
            console.log("JE SUIS ICI 3");
            const line = document.createElement("tr");
            const titleCell = document.createElement("td");
            titleCell.innerText = doc.product_title;
            line.appendChild(titleCell);
            //HERE TODO SWITCH CELLE BY <IMG> TAG !!!!!!!!!!!!!!!!!!
            const imageCell = document.createElement("td");
            const image = document.createElement("img");
            image.src= doc.product_main_image_url;
            imageCell.appendChild(image);
            line.appendChild(imageCell);
            const priceCell = document.createElement("td");
            priceCell = doc.original_price;
            line.appendChild(priceCell);
            const ratingCell = document.createElement("td");
            ratingCell = doc.evaluate_rate;
            line.appendChild(ratingCell);
            const urlCell = document.createElement("td");
            const url = document.createElement("a");
            url.href= doc.product_detail_url;
            urlCell.appendChild(url);
            line.appendChild(urlCell);

        });
        table.appendChild(tbody);
        pageDiv.appendChild(tableWrapper);
    };



    async function searchProducts(term) {
        const response = await fetch("https://amazon24.p.rapidapi.com/api/product?categoryID=aps&keyword=" + term, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "amazon24.p.rapidapi.com",
            "x-rapidapi-key": RAPID_API_KEY
          }
        });
        const body = await response.json();
        console.log("BODY FROM SEARCH PRODUCT : "+body);
        return body;
      }

} 

export default ViewWishList;