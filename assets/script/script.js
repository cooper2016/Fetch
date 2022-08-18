var dogfactsbtn = document.querySelector('.dog-facts-btn');
var fact = document.querySelector('.fact');
var acc = document.getElementsByClassName("accordion");
var clearbtn = document.querySelector('.clear-btn');

dogfactsbtn.addEventListener('click', function () {
    fetch('https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/all')
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                var factarr = data.facts
                console.log(data.facts);
                var randomfact = factarr[Math.floor(Math.random() * factarr.length)];
                fact.innerHTML = randomfact;  
            })
        }
    })
});

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

clearbtn.addEventListener('click', function(){
    fact.innerHTML = ""
})
