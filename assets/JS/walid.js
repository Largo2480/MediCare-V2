const Cards_sec = document.getElementById("doctorsGrid")
    const IDForm = document.getElementById("medecin-form")
    const registerBTN = document.getElementById("submit-btn")

    let NewForm = []


    IDForm.addEventListener('submit', addForm)

    function addForm(e){
      e.preventDefault();
      const name = document.getElementById("nom").value.trim();
      const specialty = document.getElementById("specialite").value;
      const description = document.getElementById("description").value.trim();

      if (!description) {
    alert("No!!");
    return;
    }
    
    if (!confirm("Ajouter ce médecin ?"))
    return
    const form = {
    id : Date.now(),
    name : name,
    specialty : specialty,
    description : description,
    }

    NewForm.push(form);
    RenderCard()
    IDForm.reset();
    };
    function daysindex_modify(){
        alert("Pass")
        Cards_sec.innerHTML=""
        
    }




    function RenderCard(){
      Cards_sec.innerHTML=""

      NewForm.forEach(form =>{
        const ID_Card = document.createElement('div');
        ID_Card.className="flex flex-col  doctor-card bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transition-transform cursor-pointer";
        
        const  ID_img = document.createElement('img');
        ID_img.className = "rounded-xl w-full h-40 object-cover mb-3";

        const ID_h2 = document.createElement('h2');
        ID_h2.className = "text-xl font-semibold text-gray-800";
        ID_h2.textContent = form.name;

        const ID_des = document.createElement('p');
        ID_des.className = "text-gray-600 text-sm mt-2";
        ID_des.textContent = form.description;

        const ID_cat = document.createElement('p');
        ID_cat.className = "mt-3 text-blue-600 font-medium";
        ID_cat.textContent = form.specialty;

        const Days_Available = document.createElement('div');
        Days_Available.className = "bg-gradient-to-br from-[#a8edea] to-[#fed6e3] p-3 rounded-md border-l-4 border-[#2193b0] mb-4";

        const ID_h5 = document.createElement('h5');
        ID_h5.className = "font-bold";
        ID_h5.textContent = "Available:";

        const daysindex = document.createElement('div');
        daysindex.className = '';

        const Modify_btn = document.createElement('div');
        Modify_btn.className = 'btn-style flex flex-row justify-center items-center'

        const the_btn = document.createElement('button');
        the_btn.className = 'bg-gradient-to-r from-[#b0218c] to-[#6dd5ed]  m-1.5 w-[150px] text-white px-4 py-2 rounded-lg hover:opacity-90 transition';
        the_btn.textContent = "Modify";
        the_btn.addEventListener('click', daysindex_modify);

        Modify_btn.appendChild(the_btn)
        Days_Available.appendChild(ID_h5)
        Days_Available.appendChild(daysindex)
        ID_Card.appendChild(ID_img)
        ID_Card.appendChild(ID_h2)
        ID_Card.appendChild(ID_des)
        ID_Card.appendChild(ID_cat)
        ID_Card.appendChild(Days_Available)
        ID_Card.appendChild(Modify_btn)
        Cards_sec.appendChild(ID_Card)
        
      })
    }