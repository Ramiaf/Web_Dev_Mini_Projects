const image = document.querySelector("img");
const feedbackContainer = document.getElementById("feedbackContainer");
const feedbackText = document.getElementById("text");

document.getElementById("Pop-Quiz").addEventListener("submit",(event)=>{
    event.preventDefault();  //prevents reload of window
    const data = new FormData(event.target);
    ans_q1 = data.get("SwedCap");
    ans_q2 = data.get("LebCap");
    ans_q3 = data.get("USACap");

    var count = 0;
    if (ans_q1 === "Stockholm") {
        count++;
    }
    if (ans_q2 === "Beirut") {
        count++;
    }
    if (ans_q3 === "Washington D.C") {
        count++;
    }

    if (count === 0) {
        feedbackContainer.style.display="block";
        feedbackText.textContent = "You got 0 correct.\nYou really need to do better";
        image.src = "images/lose.gif";
    }
    
    if (count === 1 || count===2) {
        feedbackContainer.style.display="block";
        feedbackText.textContent = `You got ${count} correct.\nThat's just okay`;
        image.src = "images/meh.jpeg";
    }

    if (count===3) {
        feedbackContainer.style.display="block";
        feedbackText.textContent = `You got 3 correct.\nGreat job!`;
        image.src = "images/win.gif";
    }
})