var hostbutton = document.querySelector(".hostbutton");
var guestbutton = document.querySelector(".guestbutton");
var situationDiv = document.querySelector(".questions-3");
var moodsDiv = document.querySelector(".questions-4");
var colors = ['#D7FF66', '#FFE766', '#FF9D66', '#FF6666', '#DD5DF1'];
var situationsText = ['first', 'sencond', 'sssss', 'fdfds', 'sdfdfsd', 'sdfdsfds'];
var moodsText = ['sdsd', 'sdsds', 'sds', 'sdsd', 'sdsds'];

for(i = 0; i < 6; i++) {
    var situations = document.createElement('div');
    situations.classList.add('situations');
    situationDiv.appendChild(situations);
    situations.style.borderRadius = "8px";
    situations.style.fontFamily = "'Roboto', sans-serif";
    situations.style.fontWeight = "400";
    situations.style.fontSize = "15px";
    situations.innerHTML = '<span class="text">' + situationsText[i] + '</span>';
}


for(i = 0; i < 5; i++) {
    var moods = document.createElement('div');
    moods.classList.add('moods');
    moodsDiv.appendChild(moods);
    moods.style.backgroundColor = colors[i];
    moods.style.borderRadius = "8px";
    moods.style.fontFamily = "'Roboto', sans-serif";
    moods.style.fontWeight = "400";
    moods.style.fontSize = "15px";
    moods.innerHTML = '<span class="text">' + moodsText[i] + '</span>';
}

function openGuestWindow(){
    window.open('guestchatroom.html','_self', false);
}

guestbutton.addEventListener("click", openGuestWindow);


function openHostWindow(){
    window.open('hostchatroom.html','_self', false);
}

hostbutton.addEventListener("click", openHostWindow);
