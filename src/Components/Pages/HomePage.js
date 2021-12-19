import { getSessionObject, setSessionObject } from "../../utils/session";
import { Redirect } from "../Router/Router";
import modifyIcon from "../../img/icon_modify.png";
import inspectIcon from "../../img/icon_inspect.png";
import countDown from "../../utils/countDown";

/**
 * Render a view of the pizzas into the #page div (formerly pizzaView function )
 */

const HomePage = async () => {
  let user = getSessionObject("user");


  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  if (!user) {

    /*TO DO html for homepage when not connected*/
  
    pageDiv.innerHTML = `<div id="boxes">
    <div class="box red"><div id="letter">W</div></div>
    <div class="box blue"><div id="letter">I</div></div>
    <div class="box green"><div id="letter">S</div></div>
    <div class="box cyan"><div id="letter">H</div></div>
  
    </div>`;

    anime ({
      targets: 'div.box',
      translateY: [
          {value: 200, duration: 500},
          {value:0, duration: 800}  
      ],
      rotate: {
      value: '1turn',
      },
      borderRadius: 50,
      direction: 'alternate',
      easing: 'easeInOutQuad',
      delay: function() { return anime.random(0, 1000); },
      autoplay: true,
      loop: true,
      elasticity: 200 
     
  }); 
  playPause.play();

  }
  else {



    try {
      // hide data to inform if the wishlist menu is already printed


      const response1 = await fetch(`/api/wishlists/user=${user.id}`); // fetch return a promise => we wait for the response

      if (!response1.ok) {
        // status code was not 200, error status code
        throw new Error(
          "fetch error : " + response1.status + " : " + response1.statusText
        );
      }
      const wishlists = await response1.json(); // json() returns a promise => we wait for the data


      try{
        const response2 = await fetch(`/api/users/${user.id}`); // fetch return a promise => we wait for the response

        if (!response2.ok) {
          // status code was not 200, error status code
          throw new Error(
            "fetch error : " + response2.status + " : " + response2.statusText
          );
        }
        const userInfos = await response2.json(); // json() returns a promise => we wait for the data
        ;
        const countDownText = document.createElement("div");
        countDownText.id ="countDownText";
        countDownText.innerText = countDown(userInfos.birthday, "birthday", countDownText.id);
        
        pageDiv.appendChild(countDownText);

      }
      catch{
        
      }
      
      

      if (wishlists.length == 0) {


        /*A insérer du html ,ex : "vous n'avez pas de wishlist déjà créées, veuillez en créer une "*/
        Redirect("/wishlists/add");

      }
      else {
        /*colonne contenu et utilisateur ne sont plus nécessaires*/


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
        const header4 = document.createElement("th");
        header4.innerText = "Partager"
        const header6 = document.createElement("th");
        header6.innerText = "Modifier";

        header.appendChild(header1);        
        header.appendChild(header3);        
        header.appendChild(header5);
        header.appendChild(header4);
        header.appendChild(header6);
        table.appendChild(thead);
        // deal with data rows for tbody
        const tbody = document.createElement("tbody");
        wishlists.forEach((wishlist) => {
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
          const idTimeLeftCell = wishlist.id+wishlists.length;
          timeLeftCell.id = idTimeLeftCell;
          timeLeftCell.innerText = countDown(wishlist.end, "wishlist", idTimeLeftCell);
          
          line.appendChild(timeLeftCell);

          const sharedCell = document.createElement("td");
          const url3 = document.createElement("button");
          url3.style.background = "none";
          url3.style.border = "none";
          url3.id = wishlist.id + wishlists.length * 2;
          url3.innerText = "Partager wishList";
          sharedCell.appendChild(url3);
          line.appendChild(sharedCell);
          
          
          const imageCell = document.createElement("td");
          const url2 = document.createElement("a");
          url2.href = "/wishlists/edit";
          const image2 = document.createElement("img");
          image2.src = modifyIcon;
          url2.appendChild(image2);
          imageCell.appendChild(url2);
          line.appendChild(imageCell);

         
          tbody.appendChild(line);

          function onClickHandlerForInspectIcon() {

            
            setSessionObject("wishlistInspected", wishlist.id);
          }
          image.addEventListener("click", onClickHandlerForInspectIcon);
          

          function onClickHandlerForModifyIcon() {

            
            setSessionObject("wishlistModified", wishlist.id);
          }
          image2.addEventListener("click", onClickHandlerForModifyIcon);
          
          
          function onClickHandlerForSharing() {

            
            setSessionObject("wishlistShared", wishlist.id);

            Redirect("/wishlists/share");
          }
          url3.addEventListener("click", onClickHandlerForSharing);


        });
        table.appendChild(tbody);
        // add the HTMLTableElement to the main, within the #page div
        pageDiv.appendChild(tableWrapper);
      }

    } catch (error) {
      
    }
  };
}



export default HomePage;