const canvas = document.querySelector("#weatherCanvas");
const ctx = canvas.getContext("2d");
const params = { temp: 26, humidity: 62, pressure: 1008, wind: 18 };
const controls = [
  ["temp", "Surface Temperature", -15, 42, 1, "C"],
  ["humidity", "Humidity", 0, 100, 1, "%"],
  ["pressure", "Air Pressure", 970, 1040, 1, "hPa"],
  ["wind", "Wind Speed", 0, 80, 1, "km/h"],
];
const presets = {
  clear: { temp: 24, humidity: 32, pressure: 1022, wind: 8 },
  storm: { temp: 31, humidity: 88, pressure: 988, wind: 52 },
  front: { temp: 12, humidity: 70, pressure: 1001, wind: 36 },
};
let time = 0;
document.querySelector("#controls").innerHTML = controls.map(([id,label,min,max,step,unit]) => `<label><div class="row"><span>${label}</span><b id="${id}Value">${params[id]} ${unit}</b></div><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${params[id]}"></label>`).join("");
controls.forEach(([id,,,,,unit]) => document.querySelector(`#${id}`).addEventListener("input", (event) => { params[id] = Number(event.target.value); document.querySelector(`#${id}Value`).textContent = `${params[id]} ${unit}`; }));
document.querySelector(".preset-row").addEventListener("click", (event) => {
  const button = event.target.closest("button"); if (!button) return;
  Object.assign(params, presets[button.dataset.preset]);
  controls.forEach(([id,,,,,unit]) => { document.querySelector(`#${id}`).value = params[id]; document.querySelector(`#${id}Value`).textContent = `${params[id]} ${unit}`; });
});
document.querySelector("#layerList").innerHTML = [
  ["Troposphere","0-12 km: weather, clouds, storms"],
  ["Stratosphere","12-50 km: ozone layer, stable air"],
  ["Mesosphere","50-85 km: meteors burn up"],
  ["Thermosphere","85+ km: auroras, very thin air"],
].map(([a,b]) => `<div class="layer"><strong>${a}</strong><span>${b}</span></div>`).join("");
function resize(){const rect=canvas.getBoundingClientRect();canvas.width=Math.max(820,rect.width*devicePixelRatio);canvas.height=Math.max(460,rect.height*devicePixelRatio)} window.addEventListener("resize",resize); resize();
function draw(now){time=now/1000; const w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h); sky(w,h); layers(w,h); ground(w,h); clouds(w,h); rain(w,h); wind(w,h); readouts(); requestAnimationFrame(draw)}
function sky(w,h){const g=ctx.createLinearGradient(0,0,0,h); const storm=storminess(); g.addColorStop(0, storm>.55?"#4c6678":"#77c7f2"); g.addColorStop(.55, storm>.55?"#8a98a0":"#cdeefa"); g.addColorStop(1,"#eef6ed"); ctx.fillStyle=g; ctx.fillRect(0,0,w,h)}
function layers(w,h){const names=[["Thermosphere",.06],["Mesosphere",.18],["Stratosphere",.34],["Troposphere",.63]]; ctx.font=`${13*devicePixelRatio}px Inter,sans-serif`; names.forEach(([name,y],i)=>{ctx.fillStyle=`rgba(255,255,255,${.08+i*.035})`;ctx.fillRect(0,h*y,w,h*.11);ctx.fillStyle="rgba(18,32,39,.55)";ctx.fillText(name,18*devicePixelRatio,h*y+28*devicePixelRatio)})}
function ground(w,h){ctx.fillStyle="#5e8f59";ctx.fillRect(0,h*.82,w,h*.18);ctx.fillStyle="#416f45";for(let x=0;x<w;x+=44*devicePixelRatio){ctx.beginPath();ctx.moveTo(x,h*.82);ctx.lineTo(x+22*devicePixelRatio,h*.76);ctx.lineTo(x+44*devicePixelRatio,h*.82);ctx.fill()}}
function clouds(w,h){const amount=params.humidity/100; const base=h*(.76-amount*.34); for(let i=0;i<9;i++){const x=((i*173+time*params.wind*5)% (w+220))-110; const y=base+(i%3)*34*devicePixelRatio; drawCloud(x,y,70*devicePixelRatio*(.7+amount),amount)}}
function drawCloud(x,y,r,a){ctx.fillStyle=`rgba(255,255,255,${.48+a*.42})`; if(storminess()>.55) ctx.fillStyle=`rgba(68,78,88,${.44+a*.44})`; [[0,0,.55],[.45,-.12,.42],[-.38,.04,.36],[.12,-.28,.46]].forEach(([dx,dy,s])=>{ctx.beginPath();ctx.arc(x+dx*r,y+dy*r,r*s,0,Math.PI*2);ctx.fill()})}
function rain(w,h){const s=storminess(); if(s<.38)return; ctx.strokeStyle=s>.7?"rgba(65,105,150,.72)":"rgba(65,105,150,.42)"; ctx.lineWidth=2*devicePixelRatio; for(let i=0;i<80*s;i++){const x=(i*79+time*params.wind*38)%w; const y=(i*47+time*260)% (h*.55)+h*.28; ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-8*devicePixelRatio,y+20*devicePixelRatio);ctx.stroke()} if(s>.82){ctx.strokeStyle="rgba(255,235,125,.9)"; for(let i=0;i<3;i++){const x=((i*313+Math.floor(time*2)*97)%w);ctx.beginPath();ctx.moveTo(x,h*.28);ctx.lineTo(x+22,h*.38);ctx.lineTo(x+2,h*.38);ctx.lineTo(x+28,h*.52);ctx.stroke()}}}
function wind(w,h){ctx.strokeStyle="rgba(255,255,255,.65)";ctx.lineWidth=2*devicePixelRatio;for(let i=0;i<8;i++){const y=h*(.2+i*.07);const x=(time*params.wind*12+i*140)%(w+180)-120;ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+60,y-16,x+90,y+16,x+150,y);ctx.stroke()}}
function storminess(){return Math.max(0, Math.min(1, (params.humidity-45)/55 + (1008-params.pressure)/55 + params.wind/180))}
function readouts(){const cloudBase=Math.max(.4,2.6-(params.humidity/100)*2+(params.temp<0?.6:0));const s=storminess();document.querySelector("#cloudReadout").textContent=`${cloudBase.toFixed(1)} km`;document.querySelector("#weatherReadout").textContent=s>.78?"Thunderstorm":s>.5?"Rain likely":params.humidity>55?"Cloudy":"Fair";document.querySelector("#pressureReadout").textContent=params.pressure<1000?"Falling / low":params.pressure>1018?"High / stable":"Variable";document.querySelector("#windReadout").textContent=params.wind<15?"Light breeze":params.wind<45?"Breezy":"Strong wind"}
requestAnimationFrame(draw);
