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
  document.getElementById(modalId).style.display = "block";
}

// Function to close a modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Event Listeners for Buttons
document
  .getElementById("addTransactionBtn")
  .addEventListener("click", function () {
    showModal("addTransactionModal");
  });

// Edit Buttons (Dynamic Example)
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", function () {
    showModal("editTransactionModal");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("/transactions")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("transactionTableBody");
      tableBody.innerHTML = "";

      let total = 0; // To keep track of the total value

      data.forEach((transaction) => {
        const row = document.createElement("tr");

        // Adjust value based on type
        const transactionValue =
          transaction.type === "Expense"
            ? -Math.abs(transaction.Value)
            : Math.abs(transaction.Value);

        total += transactionValue;

        // Add row to the table
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
                <td>${transactionValue.toFixed(2)}</td>
                <td>
                  <button class="button edit-btn" data-id="${transaction.transaction_id}">Edit</button>
                </td>
              `;
        tableBody.appendChild(row);
      });

      // Append total row at the end
      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
              <td colspan="5" style="text-align: right; font-weight: bold;">Total</td>
              <td style="font-weight: bold;">${total.toFixed(2)}</td>
              <td></td>
            `;
      tableBody.appendChild(totalRow);
    })
    .catch((error) => console.error("Error fetching transactions:", error));
});

function validateForm() {
  // Get form values
  let firstName = document.getElementById("first_name").value.trim();
  let secondName = document.getElementById("second_name").value.trim();
  let email = document.getElementById("email").value.trim();
  let age = document.getElementById("age").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let eircode = document.getElementById("eircode").value.trim();
  let password = document.getElementById("password").value.trim();

  // Regular expressions
  let nameRegex = /^[a-zA-Z0-9]{1,20}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^\d{10}$/;
  let eircodeRegex = /^[0-9][A-Za-z0-9]{5}$$/;
  let passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  // Validation checks
  if (!nameRegex.test(firstName)) {
    alert("First name must be alphanumeric and up to 20 characters.");
    return false;
  }
  if (!nameRegex.test(secondName)) {
    alert("Second name must be alphanumeric and up to 20 characters.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (isNaN(age) || age <= 0) {
    alert("Please enter a valid age.");
    return false;
  }
  if (!phoneRegex.test(phone)) {
    alert("Phone number must contain 10 numeric characters.");
    return false;
  }
  if (!eircodeRegex.test(eircode)) {
    alert(
      "Eircode must start with a number, be alphanumeric, and have exactly 6 characters."
    );
    return false;
  }
  if (!passwordRegex.test(password)) {
    alert(
      "Password must have at least one lowercase, one uppercase letter, one number, one special character, and be at least 8 characters long."
    );
    return false;
  }
  return true;
}
