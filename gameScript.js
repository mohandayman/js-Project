// variables
let data = location.search;

let level = data.slice(data.indexOf("=") + 1, data.indexOf("&"));

let user = data.slice(data.indexOf("=", 7) + 1, data.lenght);

let startGameButton = $("#massege > button");

let menuteObj = { value: 60 };

let score = 0;

let numberKilled = 0;

let bird = $("#gameArea > img");

let counterShow = $(
  `<li class="timerContainer"><div>time limit : </div><div id ='counter'> ${menuteObj.value}</div></li>`
);

let screenName = $(`<li class="header" > welcome :  ${user} </li>`);

let birdsKilled = $(
  `<li class="header" > Birds Killed &nbsp: &nbsp ${numberKilled}</li> `
);

let scoreElement = $(`<li class="header" > score :  ${score}</li> `);

$(function () {
  // on page load
  $("#massege > p").text(
    `hello ${user} you are in ${level} i hope you enjoy the game !!`
  );
  startGameButton.click(function () {
    $("#massege").remove();

    $("ul").prepend(counterShow);

    $("ul").prepend(screenName);

    $("ul").append(birdsKilled);

    $(screenName).after(scoreElement);
    let time = timer(menuteObj);
    $("ul").after(`<div id="gameArea" ></div>`);
    $("#gameArea").append(`<img src="./images/blackBird.gif" alt="">`);
    let bird = $("#gameArea > img");

    moveBird(bird);
    // while(menuteObj.value){
    // setInterval(() => {

    //   console.log(menuteObj.value)
    // }, 1000);
    // }
  });
});

const timer = (timeObj) => {
  // timer function
  let id = setInterval(() => {
    if (timeObj.value > 0) {
      timeObj.value--;
      $("#counter").text(` ${timeObj.value}`);
    } else {
      clearInterval(id);
    }
  }, 1000);
};
const moveBird = (imgObj) => {
  if (menuteObj.value) {
    let counter = -imgObj.width();
    let startHight =
      Math.random() * (window.innerHeight - imgObj.height() - 100) + 55;
    console.log(startHight);
    var id = setInterval(() => {
      if (imgObj.offset().left <= window.innerWidth + imgObj.width()) {
        imgObj.css({ left: `${counter}px`, top: `${startHight}px` });
        counter += 10;
        $("html, body").css({
          overflow: "hidden",
        });
      } else {
        imgObj.remove();
        var newBird = $(`<img src="./images/blackBird.gif" alt="">`).appendTo(
          "#gameArea"
        );
        moveBird(newBird);
      }
    }, 10);
  } else {
    clearInterval(id);
  }
};
const generateDinamicBird = function(){
  let rondomNumber = Math.random()
}
