var dogfactsbtn = document.querySelector('.dog-facts-btn');
var fact = document.querySelector('.fact');
var acc = document.getElementsByClassName("accordion");
var clearbtn = document.querySelector('.clear-btn');
var savebtn = document.querySelector('.save-btn');
var favdogfacts = document.getElementById('fav-dog-facts')
var randomfact;
var favfactsv = [];


function init() {
    var storedFavs = JSON.parse(localStorage.getItem("favs"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedFavs !== null) {
        favfactsv = storedFavs;
    }

    renderFacts();
}
dogfactsbtn.addEventListener('click', function () {
    fetch('https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/all')
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    var factarr = data.facts
                    console.log(data.facts);
                    var locrandomfact = factarr[Math.floor(Math.random() * factarr.length)];
                    fact.innerHTML = locrandomfact;
                    randomfact = locrandomfact

                })
            }
        })
});

savebtn.addEventListener('click', function () {
    console.log(randomfact)
    favfactsv.push(randomfact)
    storefavs();
    renderFacts();
});

function storefavs() {
    localStorage.setItem("favs", JSON.stringify(favfactsv))
};

function renderFacts() {
    favdogfacts.innerHTML = ""
    for (var i = 0; i < favfactsv.length; i++) {
        var li = document.createElement("li");
        li.textContent = favfactsv[i];
        favdogfacts.append(li)
    }
}

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
};

clearbtn.addEventListener('click', function () {
    favfactsv = []
    renderFacts();
    localStorage.removeItem("favs")

});

init();