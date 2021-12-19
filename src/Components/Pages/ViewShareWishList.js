import { getSessionObject,setSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";
import countDown from "../../utils/countDown";
import modifyIcon from "../../img/icon_modify.png";
import inspectIcon from "../../img/icon_inspect.png";

const ViewShareWishList = async () => {
    //blank the page
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML= "";
    //get user from localStorage
    let user = getSessionObject("user");
    //get user to get all id of shared wishlist
    const response = await fetch(`/api/users/${user.id}`);
    const userConnected = await response.json();
    const shareWishlists = userConnected.sharedWishList;
    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    // create an HTMLTableElement dynamically, based on the wishlists data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table table-danger";
    tableWrapper.appendChild(table);
    // deal with header
    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");
    header1.innerText = "Wishlist";
    const header3 = document.createElement("th");
    header3.innerText = "Description";
    const header5 = document.createElement("th");
    header5.innerText = "Temps restant";

    header.appendChild(header1);
    header.appendChild(header3);
    header.appendChild(header5);
    table.appendChild(thead);

    // deal with data rows for tbody
    const tbody = document.createElement("tbody");

    const strList = shareWishlists;
    if(strList===''){

    }else{
        const idStr = strList.split(",");
        for(let i =0;i<idStr.length;i++){
            getWishListDetailsFromId(idStr[i]);
        }
    }
    
    table.appendChild(tbody);
    pageDiv.appendChild(tableWrapper);

        /**
   * construct a line into our table 
   * @param {object} wishlist - details from the wishlist to show
   * 
   */
    function constructTableLine(wishlist){
        const line = document.createElement("tr");
          const titleCell = document.createElement("td");
          titleCell.innerText = wishlist.title;
          const url = document.createElement("a");
          url.href = "/wishlists/id";
          const image = document.createElement("img");
          image.src = inspectIcon;
          image.style.width = "30px";
          image.style.height = "30px";
          image.style.padding = "5px";
          url.appendChild(image);
          titleCell.appendChild(url);
          line.appendChild(titleCell);


          const descriptionCell = document.createElement("td");
          descriptionCell.innerText = wishlist.description;
          line.appendChild(descriptionCell);


          const timeLeftCell = document.createElement("td");
          const idTimeLeftCell = wishlist.id ;
          timeLeftCell.id = idTimeLeftCell;
          timeLeftCell.innerText = countDown(wishlist.end, "wishlist", idTimeLeftCell);
          line.appendChild(timeLeftCell);

         
          tbody.appendChild(line);

        function onClickHandlerForInspectIcon() {

            console.log("onClickHandlerForInspectIcon::click" + " wishlist id : " + wishlist.id);
            setSessionObject("wishlistInspected", wishlist.id);
          }
          image.addEventListener("click", onClickHandlerForInspectIcon);
    };
    
    /**
   * go to the api get the wishlist details
   * @param {object} id - id from the wishlist to displau
   * 
   */
    async function getWishListDetailsFromId (id){
        const response2 = await fetch(`/api/wishlists/${id}`);
        const wishlist = await response2.json();
        constructTableLine(wishlist);
    }

    


}

export default ViewShareWishList;