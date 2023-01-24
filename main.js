$(function () {
  // when the page loaded
  //   location.search.slice(location.search.indexOf("=")+1,location.search.indexOf("&"))
   let goButton = $(".goBtn");
  goButton.click(function (event) {
    //   event.preventDefault();
    let data = location.search;
    let level = data.slice(data.indexOf("=") + 1, data.indexOf("&"));
    let user = data.slice(data.indexOf("=", 7) + 1, data.lenght);
    console.log(level);
    console.log(user);
    let div = $(`<div>${user}</div>`);
    $("body").append(div);
  });
});
