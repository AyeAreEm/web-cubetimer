function dd() {
    document.getElementById("dd-content").classList.toggle("show");
}

let start;
let pressed = false;
const displayTime = document.getElementById("time");

window.addEventListener("keyup", e => {
    if (e.key == " " && !pressed) {
        displayTime.style.color = "green";
        start = Date.now()
        pressed = true;
    }

    else if (e.key == " " && pressed) {
        const end = Date.now();
        const time = Math.round((((end - start) / 1000 ) + Number.EPSILON) * 100) / 100;

        pressed = false;
        displayTime.style.color = "white";
        displayTime.textContent = time;

        const scramble = document.getElementById("scramble");
        const scrambleImg = document.getElementById("scrambleImg");
        const prevScram = document.getElementById('prevScram');
        let numSolve;

        if (prevScram.firstElementChild == null) {
            numSolve = 1;
        } else if (prevScram.firstElementChild.id) {
            numSolve = parseInt(prevScram.firstElementChild.id) + 1;
        }

        const data = {scramble: scramble.textContent, time, numSolve}

        const div = document.createElement("div")
        div.className = "previous"
        div.id = numSolve;

        const numberP = document.createElement("p")
        numberP.textContent = numSolve;
        numberP.className = "number";
        div.appendChild(numberP)

        const timeP = document.createElement("p");
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