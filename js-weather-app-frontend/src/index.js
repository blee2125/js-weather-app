console.log("testing...123")
// test that we can get data from the backend
const BACKEND_URL = 'localhost:3000';
fetch(`http://${BACKEND_URL}/test`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));

function seeTheWeather() {
  //gets zipcode from input
  var zip = document.getElementById("zipcode").value

  alert(`zipcode is ${zip}`);

}

// enter/return button for zipcode field, must load after DOM
document.getElementById("zipcode").addEventListener("keyup", function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    document.querySelector("button#zipcodeButton").click();
  }
});