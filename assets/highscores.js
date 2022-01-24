var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.forEach((element, index) => {
  console.log(element.name + " - " + element.score);
  document.getElementById("highScoresList").innerHTML +=
    element.name + " - " + element.score + "<br>";
});
