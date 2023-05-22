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

var playerName = "";
document.querySelector(".nameBtn").addEventListener("click", function () {
  if (document.querySelector("#name").value == "") {
    alert("Please enter a name!");
  } else {
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
var classChoice = "";
var level = 1;
document.querySelectorAll(".classes").forEach((item) => {
  item.addEventListener("click", function () {
    classChoice = item.id;
    if (confirm("are you sure you want to be a " + classChoice + "?")) {
      document.querySelector(".classSelect").style.display = "none";
      document.querySelector(".afterClass").style.display = "block";
    }
  });
});

document.querySelector(".caveAmbush").addEventListener("click", function () {
  document.querySelector(".afterClass").style.display = "none";
  document.querySelector(".playerChoice").style.display = "flex";
});

const first = document.createElement("button");
first.innerHTML = "Fight";
first.addEventListener("click", function () {
  combat();
  document.querySelector(".playerChoice").style.display = "none";
  document.querySelector(".combat").style.display = "grid";
});
const second = document.createElement("button");
second.innerHTML = "Run";
second.addEventListener("click", function () {
  alert("You're in a cave, where are you going to run to?");
});
const third = document.createElement("button");
third.innerHTML = "Look at Amanda";
third.addEventListener("click", function () {
  alert("Amanda looks back at you, she's not happy");
});
document.querySelector(".playerChoice").appendChild(first);
document.querySelector(".playerChoice").appendChild(second);
document.querySelector(".playerChoice").appendChild(third);

///////////////////////////////////
/////////////////////
// combat
/////////////////////
///////////////////////////////////
function combat() {
  const enemyImg = document.querySelector("#enemy");
  const enemyHp = document.querySelector("#enemyHealth");
  const enemyName = document.querySelector("#enemyName");
  const playerHp = document.querySelector("#playerHealth");

  var hp = null;

  const spellList = [];

  switch (level) {
    case 1:
      hp = 100;
      // level one combat
      // Enemy
      fetch("../json/monsters.json")
        .then((response) => response.json())
        .then((monster) => {
          random = Math.floor(Math.random() * monster.levelOne.length);
          enemyImg.src = monster.levelOne[random].img;
          enemyHp.innerHTML = monster.levelOne[random].hp;
          enemyName.innerHTML = monster.levelOne[random].name;
        });
      // Player
      fetch("../json/" + classChoice + ".json")
        .then((response) => response.json())
        .then((player) => {
          player.levelOne.forEach((item) => {
            spellList.push(item);
            // TO DO - add spell usage
            var usage = item.usage;
            var remainingUsage = usage;
          });
        });
      break;
    case 2:
      hp = 150;
      // level two combat
      // Enemy
      fetch("../json/monsters.json")
        .then((response) => response.json())
        .then((data) => {
          random = Math.floor(Math.random() * data.levelTwo.length);
          enemyImg.src = data.levelTwo[random].img;
          enemyHp.innerHTML = data.levelTwo[random].hp;
          enemyName.innerHTML = data.levelTwo[random].name;
        });
      // Player
      fetch("../json/" + classChoice + ".json")
        .then((response) => response.json())
        .then((player) => {
          player.levelTwo.forEach((item) => {
            spellList.push(item);
          });
        });
      break;
    case 3:
      hp = 200;
      // level three combat
      // Enemy
      fetch("../json/monsters.json")
        .then((response) => response.json())
        .then((data) => {
          random = Math.floor(Math.random() * data.levelThree.length);
          enemyImg.src = data.levelThree[random].img;
          enemyHp.innerHTML = data.levelThree[random].hp;
          enemyName.innerHTML = data.levelThree[random].name;
        });
      // Player
      fetch("../json/" + classChoice + ".json")
        .then((response) => response.json())
        .then((player) => {
          player.levelThree.forEach((item) => {
            spellList.push(item);
          });
        });
  }
  var remainingHp = hp;
  playerHp.innerHTML = remainingHp;

  //attack
  const combatOptions = document.querySelector(".combatOptions");
  // Get the button element
  const attackBtn = document.querySelector("#attack");

  // Add click event listener to the button
  attackBtn.addEventListener("click", function () {
    // Create the overlay element
    const attackOverlay = document.createElement("div");
    attackOverlay.classList.add("attackOverlay");

    // Set overlay content
    spellList.forEach((element) => {});

    // Position the overlay above the clicked button
    const buttonRect = attackBtn.getBoundingClientRect();
    attackOverlay.style.top = buttonRect.bottom - 265 + "px";
    attackOverlay.style.left = buttonRect.left + "px";

    // Add click event listener to the close button
    const closeButton = attackOverlay.querySelector("#closeButton");
    closeButton.addEventListener("click", function () {
      // Remove the overlay
      attackOverlay.remove();
    });
  });
}

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

document.querySelector(".save").addEventListener("click", function () {
  document.querySelector(".optionsScreen").style.display = "none";
  document.querySelector(".menu").style.display = "block";
  alert("Options saved");
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
