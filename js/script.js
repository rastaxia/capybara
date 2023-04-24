const themeMusic = new Audio("../sounds/theme.mp3");
const voiceActing = document.querySelector("#checker");
const volume = document.querySelector("#volume");

// launch button
document.querySelector(".launchBtn").addEventListener("click", function () {
  this.style.display = "none";
  themeMusic.play();
  themeMusic.loop = true;
  document.querySelector(".menu").style.display = "block";
});

///////////////////////////////////
/////////////////////
// start game
/////////////////////
///////////////////////////////////
document.querySelector(".start").addEventListener("click", function () {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".intro").style.display = "block";
});

var playerName = ''; 
document.querySelector(".nameBtn").addEventListener("click", function () {
  if (document.querySelector("#name").value == '') {
    alert("Please enter a name!");
  }else{
    playerName = document.querySelector("#name").value;
    document.querySelector("#playerName").innerHTML = playerName;
    document.querySelector(".intro").style.display = "none";
    document.querySelector(".intro2").style.display = "block";
  }
});

document.querySelector("#chooseClass").addEventListener("click", function () {
  document.querySelector(".intro2").style.display = "none";
  document.querySelector(".classSelect").style.display = "block";
});

document.querySelector("#noClass").addEventListener("click", function () {
  document.querySelector(".intro2").style.display = "none";
  document.querySelector(".declineOffer").style.display = "block";
});

document.querySelector("#death").addEventListener("click", function () {
  document.querySelector(".declineOffer").style.display = "none";
  document.querySelector(".amandaDeath").style.display = "block";
});

// classes 
var classChoice = '';
var level = 1;
document.querySelectorAll(".classes").forEach((item) => {
  item.addEventListener("click", function () {
    classChoice = item.id;
    if(confirm("are you sure you want to be a " + classChoice + "?")){
      document.querySelector(".classSelect").style.display = "none";
      document.querySelector(".afterClass").style.display = "block";
    }
  });
});

///////////////////////////////////
/////////////////////
// combat
/////////////////////
///////////////////////////////////
fetch("../json/monsters.json")
  .then((response) => response.json())
  .then((data) => {
    random = Math.floor(Math.random() * data.levelOne.length);
    console.log(data.levelOne[random]);

  });

///////////////////////////////////
/////////////////////
// options menus
/////////////////////
///////////////////////////////////
document.querySelector(".options").addEventListener("click", function () {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".optionsScreen").style.display = "block";
  // volume slider
  volume.addEventListener("change", function (e) {
    themeMusic.volume = e.currentTarget.value / 100;
    document.querySelector("#volumeValue").innerHTML =
      e.currentTarget.value + "%";
  });
  // voice acting
  voiceActing.addEventListener("change", function (e) {
    if (e.currentTarget.checked) {
      const voice = new Audio("../sounds/voiceActing.mp3");
      voice.play();
      themeMusic.pause();
      voice.onended = function () {
        themeMusic.play();
        document.querySelector(".voiceOption").style.display = "none";
      };
    }
  });
});

// back to menu
document.querySelector(".back").addEventListener("click", function () {
  document.querySelector(".optionsScreen").style.display = "none";
  document.querySelector(".menu").style.display = "block";
});

///////////////////////////////////
/////////////////////
// quit game
/////////////////////
///////////////////////////////////
document.querySelector(".quit").addEventListener("click", function () {
  if (confirm("Are you sure you want to quit?")) {
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".giphy-embed").style.display = "block";
  }
});

