// variables
let data = location.search;

let level = data.slice(data.indexOf("=") + 1, data.indexOf("&"));

let user = data.slice(data.indexOf("=", 7) + 1, data.lenght);

let startGameButton = $("#massege > button");

let menuteObj = { value: 60 };

let score = 0;

let numberKilled = 0;

// let bird = $("#gameArea > img");

let counterShow = $(
  `<li class="timerContainer"><div>time limit : </div><div id ='counter'> ${menuteObj.value}</div></li>`
);

let screenName = $(`<li class="header" > welcome :  ${user} </li>`);

let birdsKilled = $(
  `<li class="header" > Birds Killed &nbsp: &nbsp ${numberKilled}</li> `
);

let scoreElement = $(`<li class="header" > score :  ${score}</li> `);

//////////////////////////////////////////////////////////////////////    The Main Function
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

    let id = setInterval(() => {
      if (menuteObj.value) {
        moveBird(generateBird());
      } else {
        clearInterval(id);
      }
    }, 500);

    killBird();

    setInterval(() => {
      
    

    const bomb1 = new bomb();
    bomb1.img.click(function (e) {
      bomb1.explosion();
     

      let birds = $("#gameArea img");

      let killedBirds = Array.from(birds).filter((el) => {
      
        return (
          el.offsetLeft <= this.offsetLeft + 300 &&
          el.offsetLeft >= this.offsetLeft - 300 &&
          el.offsetTop <= this.offsetTop + 300 &&
          el.offsetTop >= this.offsetTop - 300
        );
      });
      console.log(killedBirds);
      killedBirds.forEach(function (ele) {
        killOneBird(ele);
      });
      this.remove();
    });
  }, 5000);
  });
});
///////////////////////////////////////////////////////////////////////     End Of Mian Function
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

/////////////////// Function to  Move Bird

const moveBird = (imgObj) => {
  if (menuteObj.value) {
    let position = -1 * parseInt(imgObj.css("width"));

    var id = setInterval(() => {
      if (position <= window.innerWidth + imgObj.width()) {
        position += 10;

        imgObj.css({ left: `${position}px` });

        $("html, body").css({
          overflow: "hidden",
        });
      } else {
        imgObj.remove();
      }
    }, 50);
  } else {
    clearInterval(id);
  }
};

/////////////// Function to  generate Bird
const generateBird = function () {
  let rondomNumber = parseInt(Math.random() * (4 - 1) + 1);

  let bird = $(`<img src="./images/${rondomNumber}.gif" alt="">`).appendTo(
    "#gameArea"
  );

  let startHight =
    Math.random() * (window.innerHeight - bird.height() - 200) + 55;

  let position = -bird.width();

  bird.css({
    position: "absolute",
    left: `${position}px`,
    top: `${startHight}px`,
  });

  return bird;
};

const generateDinamicBirds = function () {
  let numberBirds = parseInt(Math.random() * (10 - 1) + 1);
  for (let i = 0; i < numberBirds; i++) {
    let rondomNumber = parseInt(Math.random() * (4 - 1) + 1);
    let bird = $(`<img src="./images/${rondomNumber}.gif" alt="">`).appendTo(
      "#gameArea"
    );
    let startHight =
      Math.random() * (window.innerHeight - bird.height() - 200) + 55;
    let position = bird.width();
    bird.css({
      position: "absolute",
      left: `${position}px`,
      top: `${startHight}px`,
    });
    console.log(bird);
  }
  return $("#gameArea > img");
};

function killBird() {
  $("body").on("click", "#gameArea > img", function () {
    //   http://127.0.0.1:5500/images/3.gif
    // console.log(typeof this.src );
    switch (this.src) {
      case "http://127.0.0.1:5500/images/3.gif":
        score += 5;
        numberKilled++;
        break;
      case "http://127.0.0.1:5500/images/2.gif":
        score -= 10;
        numberKilled++;
        break;
      case "http://127.0.0.1:5500/images/1.gif":
        score += 10;
        numberKilled++;
        break;
    }
    scoreElement.text(`score :  ${score}`);
    birdsKilled.text(`Birds Killed :   ${numberKilled}`);
    this.remove();
  });
}

class bomb {
  constructor() {
    this.left = Math.floor(Math.random() * window.innerWidth);

    this.top = -100;

    this.img =
      $(`<img id="bomb" src="./images/bomb.gif" width="100px" height="100px"  style="position: absolute; left:${this.left}px; top:${this.top}px;" >
    `).insertBefore($("#gameArea"));

    if (menuteObj.value) {
      var id = setInterval(() => {
        if (this.top <= window.innerHeight + this.img.height()) {
          this.top += 10;

          this.img.css({ top: `${this.top}px` });

          $("html, body").css({
            overflow: "hidden",
          });
        } else {
          this.img.remove();
        }
      }, 100);
    } else {
      clearInterval(id);
    }
  }

  explosion() {
    console.log("mohand");
  }
}

let killOneBird = function (bird) {
  switch (bird.src) {
    case "http://127.0.0.1:5500/images/3.gif":
      score += 5;
      numberKilled++;
      break;
    case "http://127.0.0.1:5500/images/2.gif":
      score -= 10;
      numberKilled++;
      break;
    case "http://127.0.0.1:5500/images/1.gif":
      score += 10;
      numberKilled++;
      break;
  }
  scoreElement.text(`score :  ${score}`);
  birdsKilled.text(`Birds Killed :   ${numberKilled}`);
  bird.remove();
};
