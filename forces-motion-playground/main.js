const canvas = document.querySelector("#motionCanvas");
const ctx = canvas.getContext("2d");
const controls = [
  ["mass", "Mass", 1, 20, 0.5, 5, "kg"],
  ["force", "Applied Force", 0, 120, 1, 48, "N"],
  ["angle", "Force Angle", 0, 60, 1, 12, "deg"],
  ["friction", "Friction Coefficient", 0, 0.8, 0.01, 0.18, ""],
  ["gravity", "Gravity", 1, 20, 0.1, 9.8, "m/s2"],
];
const values = Object.fromEntries(controls.map(([id,,,,, value]) => [id, value]));
let running = false;
let state = { x: 70, y: 0, vx: 0, vy: 0 };
let last = performance.now();

document.querySelector("#controls").innerHTML = controls.map(([id,label,min,max,step,value,unit]) => `
  <label><div class="control-row"><span>${label}</span><b id="${id}Value">${value} ${unit}</b></div>
  <input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>
`).join("");

controls.forEach(([id,,,,,,unit]) => {
  document.querySelector(`#${id}`).addEventListener("input", (event) => {
    values[id] = Number(event.target.value);
    document.querySelector(`#${id}Value`).textContent = `${values[id]} ${unit}`;
  });
});
document.querySelector("#launchButton").addEventListener("click", () => { running = !running; document.querySelector("#launchButton").textContent = running ? "Pause" : "Launch"; });
document.querySelector("#resetButton").addEventListener("click", reset);

function reset() { running = false; state = { x: 70, y: 0, vx: 0, vy: 0 }; document.querySelector("#launchButton").textContent = "Launch"; }
function resize() { const rect = canvas.getBoundingClientRect(); canvas.width = Math.max(800, rect.width * devicePixelRatio); canvas.height = Math.max(420, rect.height * devicePixelRatio); }
window.addEventListener("resize", resize); resize();

function tick(now) {
  const dt = Math.min(0.04, (now - last) / 1000); last = now;
  const floor = canvas.height * 0.72;
  const pixels = canvas.width / 26;
  const angle = values.angle * Math.PI / 180;
  const fx = values.force * Math.cos(angle);
  const fy = -values.force * Math.sin(angle);
  const normal = values.mass * values.gravity;
  const friction = Math.min(Math.abs(fx), values.friction * normal) * Math.sign(state.vx || fx || 1);
  const ax = (fx - friction) / values.mass;
  const ay = running ? (values.gravity + fy / values.mass) : 0;
  if (running) {
    state.vx += ax * dt;
    state.vy += ay * dt;
    state.x += state.vx * pixels * dt;
    state.y += state.vy * pixels * dt;
    if (floor - state.y < floor - 90) state.y = 90;
    if (state.x > canvas.width - 90) state.x = 70;
  }
  draw({ floor, ax, fx, friction });
  update({ ax, fx, friction });
  requestAnimationFrame(tick);
}

function draw({ floor, ax, fx, friction }) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#dbe8ef"; ctx.fillRect(0,floor,canvas.width,canvas.height-floor);
  ctx.strokeStyle = "#9aaab3"; ctx.lineWidth = 2 * devicePixelRatio;
  for (let x = 0; x < canvas.width; x += 48 * devicePixelRatio) { ctx.beginPath(); ctx.moveTo(x,floor); ctx.lineTo(x+24*devicePixelRatio,floor+24*devicePixelRatio); ctx.stroke(); }
  const block = { x: state.x, y: floor - 70 - state.y, w: 88, h: 60 };
  ctx.fillStyle = "#326fd1"; ctx.fillRect(block.x, block.y, block.w, block.h);
  ctx.fillStyle = "rgba(255,255,255,.22)"; ctx.fillRect(block.x+10, block.y+10, block.w-20, 12);
  arrow(block.x+block.w/2, block.y+block.h/2, fx*1.7, -values.force*Math.sin(values.angle*Math.PI/180)*1.7, "#245bd0", "Force");
  arrow(block.x+block.w/2, block.y+block.h+8, -friction*2.4, 0, "#c04444", "Friction");
  arrow(block.x+block.w/2, block.y-8, state.vx*10, -state.vy*10, "#258f5d", "Velocity");
}
function arrow(x,y,dx,dy,color,label){ ctx.save(); ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=4*devicePixelRatio; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+dx,y+dy); ctx.stroke(); const a=Math.atan2(dy,dx); ctx.beginPath(); ctx.moveTo(x+dx,y+dy); ctx.lineTo(x+dx-Math.cos(a-.45)*14,y+dy-Math.sin(a-.45)*14); ctx.lineTo(x+dx-Math.cos(a+.45)*14,y+dy-Math.sin(a+.45)*14); ctx.closePath(); ctx.fill(); ctx.font=`${14*devicePixelRatio}px Inter, sans-serif`; ctx.fillText(label,x+dx+8,y+dy-8); ctx.restore(); }
function update({ ax }) {
  const v = Math.hypot(state.vx,state.vy);
  document.querySelector("#accelReadout").textContent = `${ax.toFixed(2)} m/s2`;
  document.querySelector("#velocityReadout").textContent = `${v.toFixed(2)} m/s`;
  document.querySelector("#momentumReadout").textContent = `${(values.mass*v).toFixed(1)} kg m/s`;
  document.querySelector("#energyReadout").textContent = `${(0.5*values.mass*v*v).toFixed(1)} J`;
}
requestAnimationFrame(tick);
