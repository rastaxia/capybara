const themeMusic = new Audio('../sounds/theme.mp3');
const voiceActing = document.querySelector("#checker");
const volume = document.querySelector("#volume");

document.querySelector('.launchBtn').addEventListener('click', function() {
    this.style.display = 'none';
    themeMusic.play();
    themeMusic.loop = true;
    document.querySelector('.menu').style.display = 'block';
});

document.querySelector('.start').addEventListener('click', function() {});

document.querySelector('.options').addEventListener('click', function() {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.optionsScreen').style.display = 'block';
    volume.addEventListener('change', function(e) {
        themeMusic.volume = e.currentTarget.value / 100;
        document.querySelector('#volumeValue').innerHTML = e.currentTarget.value + '%'; 
    });
    voiceActing.addEventListener('change', function(e) {
        if (e.currentTarget.checked) {
          const voice =  new Audio('../sounds/voiceActing.mp3');
            voice.play();
            themeMusic.pause();
            voice.onended = function() {
                themeMusic.play();
                document.querySelector('.voiceOption').style.display = 'none';
            }
        } else {
            console.log('unchecked');
        }
    });
});

document.querySelector('.quit').addEventListener('click', function() {});