//let popupLink = document.getElementById("popup-link");
//let popupWindow = document.getElementById("addTransaction-window");
//let closeButton = document.getElementById("close-button");

//popupLink.addEventListener("click", function (event) {
//  event.preventDefault();
//  popupWindow.style.display = "block";
//});

//closeButton.addEventListener("click", function () {
//  popupWindow.style.display = "none";
//});


// Use Document Object Model DOM API
// 
// Instead of just one transction per click
// create multiple transactions or just one
// if multiple you take in all of the transactions into a JSON object or arrayList
// and insert it into the SQL

//<!-- JavaScript to Open/Close Modals -->
    
        // Function to show a modal
        function showModal(modalId) {
          document.getElementById(modalId).style.display = 'block';
      }

      // Function to close a modal
      function closeModal(modalId) {
          document.getElementById(modalId).style.display = 'none';
      }

      // Event Listeners for Buttons
      document.getElementById('addTransactionBtn').addEventListener('click', function () {
          showModal('addTransactionModal');
      });

      // Edit Buttons (Dynamic Example)
      document.querySelectorAll('.edit-btn').forEach(button => {
          button.addEventListener('click', function () {
              showModal('editTransactionModal');
          });
      });

      document.addEventListener("DOMContentLoaded", () => {
        fetch("/transactions")
          .then((response) => response.json())
          .then((data) => {
            const tableBody = document.getElementById("transactionTableBody");
            tableBody.innerHTML = "";
      
            data.forEach((transaction) => {
              const row = document.createElement("tr");
      
              row.innerHTML = `
                <td>${new Date(transaction.Date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}</td>
                <td>${transaction.type}</td>
                <td>${transaction.Wallet}</td>
                <td>${transaction.Description}</td>
                <td>${transaction.Category}</td>
                <td>${transaction.Value.toFixed(2)}</td>
                <td>
                  <button class="button edit-btn" data-id="${transaction.transaction_id}">Edit</button>
                </td>
              `;
              tableBody.appendChild(row);
            });
          })
          .catch((error) => console.error("Error fetching transactions:", error));
      });