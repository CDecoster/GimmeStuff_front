// load an analog clock
import { AnalogClock } from "customizable-analog-clock";
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
  // add a wrapper for the clock
  const clockWrapper = `  <br><br><div 
id="my-clock"                          
style="width: 200px; height: 200px;"  
class="mx-auto"                       
</div>`;

  header.innerHTML += myPlayer + clockWrapper;

  header.addEventListener("click", stopStartSound);

  // create and attach the clock to the wrapper (#my-clock)
  const clock = new AnalogClock({
    htmlElement: "my-clock",
    showIndicators: true,
  });
};

export default Header;