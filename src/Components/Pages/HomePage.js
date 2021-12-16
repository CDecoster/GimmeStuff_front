/**
 * Render a view of the pizzas into the #page div (formerly pizzaView function )
 */

 const HomePage = async () => {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";


try {
  // hide data to inform if the wishlist menu is already printed
  const response = await fetch("/api/whishlists"); // fetch return a promise => we wait for the response

  if (!response.ok) {
    // status code was not 200, error status code
    throw new Error(
      "fetch error : " + response.status + " : " + response.statusText
    );
  }
  const wishlists = await response.json(); // json() returns a promise => we wait for the data
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
  const header2 = document.createElement("th");
  header2.innerText = "Createur wishlist";
  const header3 = document.createElement("th");
  header3.innerText = "Description";
  header.appendChild(header1);
  header.appendChild(header2);
  header.appendChild(header3);
  table.appendChild(thead);
  // deal with data rows for tbody
  const tbody = document.createElement("tbody");
  wishlists.forEach((wishlist) => {
    const line = document.createElement("tr");
    const titleCell = document.createElement("td");
    titleCell.innerText = wishlist.title;
    line.appendChild(titleCell);
    const utilisateurCell = document.createElement("td");
    utilisateurCell.innerText = wishlist.utilisateur;
    line.appendChild(utilisateurCell);
    const descriptionCell = document.createElement("td");
    descriptionCell.innerText = wishlist.content;
    line.appendChild(descriptionCell);
    // hide info within each row, the wishlist id
    line.dataset.wishlistId = wishlist.id;
    tbody.appendChild(line);
  });
  table.appendChild(tbody);
  // add the HTMLTableElement to the main, within the #page div
  pageDiv.appendChild(tableWrapper);
} catch (error) {
  console.error("wishlistView::error: ", error);
}
};

export default HomePage;