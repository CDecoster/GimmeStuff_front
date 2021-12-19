function countDown(dateString, usage, element) {


    console.log("date string : " + dateString);
    console.log("usage : " + usage);
    var countDownDate = new Date(dateString).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;


        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        if (usage === "birthday") {
            document.getElementById(element).innerHTML = "Il reste " + days + " jours " + hours + " heures "
                + minutes + " minutes " + seconds + " secondes avant votre anniversaire !";

            if (distance < 0) {
                clearInterval(x);
                document.getElementById(element).innerHTML = "Joyeux anniversaire !!!";
            }
        }
        if (usage === "wishlist") {
            document.getElementById(element).innerHTML = "Il reste " + days + " jours " + hours + " heures "
                + minutes + " minutes " + seconds + " secondes avant la fin du temps definit pour votre wishlist !";

            // If the count down is finished, write some text

            if (distance < 0) {
                clearInterval(x);
                document.getElementById(element).innerHTML = "La wishlist est arrivée à la fin du temps imparti";
            }
        }



    }, 1000);
}

export default countDown;

