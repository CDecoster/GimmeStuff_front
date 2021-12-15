const Footer = () => {
    const myfooter = document.querySelector("#footer");
    let footer;

    footer =`<div class="container">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
      </ul>
      <p class="text-center text-muted">© 2021 GimmeStuff Group 18</p>
    </footer>
  </div>`;
  myfooter.innerHTML = footer;
};

export default Footer;