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

add_task.addEventListener("click", (e) => {
  let tbody = document.querySelector("table tbody");
  console.log(e)
  let name_v = name.value.trim();
  let description_v = description.value.trim();
  let date_v = date.value;
  let priority_v = priority.value;

  if (!name_v || !description_v || !date_v || !priority_v) {
    alert("не все поля заполнены");
    return;
  }

  let change_data = new Date(date_v).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  let row = document.createElement("tr");
  row.innerHTML = `
  <td><input class="checkbox_task" type="checkbox"></td>
  <td>${name_v}</td>
  <td>${description_v}</td>
  <td>${change_data}</td>
  <td>${priority_v}</td>
  <td><img class="delete" src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"></td>
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
    save_tasks();
  });

  let delete_btn = row.querySelector(".delete");
  delete_btn.addEventListener("click", () => {
    row.remove();
  });

  save_tasks();
});

function save_tasks() {
  let task_massive = [];
  document.querySelectorAll("table tbody tr").forEach((row) => {
    let checkbox = row.querySelector(".checkbox_task");
    let task_object = {
      check: checkbox.checked,
      name: row.children[1].innerHTML,
      description: row.children[2].innerHTML,
      date: row.children[3].innerHTML,
      priority: row.children[4].innerHTML,
    };
    task_massive.push(task_object);
  });
  localStorage.setItem("rows", JSON.stringify(task_massive));
  console.log(task_massive);
}

function load_tasks() {
  let tasks = JSON.parse(localStorage.getItem("rows"));
  if (tasks) {
    let tbody = document.querySelector("table tbody");
    tasks.forEach((task) => {
      let row = document.createElement("tr");
      row.innerHTML = `
      <td><input class="checkbox_task" type="checkbox" ${
        task.check ? "checked" : ""
      }></td>
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.date}</td>
      <td>${task.priority}</td>
      <td><img class="delete" src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"></td>
      `;
      tbody.appendChild(row);
      let checkbox = row.querySelector(".checkbox_task");
      if (task.check) {
        row.classList.add("solved_task");
      }
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          row.classList.add("solved_task");
        } else {
          row.classList.remove("solved_task");
        }
        save_tasks();
      });

      let delete_btn = row.querySelector(".delete");
      delete_btn.addEventListener("click", () => {
        row.remove();
        save_tasks();
      });
    });
  }
}

load_tasks();
