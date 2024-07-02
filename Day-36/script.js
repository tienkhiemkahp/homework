let countEl = document.querySelector(".count");
let getLinkBtn = document.querySelector(".get-link-btn");
let count = 30;
let time = 0;

var handleCountdown = (currentTime) => {
    console.log(count);
    if (currentTime > time + 1000 && count > 0) {
        time = currentTime;
        count--;
        countEl.innerHTML = `${count}`;
        
        if (count === 0) {
            getLinkBtn.addEventListener("click", function () {
                window.location.href = 'https://www.youtube.com/';
            });
        }
    }
    requestAnimationFrame(handleCountdown);
};

requestAnimationFrame(handleCountdown);



