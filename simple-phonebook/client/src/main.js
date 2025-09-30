import './style.css'

const API_URL = "http://localhost:5002/api/phone";

let editingId = null;

async function fetchDetails() {
  const res = await fetch(API_URL);
  const details = await res.json();

  let ul = document.querySelector(".list-phones");

  ul.innerHTML = "";
  details.forEach(ele => {
    let li = document.createElement("li");
    li.innerHTML = `<div class="w-full flex justify-between hover:bg-gray-950 hover:rounded-2xl cursor-pointer p-2"><div >
              <strong>Name:&nbsp${ele.name}</strong>
              <div class="others text-xs md:text-sm">
                <div class="phno">
                  <span class="font-bold">Number:&nbsp</span>${ele.phno}
                </div>
                <div class="email text-wrap"><span class="font-bold">Email:&nbsp</span>${ele.email}</div>
              </div>
              
            </div>
            <div class="buttons flex gap-1 flex-wrap justify-end">
                <button class="edit-btn w-fit rounded-2xl bg-black text-blue-100 p-2 cursor-pointer hover:bg-gray-800 h-fit">Edit</button>
                <button  class="del-btn w-fit rounded-2xl bg-black text-blue-100 p-2 cursor-pointer hover:bg-gray-800 h-fit">Delete</button>
              </div>
              </div>
              <div class="line bg-[var(--color-60)] h-0.5 rounded-2xl my-2"></div>`;
    li.querySelector(".del-btn").addEventListener("click", () => {
      delRecord(ele._id); // use _id from Mongo
    });
    li.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("recname").value = ele.name;
      document.getElementById("recnumber").value = ele.phno;
      document.getElementById("recemail").value = ele.email;
      document.querySelector(".final-save").innerText="Update";
      editingId = ele._id;
    });
    ul.appendChild(li);


  });
}

document.getElementById("phone-details").addEventListener("submit", async (e) => {
  e.preventDefault();

  let nameInput=document.getElementById("recname");
  let phnoInput=document.getElementById("recnumber");
  let emailInput=document.getElementById("recemail");
  let errorInput = document.getElementById("name-error");
  let errorPhno = document.getElementById("phno-error");
  let errorEmail = document.getElementById("email-error");

  errorInput.classList.add("hidden");
  errorPhno.classList.add("hidden");
  errorEmail.classList.add("hidden");
  nameInput.classList.remove("ring-red-500", "ring-2", "outline-none");
  phnoInput.classList.remove("ring-red-500", "ring-2", "outline-none");
  emailInput.classList.remove("ring-red-500", "ring-2", "outline-none");

  let name = document.getElementById("recname").value.trim();
  let phno = document.getElementById("recnumber").value.trim();
  let email = document.getElementById("recemail").value.trim();

  if (name.length < 3 || phno) {
    if (name.length<3) { 
      nameInput.classList.add("ring-red-500", "ring-2", "outline-none");
      errorInput.classList.remove("hidden");
      errorInput.innerText="Name must be at least 3 characters long."; 
    } 
    if (!/^\d+$/.test(phno)) {
      phnoInput.classList.add("ring-red-500", "ring-2", "outline-none");
    errorPhno.classList.remove("hidden");
    errorPhno.innerText="Phone number must be only Numbers";
    
    return;
    }
    else if (!/^\d{10}$/.test(phno)) {
       phnoInput.classList.add("ring-red-500", "ring-2", "outline-none");
    errorPhno.classList.remove("hidden");
    errorPhno.innerText="Phone number must be exactly 10 digits.";
    return;
    }
    
  }

  
  if (email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add("ring-red-500", "ring-2", "outline-none");
    errorEmail.classList.remove("hidden");
    errorEmail.innerText="Please enter a valid email address.";
      return;
    }
  }
  phno = phno ? parseInt(phno) : null;
  

  if (name && phno) {
    let a = await fetch(editingId ? `${API_URL}/${editingId}` : API_URL, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, phno, email }),
    })
    console.log(await a.json());

  }
  document.getElementById("recname").value = "";
  document.getElementById("recnumber").value = "";
  document.getElementById("recemail").value = "";
  editingId = null;
  fetchDetails();

})

async function delRecord(id) {
  let a = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  console.log(a.json());

  fetchDetails();
}

document.querySelector(".final-clear").addEventListener("click",()=>{
  document.getElementById("recname").value = "";
  document.getElementById("recnumber").value = "";
  document.getElementById("recemail").value = "";
})

let lastScrollY = window.scrollY;
let opacity = 1;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  let currentScrollY = window.scrollY;
  let diff = currentScrollY - lastScrollY;

  if (diff > 0) {
    // Scrolling down → reduce opacity
    opacity -= diff * 0.01; // more sensitive
  } else {
    // Scrolling up → increase opacity
    opacity += Math.abs(diff) * 0.01;
  }

  // Clamp between 0 and 1
  opacity = Math.max(0, Math.min(1, opacity));

  // Apply only opacity
  navbar.style.opacity = opacity;

  lastScrollY = currentScrollY;
});




fetchDetails();
