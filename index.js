let btnSumit = document.getElementById("btnSumit");
btnSumit.addEventListener("click", postexepence);

function postexepence() {
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;
  let category = document.getElementById("category").value;

  axios
    .post("https://crudcrud.com/api/3437dd26327542b1924bce8c970f34e6/expence", {
      Amount: amount,
      Description: description,
      Category: category,
    })
    .then((res) => {
      console.log(res.data);

      // Add the newly posted data to the table immediately
      const table = document.getElementById("table");
      const row = document.createElement("tr");
      row.setAttribute("data-id", res.data._id); // Store the ID for deletion

      row.innerHTML = `
        <td>${res.data.Amount}</td>
        <td>${res.data.Description}</td>
        <td>${res.data.Category}</td>
        <td>
         <button type="button" style="background-color: #dc3545; color: #fff" onclick="remove(this)" class="btn btn-sm mt-2">Delete</button>
        </td>
      `;

      // Append the new row to the table
      table.appendChild(row);

      // Clear the form after submission
      document.getElementById("amount").value = "";
      document.getElementById("description").value = "";
      document.getElementById("category").value = "";
    })
    .catch((error) => console.log(error));
}

function remove(row) {
  const tableRow = row.parentElement.parentElement; // Get the parent <tr>
  const id = tableRow.getAttribute("data-id"); // Get the ID from the data attribute

  axios
    .delete(
      `https://crudcrud.com/api/3437dd26327542b1924bce8c970f34e6/expence/${id}`
    )
    .then(() => {
      // Remove the row from the UI
      tableRow.remove();
    })
    .catch((error) => console.log(error));
}

// Fetch and display existing data when the page loads
function redData() {
  axios
    .get("https://crudcrud.com/api/3437dd26327542b1924bce8c970f34e6/expence")
    .then((res) => {
      let data = res.data;
      let table = document.getElementById("table");

      data.forEach((user) => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", user._id); // Store the ID for deletion

        row.innerHTML = `
          <td>${user.Amount}</td>
          <td>${user.Description}</td>
          <td>${user.Category}</td>
          <td>
          <button type="button" style="background-color: #dc3545; color: #fff" onclick="remove(this)" class="btn btn-sm mt-2">Delete</button>
          </td>
        `;

        // Append the row to the table body
        table.appendChild(row);
      });
    })
    .catch((error) => console.log(error));
}

// Call redData to display existing records when the page loads
redData();
