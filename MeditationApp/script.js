const buttons = Array.from(document.querySelectorAll(".time-intervals"));
const time_minutes = document.getElementById("min");
var minutes = time_minutes.textContent;
if (time_minutes.textContent === "00") {
    minutes = 0;
}
const time_seconds = document.getElementById("sec");
var seconds = 9;  //display time -1 in order to display play button as soon as timer display hits 0.
var seconds_passed = 0;
var total_seconds = 10;
const play_pause = document.getElementById("start-pause-btn");
const reset_btn = document.getElementById("reset-btn");

const circle = document.getElementById("c1");
const radius = circle.r.baseVal.value;
const circumferance = 2*Math.PI*radius;
var offset;

const body = document.querySelector("body");
var bgPic = "rain";

const vid = document.getElementById("vid_source");
const vid_container = document.querySelector("video");


//change the timer according to the time being selected
buttons.forEach(button => {
    button.addEventListener('click', () => {
        offset = circumferance;
        circle.style.strokeDashoffset = offset;
        if (button.id==="2min") {
            time_minutes.textContent = "02";
            time_seconds.textContent = "00";
            minutes = 2;
            seconds = 0;
            seconds_passed = 1;
            total_seconds = 120;
        }
        else if (button.id==="5min") {
            time_minutes.textContent = "05";
            time_seconds.textContent = "00";
            minutes = 5;
            seconds = 0;
            seconds_passed = 1;
            total_seconds = 300;
        }
        else if (button.id==="10min") {
            time_minutes.textContent = "10";
            time_seconds.textContent = "00";
            minutes= 10;
            seconds = 0;
            seconds_passed = 1;
            total_seconds = 600;
        }
    })
});
var interval;  //used to control the setInterval
var I;
var s;
var start_flag = true;  //used to quickly start updating time from "min:00" position instead of waiting for an extra second
var pause_flag = true; //used to keep track of pause and play
play_pause.addEventListener("click", () => {
    if (minutes>0 || seconds>0) {  //only allow clicking if there is time left
        if (play_pause.src==="http://127.0.0.1:5500/svg/play.svg") {
            pause_flag = false;
            //Add the sound and video when you click on play
            if (bgPic === "rain") {
                const sound = `<audio autoplay loop>
                <source src="sounds/rain.mp3" type="audio/mp3">
                </audio>`;
                
                vid.src = "video/rain.mp4";
                vid_container.play();

                body.insertAdjacentHTML('beforeend', sound);
            }
            else if (bgPic === "beach") {
                const sound = `<audio autoplay loop>
                <source src="sounds/beach.mp3" type="audio/mp3">
                </audio>`;
                
                vid.src = "video/beach.mp4";
                vid_container.play();

                body.insertAdjacentHTML('beforeend', sound);
            }

            //display and style the pause button
            play_pause.src = "svg/pause.svg";
            play_pause.style.left = "0px";

            //start the time
            if (start_flag && minutes>0) {  //used to directly start countdown instead of waiting an extra second
                minutes-=1;
                seconds = 58;
                time_minutes.textContent = `0${minutes}`;
                time_seconds.textContent = `${seconds+1}`;
                start_flag = false;
            }

            I = setInterval(() => {
                //calculate the stroke distance that should be revealed
                offset = circumferance - ((circumferance * seconds_passed)/total_seconds);
                circle.style.strokeDashoffset = offset;
                seconds_passed +=0.1;

                if (seconds_passed>=total_seconds) {
                    clearInterval(I);
                }
                
            }, 100);

            var flag = false; //used to give "min":00 a second to display before subtracting minute time

            //every one second, update the time
            interval = setInterval(() => {
                if (seconds > 0) {
                    flag = false;
                    seconds -=1;
                    if (seconds<9){
                        time_seconds.textContent = `0${seconds+1}`;
                    }
                    else {
                        time_seconds.textContent = `${seconds+1}`;
                    }
                }

                //if seconds = 0
                else{
                    //flag=false is used to give "min":00 a second to display before subtracting minute time
                    if (minutes>0 && flag === true) {
                        minutes-=1;
                        seconds = 58;
                        time_minutes.textContent = `0${minutes}`
                        time_seconds.textContent = `${seconds+1}`;
                    }

                    else if (minutes>0) {
                        flag = true;
                        if (minutes<10) {
                            time_minutes.textContent = `0${minutes}`;
                        }
                        else {
                            time_minutes.textContent = `${minutes}`;
                        }
                        time_seconds.textContent = "00";

                    }
                    // if minutes = 0  (=> time is all up)
                    else {
                        //this allows the pause sign to become play without having to wait another second for it to happen (it is already satisfied since seconds=0)
                        seconds -=1;
                        time_seconds.textContent = `0${seconds+1}`;
                        clearInterval(interval);
                        play_pause.src = "svg/play.svg";
                        play_pause.style.left = "10px";

                        //remove audio and pause video
                        if (document.querySelector("audio")) {
                            s = document.querySelector("audio");
                            s.remove();
                        }
                        
                        vid_container.pause();
                        pause_flag = true;
                    }
                }
            }, 1000);
        }
        
        //if player paused
        else if (play_pause.src==="http://127.0.0.1:5500/svg/pause.svg") {
            pause_flag = true;
            play_pause.src = "svg/play.svg";
            play_pause.style.left = "10px";
            
            //stop the time
            clearInterval(interval)
            clearInterval(I);

            //remove the audio and video
            vid_container.pause();
            s = document.querySelector("audio");
            s.remove();
        }
    }
});

reset_btn.addEventListener("click", () =>{
    pause_flag = true;

    //remove the audio and video
    if (document.querySelector("audio")) {
        s = document.querySelector("audio");
        s.remove();
    }
    vid_container.pause();
    
    //reset the circle
    offset = circumferance;
    circle.style.strokeDashoffset = circumferance;
    clearInterval(I);

    //reset the time
    time_minutes.textContent = "00";
    time_seconds.textContent = "00";
    minutes = 0;
    seconds = 0;

    //change the sign back to play if it was pause
    if (play_pause.src==="http://127.0.0.1:5500/svg/pause.svg") {
        play_pause.src = "svg/play.svg";
        play_pause.style.left = "10px";
    }
})


const weatherIcons = Array.from(document.querySelectorAll(".icons"));
weatherIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        
        if (icon.id==="rain-pic" && pause_flag) {
            vid.src = "video/rain.mp4";
            vid_container.load();
            bgPic = "rain";
        }
        else if (icon.id === "sun-pic" && pause_flag) {
            vid.src = "video/beach.mp4";
            vid_container.load();
            console.log(vid);
            bgPic = "beach";
        }
    })
})
