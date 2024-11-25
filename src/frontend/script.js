let popupLink = document.getElementById("popup-link");
let popupWindow = document.getElementById("addTransaction-window");
let closeButton = document.getElementById("close-button");

popupLink.addEventListener("click", function (event) {
  event.preventDefault();
  popupWindow.style.display = "block";
});

closeButton.addEventListener("click", function () {
  popupWindow.style.display = "none";
});


// Use Document Object Model DOM API
// 
// Instead of just one transction per click
// create multiple transactions or just one
// if multiple you take in all of the transactions into a JSON object or arrayList
// and insert it into the SQL
