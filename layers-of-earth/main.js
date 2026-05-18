const EARTH_RADIUS_KM = 6371;

const layers = [
  {
    id: "crust",
    name: "Crust",
    type: "Compositional",
    depthStart: 0,
    depthEnd: 70,
    thickness: "5-70 km",
    temperature: "0-700 C",
    state: "Solid and brittle",
    color: "#8d6a38",
    summary:
      "Earth's thin rocky skin, split into dense oceanic crust and thicker continental crust.",
    makeup:
      "Oceanic crust is mostly basalt and gabbro rich in iron, magnesium, calcium, and silica. Continental crust is generally more granitic and enriched in silica, aluminum, potassium, and sodium.",
    minerals: ["Basalt", "Gabbro", "Granite", "Quartz", "Feldspar", "Mica", "Pyroxene", "Olivine"],
    process:
      "Plate boundaries build, recycle, fold, and fracture crust. Most earthquakes and volcanoes begin in or directly below this layer.",
    evidence:
      "Direct rock samples, drilling, mountain belts, ocean floor mapping, gravity data, and seismic wave speeds reveal its thickness and composition.",
  },
  {
    id: "lithosphere",
    name: "Lithosphere",
    type: "Mechanical",
    depthStart: 0,
    depthEnd: 200,
    thickness: "50-200 km",
    temperature: "0-1,300 C",
    state: "Rigid solid plates",
    color: "#b58c4d",
    summary:
      "The rigid plate layer made of crust plus the coldest upper mantle, broken into moving tectonic plates.",
    makeup:
      "Includes crustal rocks at the top and cool upper-mantle peridotite below. It is defined by strength and stiffness rather than a single chemical recipe.",
    minerals: ["Peridotite", "Olivine", "Orthopyroxene", "Clinopyroxene", "Spinel", "Garnet", "Basalt", "Granite"],
    process:
      "Lithospheric plates spread at ridges, sink at trenches, slide past faults, and carry continents and ocean basins.",
    evidence:
      "Earthquake locations, plate motions measured by GPS, heat-flow maps, and seismic tomography outline its rigid behavior.",
  },
  {
    id: "asthenosphere",
    name: "Asthenosphere",
    type: "Mechanical",
    depthStart: 100,
    depthEnd: 350,
    thickness: "About 250 km",
    temperature: "1,300-1,600 C",
    state: "Weak solid, partly molten in places",
    color: "#d88a3d",
    summary:
      "A hot, weak zone of upper mantle that lets plates move above it over geologic time.",
    makeup:
      "Mostly peridotite close to its melting point. Tiny amounts of melt or water can reduce its strength even though most of the material remains solid.",
    minerals: ["Peridotite", "Olivine", "Pyroxene", "Garnet", "Basaltic melt", "Volatiles"],
    process:
      "Slow mantle flow, decompression melting beneath ridges, and plume upwelling are tied to this low-strength zone.",
    evidence:
      "Seismic low-velocity zones, electrical conductivity, volcanic chemistry, and plate-motion models point to a hotter, weaker mantle layer.",
  },
  {
    id: "upper-mantle",
    name: "Upper Mantle",
    type: "Compositional",
    depthStart: 70,
    depthEnd: 410,
    thickness: "About 340 km",
    temperature: "700-1,600 C",
    state: "Solid, slowly flowing",
    color: "#d15f2f",
    summary:
      "A dense rocky mantle region where high-pressure minerals dominate and magma can be generated.",
    makeup:
      "Ultramafic rock called peridotite dominates, with abundant magnesium and iron silicates. Near ridges, partial melting can produce basaltic magma.",
    minerals: ["Peridotite", "Olivine", "Pyroxene", "Garnet", "Spinel", "Basaltic magma"],
    process:
      "Mantle convection, partial melting, and plate recycling move heat and material through this region.",
    evidence:
      "Mantle xenoliths brought up by volcanoes, seismic wave speeds, lab experiments, and basalt chemistry constrain its composition.",
  },
  {
    id: "transition-zone",
    name: "Transition Zone",
    type: "Mineral Phase",
    depthStart: 410,
    depthEnd: 660,
    thickness: "About 250 km",
    temperature: "1,400-1,900 C",
    state: "Solid, high-pressure phases",
    color: "#bd4937",
    summary:
      "A mantle interval where minerals reorganize into denser crystal structures under pressure.",
    makeup:
      "Olivine transforms into wadsleyite and ringwoodite, minerals that can store small amounts of water inside their crystal structures.",
    minerals: ["Wadsleyite", "Ringwoodite", "Majorite garnet", "High-pressure pyroxene", "Water-bearing defects"],
    process:
      "Subducting slabs may stall or pass through this boundary, changing the pattern of mantle circulation.",
    evidence:
      "Sharp seismic discontinuities near 410 km and 660 km depth match mineral phase changes reproduced in high-pressure labs.",
  },
  {
    id: "lower-mantle",
    name: "Lower Mantle",
    type: "Compositional",
    depthStart: 660,
    depthEnd: 2900,
    thickness: "About 2,240 km",
    temperature: "1,900-3,700 C",
    state: "Solid, plastic flow",
    color: "#9a3034",
    summary:
      "Earth's largest rocky layer, hot enough to flow slowly but kept solid by enormous pressure.",
    makeup:
      "Dominated by magnesium silicate bridgmanite with ferropericlase and calcium silicate perovskite. It contains most of Earth's silicate rock by volume.",
    minerals: ["Bridgmanite", "Ferropericlase", "Calcium silicate perovskite", "Post-perovskite", "Subducted basalt"],
    process:
      "Deep mantle convection carries heat from the core upward and may feed large mantle plumes.",
    evidence:
      "Seismic tomography, mineral physics experiments, and the behavior of waves crossing the core-mantle boundary reveal its structure.",
  },
  {
    id: "outer-core",
    name: "Outer Core",
    type: "Compositional",
    depthStart: 2900,
    depthEnd: 5150,
    thickness: "About 2,250 km",
    temperature: "3,700-5,500 C",
    state: "Liquid metal",
    color: "#f0a531",
    summary:
      "A churning ocean of liquid iron alloy that powers Earth's magnetic field.",
    makeup:
      "Mostly iron and nickel with lighter elements such as sulfur, oxygen, silicon, carbon, or hydrogen mixed into the alloy.",
    minerals: ["Liquid iron alloy", "Nickel", "Sulfur", "Oxygen", "Silicon", "Core melt"],
    process:
      "Convection and Earth's rotation organize moving liquid metal into the geodynamo that generates the magnetic field.",
    evidence:
      "S-waves do not travel through it, P-waves bend strongly, and magnetic-field behavior requires moving electrically conductive fluid.",
  },
  {
    id: "inner-core",
    name: "Inner Core",
    type: "Compositional",
    depthStart: 5150,
    depthEnd: 6371,
    thickness: "About 1,221 km radius",
    temperature: "5,000-6,000 C",
    state: "Solid metal",
    color: "#f6d25b",
    summary:
      "A solid iron-rich sphere at Earth's center, hotter than the outer core but frozen by pressure.",
    makeup:
      "Primarily iron and nickel alloy. Its crystal structure and alignment may make seismic waves travel slightly faster in some directions.",
    minerals: ["Solid iron alloy", "Nickel", "Iron crystals", "Light element traces"],
    process:
      "As the inner core slowly grows, it releases heat and light elements that help drive outer-core convection.",
    evidence:
      "Seismic waves reflect from and pass through it, revealing a solid central core with anisotropic wave speeds.",
  },
];

const canvas = document.querySelector("#earthCanvas");
const context = canvas.getContext("2d");
const list = document.querySelector("#layerList");
const modeButtons = document.querySelectorAll(".mode-button");
let activeLayer = layers[0];
let activeMode = "structure";

const elements = {
  calloutName: document.querySelector("#calloutName"),
  calloutRange: document.querySelector("#calloutRange"),
  calloutKicker: document.querySelector("#calloutKicker"),
  layerType: document.querySelector("#layerType"),
  layerTitle: document.querySelector("#layerTitle"),
  layerSummary: document.querySelector("#layerSummary"),
  thicknessValue: document.querySelector("#thicknessValue"),
  depthValue: document.querySelector("#depthValue"),
  temperatureValue: document.querySelector("#temperatureValue"),
  stateValue: document.querySelector("#stateValue"),
  relativeThickness: document.querySelector("#relativeThickness"),
  thicknessBar: document.querySelector("#thicknessBar"),
  makeupText: document.querySelector("#makeupText"),
  mineralTags: document.querySelector("#mineralTags"),
  processText: document.querySelector("#processText"),
  evidenceText: document.querySelector("#evidenceText"),
};

function depthToRadius(depthKm, maxRadius) {
  return Math.max(0, maxRadius * (1 - depthKm / EARTH_RADIUS_KM));
}

function layerThickness(layer) {
  return Math.max(0, layer.depthEnd - layer.depthStart);
}

function createLayerButtons() {
  list.innerHTML = layers
    .map(
      (layer) => `
        <button class="layer-button" type="button" data-layer="${layer.id}">
          <span class="swatch" style="background:${layer.color}"></span>
          <span>
            <strong>${layer.name}</strong>
            <small>${layer.depthStart.toLocaleString()}-${layer.depthEnd.toLocaleString()} km</small>
          </span>
          <i>${layer.type}</i>
        </button>
      `,
    )
    .join("");

  list.querySelectorAll(".layer-button").forEach((button) => {
    button.addEventListener("click", () => {
      const next = layers.find((layer) => layer.id === button.dataset.layer);
      setActiveLayer(next);
    });
  });
}

function drawEarth() {
  const size = canvas.width;
  const center = size / 2;
  const maxRadius = size * 0.42;
  context.clearRect(0, 0, size, size);

  const gradient = context.createRadialGradient(center * 0.82, center * 0.72, 40, center, center, maxRadius * 1.2);
  gradient.addColorStop(0, "#fff1a0");
  gradient.addColorStop(0.26, "#f0a531");
  gradient.addColorStop(0.54, "#9a3034");
  gradient.addColorStop(0.82, "#d15f2f");
  gradient.addColorStop(1, "#6d5734");

  context.save();
  context.beginPath();
  context.arc(center, center, maxRadius + 28, 0, Math.PI * 2);
  context.fillStyle = "rgba(255, 255, 255, 0.28)";
  context.fill();
  context.restore();

  layers
    .filter((layer) => ["crust", "upper-mantle", "transition-zone", "lower-mantle", "outer-core", "inner-core"].includes(layer.id))
    .slice()
    .reverse()
    .forEach((layer) => {
      const outerRadius = depthToRadius(layer.depthStart, maxRadius);
      const innerRadius = depthToRadius(layer.depthEnd, maxRadius);
      context.beginPath();
      context.arc(center, center, outerRadius, -Math.PI * 0.72, Math.PI * 0.72);
      context.arc(center, center, innerRadius, Math.PI * 0.72, -Math.PI * 0.72, true);
      context.closePath();
      context.fillStyle = layer.id === activeLayer.id ? layer.color : blendColor(layer.color, "#201b1a", 0.12);
      context.fill();
      context.strokeStyle = "rgba(255,255,255,0.38)";
      context.lineWidth = layer.id === activeLayer.id ? 5 : 2;
      context.stroke();
    });

  drawMechanicalBand("lithosphere", maxRadius, center, -0.7);
  drawMechanicalBand("asthenosphere", maxRadius, center, -0.62);

  context.save();
  context.beginPath();
  context.arc(center, center, maxRadius, Math.PI * 0.72, Math.PI * 1.28);
  context.strokeStyle = "#245e8a";
  context.lineWidth = 34;
  context.lineCap = "round";
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = "rgba(10, 18, 20, 0.72)";
  context.font = "700 24px Inter, system-ui, sans-serif";
  context.fillText("Surface", center - maxRadius - 18, center - maxRadius - 22);
  context.fillText("Core", center - 24, center + 8);
  context.restore();
}

function drawMechanicalBand(id, maxRadius, center, angle) {
  const layer = layers.find((item) => item.id === id);
  const outerRadius = depthToRadius(layer.depthStart, maxRadius);
  const innerRadius = depthToRadius(layer.depthEnd, maxRadius);
  const start = Math.PI * angle;
  const end = start + Math.PI * 0.38;
  context.beginPath();
  context.arc(center, center, outerRadius, start, end);
  context.arc(center, center, innerRadius, end, start, true);
  context.closePath();
  context.fillStyle = layer.id === activeLayer.id ? layer.color : `${layer.color}aa`;
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.52)";
  context.lineWidth = layer.id === activeLayer.id ? 5 : 2;
  context.stroke();
}

function blendColor(hex, otherHex, amount) {
  const first = hexToRgb(hex);
  const second = hexToRgb(otherHex);
  const mixed = first.map((channel, index) => Math.round(channel + (second[index] - channel) * amount));
  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
}

function findLayerFromCanvas(event) {
  const rect = canvas.getBoundingClientRect();
  const scale = canvas.width / rect.width;
  const x = (event.clientX - rect.left) * scale - canvas.width / 2;
  const y = (event.clientY - rect.top) * scale - canvas.height / 2;
  const distance = Math.sqrt(x * x + y * y);
  const maxRadius = canvas.width * 0.42;
  const depth = Math.max(0, Math.min(EARTH_RADIUS_KM, EARTH_RADIUS_KM * (1 - distance / maxRadius)));
  const structuralLayers = layers.filter((layer) =>
    ["crust", "upper-mantle", "transition-zone", "lower-mantle", "outer-core", "inner-core"].includes(layer.id),
  );
  const found = structuralLayers.find((layer) => depth >= layer.depthStart && depth <= layer.depthEnd);
  if (found) {
    setActiveLayer(found);
  }
}

function setActiveLayer(layer) {
  activeLayer = layer;
  document.documentElement.style.setProperty("--layer", layer.color);
  document.querySelectorAll(".layer-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.layer === layer.id);
  });

  elements.calloutKicker.textContent = `${layer.type} layer`;
  elements.calloutName.textContent = layer.name;
  elements.calloutRange.textContent = `${layer.depthStart.toLocaleString()}-${layer.depthEnd.toLocaleString()} km depth`;
  elements.layerType.textContent = layer.type;
  elements.layerTitle.textContent = layer.name;
  elements.layerSummary.textContent = layer.summary;
  elements.thicknessValue.textContent = layer.thickness;
  elements.depthValue.textContent = `${layer.depthStart.toLocaleString()}-${layer.depthEnd.toLocaleString()} km`;
  elements.temperatureValue.textContent = layer.temperature;
  elements.stateValue.textContent = layer.state;
  elements.relativeThickness.textContent = `${Math.round((layerThickness(layer) / EARTH_RADIUS_KM) * 100)}% of Earth's radius`;
  elements.thicknessBar.style.width = `${Math.max(2, (layerThickness(layer) / EARTH_RADIUS_KM) * 100)}%`;
  elements.makeupText.textContent = layer.makeup;
  elements.processText.textContent = layer.process;
  elements.evidenceText.textContent = layer.evidence;
  elements.mineralTags.innerHTML = layer.minerals.map((item) => `<span>${item}</span>`).join("");

  updateModeContent();
  drawEarth();
}

function updateModeContent() {
  document.body.dataset.mode = activeMode;
  if (activeMode === "composition") {
    elements.makeupText.parentElement.classList.add("is-featured");
    elements.mineralTags.parentElement.classList.add("is-featured");
    elements.processText.parentElement.classList.remove("is-featured");
    elements.evidenceText.parentElement.classList.remove("is-featured");
  } else if (activeMode === "evidence") {
    elements.evidenceText.parentElement.classList.add("is-featured");
    elements.makeupText.parentElement.classList.remove("is-featured");
    elements.mineralTags.parentElement.classList.remove("is-featured");
    elements.processText.parentElement.classList.remove("is-featured");
  } else {
    elements.processText.parentElement.classList.add("is-featured");
    elements.makeupText.parentElement.classList.remove("is-featured");
    elements.mineralTags.parentElement.classList.remove("is-featured");
    elements.evidenceText.parentElement.classList.remove("is-featured");
  }
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeMode = button.dataset.mode;
    modeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    updateModeContent();
  });
});

canvas.addEventListener("click", findLayerFromCanvas);
canvas.addEventListener("mousemove", (event) => {
  canvas.style.cursor = "pointer";
});

createLayerButtons();
setActiveLayer(activeLayer);
