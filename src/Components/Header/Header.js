import logo from "../../img/js-logo.png";
import music from "../../sound/Infecticide-11-Pizza-Spinoza.mp3";

const Header = () => {
  const stopStartSound = () => {
    const myAudioPlayer = document.querySelector("#audioPlayer");

    if (myAudioPlayer.paused) myAudioPlayer.play();
    else myAudioPlayer.pause();
  };

  const header = document.querySelector("header");

  // Create the audio and load the file via webpack file-loader
  const myPlayer = `
  <div class="text-center">
  <audio id="audioPlayer" controls>
        <source
          src="${music}"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      </div>`;

  header.innerHTML += myPlayer;

  header.addEventListener("click", stopStartSound);

};

export default Header;