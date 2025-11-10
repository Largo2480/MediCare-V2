const Cards_sec = document.getElementById("doctorsGrid");
const IDForm = document.getElementById("medecin-form");
const registerBTN = document.getElementById("submit-btn");

let NewForm = [];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

IDForm.addEventListener('submit', addForm);

function addForm(e) {
  e.preventDefault();
  const name = document.getElementById("nom").value.trim();
  const specialty = document.getElementById("specialite").value;
  const description = document.getElementById("description").value.trim();

  if (!description) {
    alert("No!!");
    return;
  }

  if (!confirm("Ajouter ce médecin ?")) return;

  const form = {
    id: Date.now(),
    name,
    specialty,
    description,
    available: []
  };

  NewForm.push(form);
  RenderCard();
  IDForm.reset();
}

function daysindex_modify(doctorId) {
  const doctor = NewForm.find((d) => d.id === doctorId);
  if (!doctor) return;


  const section = document.getElementById(`checkbox-sec-${doctorId}`);
  section.classList.toggle("hidden");
}

function save_days(doctorId) {
  const doctor = NewForm.find((d) => d.id === doctorId);
  if (!doctor) return;

  const selected = [];
  weekDays.forEach((day) => {
    const check = document.getElementById(`${doctorId}-${day}`);
    if (check && check.checked) selected.push(day);
  });

  doctor.available = selected;
  RenderCard();
}

function RenderCard() {
  Cards_sec.innerHTML = "";

  NewForm.forEach((form) => {
    const ID_Card = document.createElement("div");
    ID_Card.className = "flex flex-col doctor-card bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transition-transform cursor-pointer";

    const ID_img = document.createElement("img");
    ID_img.className = "rounded-xl w-full h-40 object-cover mb-3";
    ID_img.src = "https://images.unsplash.com/photo-1576765607924-3e0c61b6c9c5";

    const ID_h2 = document.createElement("h2");
    ID_h2.className = "text-xl font-semibold text-gray-800";
    ID_h2.textContent = form.name;

    const ID_des = document.createElement("p");
    ID_des.className = "text-gray-600 text-sm mt-2";
    ID_des.textContent = form.description;

    const ID_cat = document.createElement("p");
    ID_cat.className = "mt-3 text-blue-600 font-medium";
    ID_cat.textContent = form.specialty;

    const Days_Available = document.createElement("div");
    Days_Available.className = "bg-gradient-to-br from-[#a8edea] to-[#fed6e3] p-3 rounded-md border-l-4 border-[#2193b0] mb-4";

    const ID_h5 = document.createElement("h5");
    ID_h5.className = "font-bold mb-1";
    ID_h5.textContent = "Available:";

    const daysindex = document.createElement("div");
    daysindex.className = daysindex.className = "flex flex-wrap gap-1 mt-2";;
    daysindex.innerHTML =
      form.available.length > 0
        ? form.available.map((day) => `<span class="bg-[#2193b0] text-white px-2 py-1 rounded-full text-xs font-medium mr-1">${day}</span>`).join("")
        : `<span class="italic text-gray-500">No days set</span>`;

    const Modify_btn = document.createElement("div");
    Modify_btn.className = "btn-style flex flex-row justify-center items-center";

    const the_btn = document.createElement("button");
    the_btn.className ="bg-gradient-to-r from-[#b0218c] to-[#6dd5ed] m-1.5 w-[150px] text-white px-4 py-2 rounded-lg hover:opacity-90 transition";
    the_btn.textContent = "Modify";
    the_btn.addEventListener("click", () => daysindex_modify(form.id));

    Modify_btn.appendChild(the_btn);

    const checkbox_sec = document.createElement("div");
    checkbox_sec.id = `checkbox-sec-${form.id}`;
    checkbox_sec.className = "hidden mt-3 border-t pt-3";

    weekDays.forEach((day) => {
      const day_div = document.createElement("div");
      day_div.className = "flex items-center gap-2 mb-1";

      const day_check = document.createElement("input");
      day_check.type = "checkbox";
      day_check.id = `${form.id}-${day}`;
      day_check.className = "accent-[#2193b0] cursor-pointer ";
      day_check.checked = form.available.includes(day);

      const day_label = document.createElement("label");
      day_label.setAttribute("for", `${form.id}-${day}`);
      day_label.textContent = day;
      day_label.className = "text-gray-700 cursor-pointer";

      day_div.appendChild(day_check);
      day_div.appendChild(day_label);
      checkbox_sec.appendChild(day_div);
    });

    const save_btn = document.createElement("button");
    save_btn.textContent = "Save Changes";
    save_btn.className = "mt-2 bg-gradient-to-r from-[#42e695] to-[#3bb2b8] text-white px-3 py-1 rounded-lg hover:opacity-90 transition";
    save_btn.addEventListener("click", () => save_days(form.id));

    checkbox_sec.appendChild(save_btn);

    Days_Available.appendChild(ID_h5);
    Days_Available.appendChild(daysindex);

    ID_Card.appendChild(ID_img);
    ID_Card.appendChild(ID_h2);
    ID_Card.appendChild(ID_des);
    ID_Card.appendChild(ID_cat);
    ID_Card.appendChild(Days_Available);
    ID_Card.appendChild(Modify_btn);
    ID_Card.appendChild(checkbox_sec);

    Cards_sec.appendChild(ID_Card);
  });
}

