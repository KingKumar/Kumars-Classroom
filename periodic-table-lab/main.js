const elements = [
  ["H","Hydrogen",1,1,1,"nonmetal","1.008","Gas","1","Fuel cells, stars, acids","Forms H+ and H-; reactive with oxygen."],
  ["He","Helium",2,18,1,"noble","4.003","Gas","18","Balloons, MRI cooling, welding","Inert noble gas with a full valence shell."],
  ["Li","Lithium",3,1,2,"alkali","6.94","Solid","1","+1","Batteries, mood medicine, ceramics","Soft alkali metal; loses one electron easily."],
  ["Be","Beryllium",4,2,2,"alkaline","9.012","Solid","2","+2","Aerospace alloys, X-ray windows","Light alkaline earth metal; toxic dust."],
  ["B","Boron",5,13,2,"metalloid","10.81","Solid","13","+3","Borax, glass, detergents","Metalloid; forms strong covalent networks."],
  ["C","Carbon",6,14,2,"nonmetal","12.011","Solid","14","-4,+4","Life molecules, graphite, diamond","Four valence electrons make rich covalent bonding."],
  ["N","Nitrogen",7,15,2,"nonmetal","14.007","Gas","15","-3,+5","Atmosphere, fertilizers, proteins","Triple-bonded N2 is stable; fixed nitrogen feeds plants."],
  ["O","Oxygen",8,16,2,"nonmetal","15.999","Gas","16","-2","Breathing, water, combustion","Strong oxidizer; common in silicate minerals."],
  ["F","Fluorine",9,17,2,"halogen","18.998","Gas","17","-1","Toothpaste fluoride, Teflon","Most reactive halogen; grabs one electron."],
  ["Ne","Neon",10,18,2,"noble","20.180","Gas","18","0","Signs, lasers","Inert gas that glows orange-red in tubes."],
  ["Na","Sodium",11,1,3,"alkali","22.990","Solid","1","+1","Salt, streetlights, batteries","Very reactive metal; forms Na+ in table salt."],
  ["Mg","Magnesium",12,2,3,"alkaline","24.305","Solid","2","+2","Flares, alloys, chlorophyll","Burns bright white; central in chlorophyll."],
  ["Al","Aluminum",13,13,3,"post","26.982","Solid","13","+3","Cans, aircraft, foil","Light metal protected by oxide coating."],
  ["Si","Silicon",14,14,3,"metalloid","28.085","Solid","14","+4,-4","Computer chips, glass, quartz","Metalloid backbone of silicate rocks."],
  ["P","Phosphorus",15,15,3,"nonmetal","30.974","Solid","15","-3,+5","DNA, fertilizers, matches","Key in ATP and nucleic acids."],
  ["S","Sulfur",16,16,3,"nonmetal","32.06","Solid","16","-2,+6","Proteins, vulcanized rubber","Forms sulfides and sulfate minerals."],
  ["Cl","Chlorine",17,17,3,"halogen","35.45","Gas","17","-1","Disinfection, salt, PVC","Reactive halogen; forms chloride salts."],
  ["Ar","Argon",18,18,3,"noble","39.948","Gas","18","0","Light bulbs, welding","Inert and common in air."],
  ["K","Potassium",19,1,4,"alkali","39.098","Solid","1","+1","Fertilizers, nerve signals","Essential electrolyte; very reactive metal."],
  ["Ca","Calcium",20,2,4,"alkaline","40.078","Solid","2","+2","Bones, limestone, cement","Forms calcite and supports bones and shells."],
  ["Sc","Scandium",21,3,4,"transition","44.956","Solid","3","+3","Aluminum alloys, lamps","Light transition metal."],
  ["Ti","Titanium",22,4,4,"transition","47.867","Solid","4","+4,+3","Implants, aircraft, pigments","Strong, light, corrosion resistant."],
  ["V","Vanadium",23,5,4,"transition","50.942","Solid","5","+5,+4","Steel, flow batteries","Strengthens steel."],
  ["Cr","Chromium",24,6,4,"transition","51.996","Solid","6","+3,+6","Stainless steel, chrome plating","Adds corrosion resistance."],
  ["Mn","Manganese",25,7,4,"transition","54.938","Solid","7","+2,+4,+7","Steel, batteries","Common in oxides and steelmaking."],
  ["Fe","Iron",26,8,4,"transition","55.845","Solid","8","+2,+3","Steel, blood hemoglobin","Magnetic metal; core ingredient of steel."],
  ["Co","Cobalt",27,9,4,"transition","58.933","Solid","9","+2,+3","Magnets, blue glass, batteries","Transition metal used in high-performance alloys."],
  ["Ni","Nickel",28,10,4,"transition","58.693","Solid","10","+2","Stainless steel, coins, batteries","Corrosion-resistant transition metal."],
  ["Cu","Copper",29,11,4,"transition","63.546","Solid","11","+1,+2","Wiring, plumbing, bronze","Excellent conductor; forms green patina."],
  ["Zn","Zinc",30,12,4,"transition","65.38","Solid","12","+2","Galvanizing, brass, nutrition","Protects steel from rust."],
  ["Ga","Gallium",31,13,4,"post","69.723","Solid","13","+3","LEDs, semiconductors","Melts near room temperature."],
  ["Ge","Germanium",32,14,4,"metalloid","72.630","Solid","14","+4","Fiber optics, semiconductors","Metalloid with semiconductor behavior."],
  ["As","Arsenic",33,15,4,"metalloid","74.922","Solid","15","-3,+3,+5","Semiconductors, pesticides historically","Toxic metalloid."],
  ["Se","Selenium",34,16,4,"nonmetal","78.971","Solid","16","-2,+4,+6","Solar cells, nutrition","Trace nutrient; photoresponsive."],
  ["Br","Bromine",35,17,4,"halogen","79.904","Liquid","17","-1","Flame retardants, photography","Only liquid nonmetal at room temperature."],
  ["Kr","Krypton",36,18,4,"noble","83.798","Gas","18","0","Lighting, lasers","Heavy noble gas."],
];
const filters = ["all","nonmetal","noble","alkali","alkaline","transition","metalloid","post","halogen"];
let activeFilter = "all";
let selected = elements[5];

const table = document.querySelector("#periodicTable");
const filterBox = document.querySelector("#filters");

filterBox.innerHTML = filters.map((filter) => `<button type="button" data-filter="${filter}">${filter}</button>`).join("");
filterBox.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  activeFilter = button.dataset.filter;
  render();
});

function render() {
  filterBox.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === activeFilter));
  table.innerHTML = elements.map((item) => {
    const [symbol, name, number, group, period, type] = item;
    const dim = activeFilter !== "all" && activeFilter !== type;
    return `<button class="element ${type} ${dim ? "is-dim" : ""} ${selected[0] === symbol ? "is-active" : ""}" style="grid-column:${group};grid-row:${period}" data-symbol="${symbol}" type="button">
      <small>${number}</small><strong>${symbol}</strong><span>${name}</span>
    </button>`;
  }).join("");
  renderDetail();
}

table.addEventListener("click", (event) => {
  const button = event.target.closest(".element");
  if (!button) return;
  selected = elements.find((item) => item[0] === button.dataset.symbol);
  render();
});

function renderDetail() {
  const [symbol, name, number,, period, type, mass, state, group, ions, uses, behavior] = selected;
  document.documentElement.style.setProperty("--accent", colorFor(type));
  document.querySelector("#atomicNumber").textContent = `Atomic number ${number}`;
  document.querySelector("#symbol").textContent = symbol;
  document.querySelector("#name").textContent = name;
  document.querySelector("#category").textContent = labelFor(type);
  document.querySelector("#mass").textContent = mass;
  document.querySelector("#state").textContent = state;
  document.querySelector("#group").textContent = `Group ${group}, period ${period}`;
  document.querySelector("#ions").textContent = ions;
  document.querySelector("#behavior").textContent = behavior;
  document.querySelector("#uses").innerHTML = uses.split(", ").map((use) => `<span>${use}</span>`).join("");
  renderAtom(number, symbol);
}

function renderAtom(number, symbol) {
  const shells = [];
  let remaining = number;
  [2, 8, 18, 18].forEach((capacity) => {
    if (remaining <= 0) return;
    shells.push(Math.min(capacity, remaining));
    remaining -= capacity;
  });
  const atom = document.querySelector("#atomView");
  atom.innerHTML = `<div class="nucleus">${symbol}</div>`;
  shells.forEach((count, shellIndex) => {
    const size = 82 + shellIndex * 42;
    atom.insertAdjacentHTML("beforeend", `<div class="shell-ring" style="width:${size}px;height:${size}px"></div>`);
    for (let index = 0; index < count; index += 1) {
      const angle = (Math.PI * 2 * index) / count + shellIndex * 0.4;
      const x = 50 + Math.cos(angle) * (size / 2) / 2.3;
      const y = 50 + Math.sin(angle) * (size / 2) / 2.3;
      atom.insertAdjacentHTML("beforeend", `<span class="electron" style="left:${x}%;top:${y}%"></span>`);
    }
  });
}

function colorFor(type) {
  return { nonmetal:"#2f7f73", noble:"#4f77b8", alkali:"#b66b2d", alkaline:"#9b7b31", transition:"#426fa8", metalloid:"#6f8d3a", post:"#67706f", halogen:"#805aa8" }[type];
}
function labelFor(type) {
  return type.replace(/^\w/, (letter) => letter.toUpperCase()).replace("post", "Post-transition metal");
}
render();
