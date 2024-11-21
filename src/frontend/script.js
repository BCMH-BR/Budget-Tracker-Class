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
