function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
btnStop.disabled = true;
btnStart.addEventListener('click', () =>{
    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`
      }, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;

});

btnStop.addEventListener('click', () =>{
    if (timerId){
        clearInterval(timerId);
        btnStart.disabled = false;
        btnStop.disabled = true;
    }
});