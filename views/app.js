function dd() {
    document.getElementById("dd-content").classList.toggle("show");
}

let start;
let pressed = false;
let displayTime = document.getElementById("time");

window.addEventListener("keyup", e => {
    if (e.key == " " && !pressed) {
        displayTime.style.color = "green";
        start = Date.now()
        pressed = true;
    }

    else if (e.key == " " && pressed) {
        let end = Date.now();
        let time = (end - start) / 1000;
        pressed = false;
        displayTime.style.color = "white";
        displayTime.textContent = time;

        let scramble = document.getElementById("scramble");
        let scrambleImg = document.getElementById("scrambleImg");
        let prevScram = document.getElementById('prevScram');
        let numSolve = parseInt(prevScram.firstElementChild.id) + 1;
        let data = {scramble: scramble.textContent, time, numSolve}

        let div = document.createElement("div")
        div.className = "previous"
        div.id = numSolve;

        let numberP = document.createElement("p")
        numberP.textContent = numSolve;
        numberP.className = "number";
        div.appendChild(numberP)

        let timeP = document.createElement("p");
        timeP.textContent = time;
        div.appendChild(timeP)

        prevScram.insertBefore(div, prevScram.firstElementChild);

        fetch(`${window.location.pathname}`, {
            method: "post",
            headers: {
                "Accept": "application/json, text/plan, */*",
                'Content-Type': "application/json"    
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(result => {
                scramble.textContent = result.scramble;
                scrambleImg.src = result.scrambleImg;
            })
        })
    }
})

window.addEventListener("keydown", e => {
    if (e.key === "Escape" && pressed) {
        displayTime.style.color = "white";
        displayTime.textContent = "0.00";
        pressed = false;
    }

    else if (e.key == " ") {
        displayTime.style.color = "#821D35";
    }
})