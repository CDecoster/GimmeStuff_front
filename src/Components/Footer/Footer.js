import logo from "../../img/js-logo.png";

const Footer = () => {
  const footerDiv = document.querySelector("footer");

  // Create the audio and load the file via webpack file-loader
  const footer = `<h1>But we also love JS</h1>`;
  footerDiv.innerHTML = footer;

  // the Webpack file-loader recognise /src/img/js-logo.png as local file and replace
  //"./image/js-logo.png" with the final path to the image in the output directory (/dist)
  const footerPhoto = new Image();
  footerPhoto.src = logo;
  footerPhoto.src = logo;
  footerPhoto.height = 50;

  footerDiv.appendChild(footerPhoto);
};

export default Footer;