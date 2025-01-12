let name = document.querySelector(".name");
let description = document.querySelector(".description");
let date = document.querySelector(".date");
let priority = document.querySelector(".priority");
let add_task = document.querySelector(".add_task");

function create_table() {
  let table_container = document.querySelector(".table_container");
  let table = document.createElement("table");
  table.innerHTML = `
        <thead>
            <tr>
                <th>done</th>
                <th>name</th>
                <th>description</th>
                <th>date</th>
                <th>priority</th>
                <th>delete</th>
            </tr>
        </thead> 
        <tbody>
        </tbody>
`;
  table_container.appendChild(table);
}

create_table();

add_task.addEventListener("click", () => {
  let tbody = document.querySelector("table tbody");

  let name_v = name.value.trim();
  let description_v = description.value.trim();
  let date_v = date.value;
  let priority_v = priority.value;

  if (!name_v || !description_v || !date_v || !priority_v) {
    alert("не все поля заполнены");
    return;
  }

  let row = document.createElement("tr");
  row.innerHTML = `
  <td><input class="checkbox_task" type="checkbox"></td>
  <td>${name_v}</td>
  <td>${description_v}</td>
  <td>${date_v}</td>
  <td>${priority_v}</td>
  <td><button class="delete">delete</button></td>
`;
  tbody.appendChild(row);
  name.value = "";
  description.value = "";
  date.value = "";
  priority.value = "";

  let checkbox = row.querySelector(".checkbox_task");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      row.classList.add("solved_task");
    } else {
      row.classList.remove("solved_task");
    }
  });

  let delete_btn = row.querySelector(".delete");
  delete_btn.addEventListener("click", () => {
    row.remove();
  });

  window.local;
});

function save_tasks() {
  let task_massive = [];
  document.querySelectorAll("table tbody tr").forEach((row) => {
    let task_object = {
      check: row[0].checked,
      name: row[1].innerHTML,
      description: row[2].innerHTML,
      date: row[3].innerHTML,
      priority: row[4].innerHTML,
    };
    task_massive.push(task_object);
  });
  localStorage.setItem("rows", JSON.stringify(task_massive));
}
