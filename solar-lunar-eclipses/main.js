const canvas = document.querySelector("#eclipseCanvas");
const ctx = canvas.getContext("2d");
const phaseSlider = document.querySelector("#phaseSlider");
const speedSlider = document.querySelector("#speedSlider");
const showLabelsInput = document.querySelector("#showLabels");
const showPathsInput = document.querySelector("#showPaths");
const modeButtons = document.querySelectorAll(".mode-tab");

const ui = {
  modeSummary: document.querySelector("#modeSummary"),
  phaseReadout: document.querySelector("#phaseReadout"),
  alignmentReadout: document.querySelector("#alignmentReadout"),
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonText: document.querySelector("#lessonText"),
  noticeList: document.querySelector("#noticeList"),
};

const modes = {
  solar: {
    phase: 180,
    title: "Solar Eclipse",
    summary:
      "The Moon moves between the Sun and Earth. Its umbra makes a narrow path of totality, while the penumbra creates a wider partial eclipse zone.",
    notices: [
      "Solar eclipses happen near new moon.",
      "The Moon's umbra only covers a small part of Earth.",
      "People in the penumbra see the Sun partly covered.",
    ],
  },
  lunar: {
    phase: 0,
    title: "Lunar Eclipse",
    summary:
      "Earth moves between the Sun and Moon. The Moon passes through Earth's penumbra first, then the darker umbra during a partial or total lunar eclipse.",
    notices: [
      "Lunar eclipses happen near full moon.",
      "Earth's shadow is much larger than the Moon.",
      "The Moon can turn red because Earth's atmosphere bends red sunlight into the umbra.",
    ],
  },
  orbit: {
    phase: 82,
    title: "Free Orbit",
    summary:
      "Let the Moon orbit and watch how most new and full moons miss the shadow cones because the Moon's orbit is tilted about 5 degrees.",
    notices: [
      "Eclipses need a new or full moon plus near-perfect node alignment.",
      "The penumbra is wider and softer than the umbra.",
      "The tilted orbit explains why eclipses do not happen every month.",
    ],
  },
};

let activeMode = "solar";
let phase = modes.solar.phase;
let speed = Number(speedSlider.value);
let lastTime = performance.now();

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(900, Math.round(rect.width * devicePixelRatio));
  canvas.height = Math.max(560, Math.round(rect.height * devicePixelRatio));
}

function setMode(mode) {
  activeMode = mode;
  phase = modes[mode].phase;
  phaseSlider.value = String(phase);
  modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));
  updateText();
}

function updateText() {
  const mode = modes[activeMode];
  ui.modeSummary.textContent = mode.summary;
  ui.lessonTitle.textContent = mode.title;
  ui.lessonText.textContent = mode.summary;
  ui.noticeList.innerHTML = mode.notices.map((item) => `<li>${item}</li>`).join("");
}

function positionModel() {
  const width = canvas.width;
  const height = canvas.height;
  const scale = Math.min(width / 1280, height / 760);
  const sun = { x: width * 0.16, y: height * 0.5, r: 70 * scale };
  const earth = { x: width * 0.68, y: height * 0.5, r: 44 * scale };
  const orbit = { rx: 178 * scale, ry: 76 * scale };
  const angle = (phase * Math.PI) / 180;
  const moon = {
    x: earth.x + Math.cos(angle) * orbit.rx,
    y: earth.y + Math.sin(angle) * orbit.ry,
    r: 16 * scale,
  };
  return { width, height, scale, sun, earth, moon, orbit, angle };
}

function draw() {
  const now = performance.now();
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  speed = Number(speedSlider.value);
  if (activeMode === "orbit") {
    phase = (phase + speed * dt * 32) % 360;
    phaseSlider.value = String(Math.round(phase));
  }

  const model = positionModel();
  ctx.clearRect(0, 0, model.width, model.height);
  drawBackground(model);
  if (showPathsInput.checked) drawOrbit(model);
  drawSun(model);
  drawShadowCones(model);
  drawEarth(model);
  drawMoon(model);
  drawLabels(model);
  updateReadouts(model);
  requestAnimationFrame(draw);
}

function drawBackground({ width, height }) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#07101c");
  gradient.addColorStop(0.55, "#10192b");
  gradient.addColorStop(1, "#05070d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  for (let i = 0; i < 95; i += 1) {
    const x = ((i * 193) % width) + 0.5;
    const y = ((i * 89) % height) + 0.5;
    const r = i % 9 === 0 ? 2 : 1;
    ctx.globalAlpha = 0.25 + (i % 7) * 0.08;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawSun({ sun }) {
  const glow = ctx.createRadialGradient(sun.x, sun.y, sun.r * 0.2, sun.x, sun.y, sun.r * 3.1);
  glow.addColorStop(0, "rgba(255, 223, 108, 0.92)");
  glow.addColorStop(0.35, "rgba(242, 152, 42, 0.28)");
  glow.addColorStop(1, "rgba(242, 152, 42, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r * 3.1, 0, Math.PI * 2);
  ctx.fill();

  const body = ctx.createRadialGradient(sun.x - sun.r * 0.3, sun.y - sun.r * 0.32, 2, sun.x, sun.y, sun.r);
  body.addColorStop(0, "#fff5a8");
  body.addColorStop(0.54, "#f7b943");
  body.addColorStop(1, "#e46b27");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
  ctx.fill();
}

function drawOrbit({ earth, orbit }) {
  ctx.save();
  ctx.strokeStyle = "rgba(139, 196, 255, 0.42)";
  ctx.lineWidth = 2 * devicePixelRatio;
  ctx.setLineDash([10 * devicePixelRatio, 9 * devicePixelRatio]);
  ctx.beginPath();
  ctx.ellipse(earth.x, earth.y, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawShadowCones({ sun, earth, moon, scale }) {
  const source = activeMode === "lunar" || activeMode === "orbit" ? earth : moon;
  const receiver = activeMode === "solar" ? earth : moon;
  const direction = normalize({ x: source.x - sun.x, y: source.y - sun.y });
  const perpendicular = { x: -direction.y, y: direction.x };
  const umbraLength = (activeMode === "solar" ? 280 : 470) * scale;
  const penumbraLength = (activeMode === "solar" ? 500 : 610) * scale;

  const base = source.r;
  const tip = { x: source.x + direction.x * umbraLength, y: source.y + direction.y * umbraLength };
  const penumbraEnd = { x: source.x + direction.x * penumbraLength, y: source.y + direction.y * penumbraLength };

  drawCone(source, perpendicular, base * 1.85, penumbraEnd, base * 4.3, "rgba(90, 109, 141, 0.24)");
  drawCone(source, perpendicular, base * 0.9, tip, 2 * scale, "rgba(4, 7, 12, 0.72)");

  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.52)";
  ctx.lineWidth = 1.5 * devicePixelRatio;
  ctx.setLineDash([7 * devicePixelRatio, 7 * devicePixelRatio]);
  ctx.beginPath();
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(receiver.x, receiver.y);
  ctx.stroke();
  ctx.restore();
}

function drawCone(source, perpendicular, startWidth, endPoint, endWidth, color) {
  ctx.beginPath();
  ctx.moveTo(source.x + perpendicular.x * startWidth, source.y + perpendicular.y * startWidth);
  ctx.lineTo(endPoint.x + perpendicular.x * endWidth, endPoint.y + perpendicular.y * endWidth);
  ctx.lineTo(endPoint.x - perpendicular.x * endWidth, endPoint.y - perpendicular.y * endWidth);
  ctx.lineTo(source.x - perpendicular.x * startWidth, source.y - perpendicular.y * startWidth);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawEarth({ earth }) {
  const gradient = ctx.createRadialGradient(earth.x - earth.r * 0.35, earth.y - earth.r * 0.4, 2, earth.x, earth.y, earth.r);
  gradient.addColorStop(0, "#a9f0ff");
  gradient.addColorStop(0.45, "#317bb7");
  gradient.addColorStop(1, "#102c57");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(earth.x, earth.y, earth.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(85, 190, 128, 0.88)";
  ctx.beginPath();
  ctx.ellipse(earth.x - earth.r * 0.18, earth.y - earth.r * 0.05, earth.r * 0.28, earth.r * 0.52, -0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(earth.x + earth.r * 0.28, earth.y + earth.r * 0.18, earth.r * 0.22, earth.r * 0.28, 0.8, 0, Math.PI * 2);
  ctx.fill();
}

function drawMoon({ moon }) {
  const gradient = ctx.createRadialGradient(moon.x - moon.r * 0.35, moon.y - moon.r * 0.4, 2, moon.x, moon.y, moon.r);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.55, "#c7cbd2");
  gradient.addColorStop(1, "#6f7580");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(moon.x, moon.y, moon.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(90, 96, 108, 0.55)";
  [[-0.32, -0.18, 0.18], [0.18, 0.16, 0.12], [0.28, -0.28, 0.09]].forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(moon.x + moon.r * x, moon.y + moon.r * y, moon.r * r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawLabels({ sun, earth, moon, scale }) {
  if (!showLabelsInput.checked) return;
  label("Sun", sun.x, sun.y + sun.r + 32 * scale);
  label("Earth", earth.x, earth.y + earth.r + 28 * scale);
  label("Moon", moon.x, moon.y - moon.r - 18 * scale);
  label("Penumbra", (earth.x + moon.x) / 2, Math.min(earth.y, moon.y) - 72 * scale, "#b8caec");
  label("Umbra", (earth.x + moon.x) / 2, Math.max(earth.y, moon.y) + 76 * scale, "#ffffff");
}

function label(text, x, y, color = "#ffffff") {
  ctx.save();
  ctx.font = `${Math.max(14, 17 * devicePixelRatio)}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 8;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function updateReadouts({ angle, moon, earth }) {
  const normalized = Math.round((phase + 360) % 360);
  const verticalMiss = Math.abs(moon.y - earth.y);
  ui.phaseReadout.textContent = `${normalized}°`;
  ui.alignmentReadout.textContent = verticalMiss < earth.r * 0.22 ? "Central" : verticalMiss < earth.r * 0.75 ? "Partial" : "Misses shadow";
}

function normalize(vector) {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return { x: vector.x / length, y: vector.y / length };
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

phaseSlider.addEventListener("input", () => {
  phase = Number(phaseSlider.value);
  if (activeMode !== "orbit") {
    activeMode = "orbit";
    modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.mode === "orbit"));
    updateText();
  }
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setMode("solar");
requestAnimationFrame(draw);
