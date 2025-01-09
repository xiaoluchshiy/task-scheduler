let name = document.querySelector(".name");
let description = document.querySelector(".descriptoin");
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
  <td><input type="checkbox"></td>
  <td>${name_v}</td>
  <td>${description_v}</td>
  <td>${date_v}</td>
  <td>${priority_v}</td>
  <td><button class="delete">delete</button></td>
`;
  tbody.appendChild(row);
  console.log(description_v, name_v, priority_v, date_v);
  name.value = "";
});
