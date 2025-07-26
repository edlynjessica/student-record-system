// Select DOM elements
const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const submitButton = form.querySelector("button");

let editingRow = null;

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const course = document.getElementById("course").value.trim();

  if (!name || !age || !course) return; // basic validation

  if (editingRow) {
    // Update existing row
    editingRow.children[0].textContent = name;
    editingRow.children[1].textContent = age;
    editingRow.children[2].textContent = gender;
    editingRow.children[3].textContent = course;
    editingRow.classList.remove("editing");

    editingRow = null;
    submitButton.textContent = "Add Student";
  } else {
    // Create new row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${age}</td>
      <td>${gender}</td>
      <td>${course}</td>
      <td>
        <button class="edit-btn">✏️ Edit</button>
        <button class="delete-btn">🗑️ Delete</button>
      </td>
    `;

    // Delete function
    row.querySelector(".delete-btn").addEventListener("click", function () {
      if (editingRow === row) {
        editingRow = null;
        submitButton.textContent = "Add Student";
      }
      tableBody.removeChild(row);
    });

    // Edit function
    row.querySelector(".edit-btn").addEventListener("click", function () {
      const [nameCell, ageCell, genderCell, courseCell] = row.children;

      document.getElementById("name").value = nameCell.textContent;
      document.getElementById("age").value = ageCell.textContent;
      document.getElementById("gender").value = genderCell.textContent;
      document.getElementById("course").value = courseCell.textContent;

      if (editingRow) editingRow.classList.remove("editing");
      row.classList.add("editing");
      editingRow = row;
      submitButton.textContent = "Update Student";
    });

    tableBody.appendChild(row);
  }

  form.reset();
});

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  
  // Toggle icon
  if (document.body.classList.contains("dark")) {
    darkBtn.textContent = "☀️"; // Light mode icon
  } else {
    darkBtn.textContent = "🌙"; // Dark mode icon
  }
});
