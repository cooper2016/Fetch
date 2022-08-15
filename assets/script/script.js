var dogfactsbtn = document.querySelector('.dog-facts-btn')
var fact = document.querySelector('.fact')

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
