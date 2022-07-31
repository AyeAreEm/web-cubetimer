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

        let uid = document.getElementById("uid").className;
        let data = {uid, time}

        fetch(`${window.location.pathname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
        });

        // location.reload();
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