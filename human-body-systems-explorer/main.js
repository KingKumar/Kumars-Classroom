const systems = [
  {id:"nervous",name:"Nervous System",type:"Control network",color:"#6f63c7",job:"Sense, process, respond",tissue:"Neurons and glia",parts:["Brain","Spinal cord","Nerves","Sense organs"],summary:"Fast electrical and chemical signals coordinate movement, sensation, memory, and automatic body control.",connections:"Works with muscles for motion, endocrine glands for regulation, and senses for environmental feedback.",watch:"Reflexes are fast because signals can loop through the spinal cord before the brain finishes interpreting them.",organs:[["circle",210,122,44,"Brain"],["rect",198,176,24,210,"Spine"],["path","M198 270C150 310 132 370 92 410M222 270c48 40 66 100 106 140","Nerves"]]},
  {id:"circulatory",name:"Circulatory System",type:"Transport loop",color:"#c83e55",job:"Move materials",tissue:"Cardiac muscle and blood",parts:["Heart","Arteries","Veins","Capillaries","Blood"],summary:"The heart pumps blood through vessels to deliver oxygen, nutrients, hormones, and immune cells.",connections:"Works with lungs for gas exchange, digestive organs for nutrients, and kidneys for filtering blood.",watch:"Arteries usually carry blood away from the heart; veins usually bring it back.",organs:[["circle",210,284,36,"Heart"],["path","M210 250C172 310 158 390 150 510M214 252c44 64 58 142 66 258M184 304c-42 26-70 58-100 96M236 304c42 26 70 58 100 96","Vessels"]]},
  {id:"respiratory",name:"Respiratory System",type:"Gas exchange",color:"#2f8ca8",job:"Exchange O2 and CO2",tissue:"Epithelial air sacs",parts:["Trachea","Bronchi","Lungs","Alveoli","Diaphragm"],summary:"Airways bring air to the lungs, where alveoli trade oxygen and carbon dioxide with the blood.",connections:"Works directly with circulation so oxygen can reach cells and carbon dioxide can leave the body.",watch:"The diaphragm contracts downward to pull air into the lungs.",organs:[["rect",200,184,20,92,"Trachea"],["ellipse",170,310,54,92,"Lung"],["ellipse",250,310,54,92,"Lung"],["path","M204 252c-26 18-36 34-44 70M216 252c26 18 36 34 44 70","Bronchi"]]},
  {id:"digestive",name:"Digestive System",type:"Energy processing",color:"#d18a35",job:"Break down food",tissue:"Smooth muscle and epithelium",parts:["Mouth","Esophagus","Stomach","Intestines","Liver","Pancreas"],summary:"Food is mechanically and chemically broken down so nutrients can be absorbed into the bloodstream.",connections:"Works with circulation to deliver absorbed nutrients and with the nervous system to regulate appetite and movement.",watch:"Most nutrient absorption happens in the small intestine, not the stomach.",organs:[["rect",203,180,14,138,"Esophagus"],["ellipse",224,338,58,38,"Stomach"],["rect",154,382,112,112,"Intestines"],["ellipse",176,314,58,32,"Liver"]]},
  {id:"skeletal",name:"Skeletal System",type:"Support frame",color:"#7b858b",job:"Support and protect",tissue:"Bone and cartilage",parts:["Skull","Ribs","Spine","Pelvis","Long bones"],summary:"Bones protect organs, anchor muscles, store minerals, and produce blood cells in marrow.",connections:"Works with muscles for movement and with circulation because marrow forms blood cells.",watch:"Bone is living tissue that constantly remodels in response to stress.",organs:[["circle",210,122,48,"Skull"],["rect",203,192,14,248,"Spine"],["path","M154 238h112M144 268h132M150 298h120M166 516h88","Bones"],["path","M132 298l-46 132M288 298l46 132M188 438l-42 132M232 438l42 132","Limbs"]]},
  {id:"muscular",name:"Muscular System",type:"Movement engine",color:"#bf4c4c",job:"Move and stabilize",tissue:"Skeletal, smooth, cardiac muscle",parts:["Biceps","Quadriceps","Hamstrings","Diaphragm","Heart"],summary:"Muscles contract to move bones, pump blood, move food, and maintain posture and heat.",connections:"Works with bones as levers and nerves as control signals.",watch:"Opposing muscle pairs pull in different directions because muscles can contract but not push.",organs:[["ellipse",160,286,34,86,"Arm"],["ellipse",260,286,34,86,"Arm"],["ellipse",184,480,32,104,"Leg"],["ellipse",236,480,32,104,"Leg"],["ellipse",210,354,74,92,"Core"]]},
];
let active = systems[0];
const tabs = document.querySelector("#systemTabs");
const organLayer = document.querySelector("#organLayer");
tabs.innerHTML = systems.map((s) => `<button type="button" data-id="${s.id}">${s.name.split(" ")[0]}</button>`).join("");
tabs.addEventListener("click", (event) => { const button = event.target.closest("button"); if (button) setActive(button.dataset.id); });

function setActive(id) {
  active = systems.find((system) => system.id === id);
  document.documentElement.style.setProperty("--accent", active.color);
  tabs.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.id === id));
  document.querySelector("#systemType").textContent = active.type;
  document.querySelector("#systemName").textContent = active.name;
  document.querySelector("#summary").textContent = active.summary;
  document.querySelector("#job").textContent = active.job;
  document.querySelector("#tissue").textContent = active.tissue;
  document.querySelector("#parts").innerHTML = active.parts.map((part) => `<span>${part}</span>`).join("");
  document.querySelector("#connections").textContent = active.connections;
  document.querySelector("#watch").textContent = active.watch;
  drawOrgans();
}
function drawOrgans() {
  organLayer.innerHTML = active.organs.map((item) => {
    const [shape, ...rest] = item;
    if (shape === "circle") return `<circle class="organ" cx="${rest[0]}" cy="${rest[1]}" r="${rest[2]}" fill="${active.color}"/><text class="label" x="${rest[0]}" y="${rest[1]+4}">${rest[3]}</text>`;
    if (shape === "ellipse") return `<ellipse class="organ" cx="${rest[0]}" cy="${rest[1]}" rx="${rest[2]}" ry="${rest[3]}" fill="${active.color}"/><text class="label" x="${rest[0]}" y="${rest[1]+4}">${rest[4]}</text>`;
    if (shape === "rect") return `<rect class="organ" x="${rest[0]}" y="${rest[1]}" width="${rest[2]}" height="${rest[3]}" rx="9" fill="${active.color}"/><text class="label" x="${rest[0]+rest[2]/2}" y="${rest[1]+rest[3]/2}">${rest[4]}</text>`;
    return `<path class="organ" d="${rest[0]}" fill="none" stroke="${active.color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><text class="label" x="210" y="632">${rest[1]}</text>`;
  }).join("");
}
setActive(active.id);
