var carousel = document.getElementById("images");
var data;

async function getApi() {
    const res = await fetch("https://rickandmortyapi.com/api/character")
    data = await res.json();
    show()
}
var slideCount = 1;

let no_of_cards
function show() {
    screen_resize();
    let articles = data.results;
    let card = "";
    slideCount = 1;
    carousel.innerHTML = ""
    articles.forEach(function (elements, index) {
        if (index == 0 || index % no_of_cards == 0) {
            card += `<div class = "slide" id=slide-${slideCount}>`
        }
        card += `
        <div class="card">
            <img class="card-image" src= ${elements["image"]} alt="Card image cap">
                <div class="card-body">
                    <p class="card-title">Name: ${ elements["name"]}</p>
                    <p class="card-text">
                    Species: ${ elements["species"] } 
                    <br>
                    Status: ${ elements["status"] } 
                    </p>

                </div>
        </div>`
        if ((index + 1) % no_of_cards == 0 && index != -1) {
            card += `</div>`
            slideCount++;
        }
    });
    carousel.innerHTML += card;
    document.getElementById("slide-1").classList.add("active")
}

function myFunc() {
    getApi();
}
var idx = 1;

function nextSlide() {
    idx++
    if (idx > slideCount-1) {
        document.getElementById(`slide-${idx-1}`).classList.remove("active")
        idx = 1
    }
    document.getElementById(`slide-${idx}`).classList.add("active")
    if (idx != 1) {
        document.getElementById(`slide-${idx-1}`).classList.remove("active")
    }

}
function screen_resize(){
    var width = innerWidth
    if(width<539){
        no_of_cards = 1
    }
    else if(width<992){
        no_of_cards = 2
    }
    else{
        no_of_cards = 3
    }
}
window.addEventListener("resize",show)

function prevSlide() {
    idx--;

    if (idx <= 0) {
        document.getElementById(`slide-${1}`).classList.remove("active")
        idx = slideCount-1
    }
    document.getElementById(`slide-${idx}`).classList.add("active")

    if (idx < slideCount-1)
        document.getElementById(`slide-${idx+1}`).classList.remove("active")
}
document.getElementById("next").addEventListener("click", nextSlide)
document.getElementById("prev").addEventListener("click", prevSlide)
