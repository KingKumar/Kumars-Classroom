import { execFileSync } from "node:child_process";
import { copyFileSync, cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url)).replace(/\/scripts$/, "");
const cellAppDir = resolve(rootDir, "cell-architecture-studio-main");
const rootDistDir = resolve(rootDir, "dist");
const cellDistDir = resolve(cellAppDir, "dist");
const labCellDir = resolve(rootDistDir, "cell-architecture-studio");
const earthAppDir = resolve(rootDir, "layers-of-earth");
const labEarthDir = resolve(rootDistDir, "layers-of-earth");
const eclipsesAppDir = resolve(rootDir, "solar-lunar-eclipses");
const labEclipsesDir = resolve(rootDistDir, "solar-lunar-eclipses");
const periodicAppDir = resolve(rootDir, "periodic-table-lab");
const labPeriodicDir = resolve(rootDistDir, "periodic-table-lab");
const forcesAppDir = resolve(rootDir, "forces-motion-playground");
const labForcesDir = resolve(rootDistDir, "forces-motion-playground");
const bodyAppDir = resolve(rootDir, "human-body-systems-explorer");
const labBodyDir = resolve(rootDistDir, "human-body-systems-explorer");
const weatherAppDir = resolve(rootDir, "weather-atmosphere-simulator");
const labWeatherDir = resolve(rootDistDir, "weather-atmosphere-simulator");
const logoAsset = resolve(rootDir, "assets/lab-flask.svg");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

execFileSync(npmCommand, ["run", "build", "--", "--base=/cell-architecture-studio/"], {
  cwd: cellAppDir,
  stdio: "inherit",
});

rmSync(rootDistDir, { recursive: true, force: true });
mkdirSync(rootDistDir, { recursive: true });
cpSync(cellDistDir, labCellDir, { recursive: true });
cpSync(earthAppDir, labEarthDir, { recursive: true });
cpSync(eclipsesAppDir, labEclipsesDir, { recursive: true });
cpSync(periodicAppDir, labPeriodicDir, { recursive: true });
cpSync(forcesAppDir, labForcesDir, { recursive: true });
cpSync(bodyAppDir, labBodyDir, { recursive: true });
cpSync(weatherAppDir, labWeatherDir, { recursive: true });
copyFileSync(logoAsset, resolve(rootDistDir, "favicon.svg"));
copyFileSync(logoAsset, resolve(rootDistDir, "lab-logo.svg"));

writeFileSync(
  resolve(rootDistDir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kumar's Lab</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta
      name="description"
      content="A lab hub for interactive science, math, and learning apps."
    />
    <style>
      :root {
        color-scheme: light;
        --ink: #16201f;
        --muted: #5f6f6c;
        --line: rgba(22, 32, 31, 0.12);
        --paper: #fbfaf5;
        --card: #ffffff;
        --green: #387963;
        --blue: #365f9c;
        --gold: #d99c36;
        --rose: #b85265;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          linear-gradient(135deg, rgba(56, 121, 99, 0.14), transparent 34%),
          linear-gradient(225deg, rgba(54, 95, 156, 0.12), transparent 38%),
          var(--paper);
      }

      a {
        color: inherit;
      }

      .shell {
        width: min(1120px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 44px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 14px 0 28px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 800;
        letter-spacing: 0;
      }

      .mark {
        display: grid;
        width: 46px;
        height: 46px;
        place-items: center;
      }

      .mark img {
        width: 46px;
        height: 46px;
        display: block;
        filter: drop-shadow(0 12px 24px rgba(24, 36, 34, 0.12));
      }

      .pill {
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.74);
        color: var(--muted);
        font-size: 0.92rem;
        font-weight: 700;
        padding: 9px 13px;
      }

      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 360px;
        align-items: end;
        gap: 28px;
        padding: 46px 0 28px;
      }

      h1 {
        max-width: 760px;
        margin: 0;
        font-size: clamp(3rem, 8vw, 6.7rem);
        line-height: 0.92;
        letter-spacing: 0;
      }

      .lede {
        max-width: 660px;
        margin: 22px 0 0;
        color: var(--muted);
        font-size: clamp(1.05rem, 2vw, 1.34rem);
        line-height: 1.55;
      }

      .notice {
        border-left: 4px solid var(--gold);
        padding: 2px 0 2px 16px;
        color: #695234;
        font-size: 0.96rem;
        line-height: 1.5;
      }

      .apps-header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 18px;
        margin-top: 38px;
        border-top: 1px solid var(--line);
        padding-top: 30px;
      }

      h2 {
        margin: 0;
        font-size: clamp(1.6rem, 3vw, 2.25rem);
        letter-spacing: 0;
      }

      .apps-header p {
        max-width: 430px;
        margin: 0;
        color: var(--muted);
        line-height: 1.5;
      }

      .app-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
        margin-top: 20px;
      }

      .app-card {
        position: relative;
        min-height: 360px;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--card);
        box-shadow: 0 22px 56px rgba(24, 36, 34, 0.1);
        text-decoration: none;
        transition:
          transform 180ms ease,
          box-shadow 180ms ease,
          border-color 180ms ease;
      }

      .app-card:hover {
        transform: translateY(-4px);
        border-color: rgba(56, 121, 99, 0.34);
        box-shadow: 0 28px 70px rgba(24, 36, 34, 0.16);
      }

      .app-card img {
        width: 100%;
        height: 210px;
        object-fit: cover;
        display: block;
        background: #dfeae5;
      }

      .app-visual {
        position: relative;
        height: 210px;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 50%, #f6d25b 0 11%, #f0a531 12% 26%, #9a3034 27% 46%, #d15f2f 47% 66%, #8d6a38 67% 78%, #245e8a 79% 100%);
      }

      .app-visual::before {
        content: "";
        position: absolute;
        inset: 20px;
        border-radius: 50%;
        background:
          linear-gradient(90deg, transparent 48%, rgba(255, 255, 255, 0.62) 48% 51%, transparent 51%),
          radial-gradient(circle at 50% 50%, transparent 0 12%, rgba(255, 255, 255, 0.28) 12% 13%, transparent 13% 27%, rgba(255, 255, 255, 0.24) 27% 28%, transparent 28% 48%, rgba(255, 255, 255, 0.22) 48% 49%, transparent 49%);
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.36);
      }

      .app-visual::after {
        content: "";
        position: absolute;
        right: 28px;
        bottom: 22px;
        width: 112px;
        height: 42px;
        border-radius: 8px;
        background: rgba(17, 24, 25, 0.78);
      }

      .eclipse-visual {
        position: relative;
        height: 210px;
        overflow: hidden;
        background:
          radial-gradient(circle at 18% 50%, #fff4a8 0 10%, #f5b84b 11% 18%, rgba(245, 184, 75, 0.2) 19% 35%, transparent 36%),
          linear-gradient(135deg, #08111f, #111b30 58%, #05070d);
      }

      .eclipse-visual::before {
        content: "";
        position: absolute;
        left: 26%;
        top: 26%;
        width: 62%;
        height: 48%;
        clip-path: polygon(0 38%, 100% 8%, 100% 92%, 0 62%);
        background: rgba(77, 90, 122, 0.42);
      }

      .eclipse-visual::after {
        content: "";
        position: absolute;
        right: 20%;
        top: 50%;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 36% 32%, #b9f0ff 0 18%, #327fbd 19% 58%, #102c57 59%);
        transform: translateY(-50%);
        box-shadow:
          -118px 0 0 -46px #cfd3dc,
          0 0 0 1px rgba(255, 255, 255, 0.24);
      }

      .periodic-visual,
      .forces-visual,
      .body-visual,
      .weather-visual {
        position: relative;
        height: 210px;
        overflow: hidden;
      }

      .periodic-visual {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 6px;
        padding: 22px;
        background: linear-gradient(135deg, #e8f5ef, #dce8f8);
      }

      .periodic-visual span {
        border-radius: 6px;
        background: #ffffff;
        box-shadow: inset 0 0 0 1px rgba(22, 32, 31, 0.12);
      }

      .periodic-visual span:nth-child(3n) { background: #e0f4ee; }
      .periodic-visual span:nth-child(4n) { background: #e6edf8; }
      .periodic-visual span:nth-child(5n) { background: #fff0d9; }

      .forces-visual {
        background: linear-gradient(180deg, #dfeff7 0 68%, #6f9964 69%);
      }

      .forces-visual::before {
        content: "";
        position: absolute;
        left: 24%;
        bottom: 28%;
        width: 86px;
        height: 58px;
        border-radius: 8px;
        background: #326fd1;
        box-shadow: 92px -42px 0 -34px #258f5d;
      }

      .forces-visual::after {
        content: "";
        position: absolute;
        left: 41%;
        bottom: 45%;
        width: 130px;
        height: 5px;
        background: #245bd0;
        transform: rotate(-18deg);
        box-shadow: -68px 48px 0 #c04444;
      }

      .body-visual {
        background: linear-gradient(180deg, #fff4f2, #eadfe1);
      }

      .body-visual::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 20px;
        width: 150px;
        height: 170px;
        border-radius: 70px 70px 42px 42px;
        background:
          radial-gradient(circle at 50% 28%, #6f63c7 0 18%, transparent 19%),
          radial-gradient(circle at 50% 58%, #c83e55 0 13%, transparent 14%),
          radial-gradient(ellipse at 42% 58%, #2f8ca8 0 18%, transparent 19%),
          radial-gradient(ellipse at 58% 58%, #2f8ca8 0 18%, transparent 19%),
          #ead5d3;
        transform: translateX(-50%);
        box-shadow: inset 0 0 0 3px rgba(73, 54, 55, 0.28);
      }

      .weather-visual {
        background: linear-gradient(180deg, #77c7f2 0 58%, #6da064 59%);
      }

      .weather-visual::before {
        content: "";
        position: absolute;
        left: 20%;
        top: 26%;
        width: 190px;
        height: 72px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.88);
        box-shadow:
          54px 14px 0 -8px rgba(255, 255, 255, 0.78),
          160px 24px 0 -22px rgba(76, 92, 105, 0.64);
      }

      .weather-visual::after {
        content: "";
        position: absolute;
        left: 42%;
        top: 58%;
        width: 90px;
        height: 4px;
        background: #416996;
        transform: rotate(105deg);
        box-shadow: 24px 0 0 #416996, 48px 0 0 #416996;
      }

      .app-copy {
        padding: 20px;
      }

      .subject {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        border: 1px solid rgba(56, 121, 99, 0.22);
        border-radius: 999px;
        color: var(--green);
        background: rgba(56, 121, 99, 0.08);
        font-size: 0.78rem;
        font-weight: 800;
        padding: 5px 9px;
        text-transform: uppercase;
      }

      .app-copy h3 {
        margin: 14px 0 8px;
        font-size: 1.42rem;
        letter-spacing: 0;
      }

      .app-copy p {
        margin: 0;
        color: var(--muted);
        line-height: 1.5;
      }

      .launch {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 18px;
        color: var(--blue);
        font-weight: 800;
      }

      .empty-card {
        display: grid;
        min-height: 360px;
        place-items: center;
        border: 1px dashed rgba(22, 32, 31, 0.24);
        border-radius: 8px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.46);
        text-align: center;
        padding: 24px;
      }

      .empty-card strong {
        display: block;
        margin-bottom: 8px;
        color: var(--ink);
        font-size: 1.1rem;
      }

      @media (max-width: 860px) {
        .hero,
        .app-grid {
          grid-template-columns: 1fr;
        }

        .notice {
          max-width: 620px;
        }

        .apps-header {
          align-items: start;
          flex-direction: column;
        }
      }

      @media (max-width: 560px) {
        .shell {
          width: min(100% - 24px, 1120px);
          padding-top: 18px;
        }

        .topbar {
          align-items: start;
          flex-direction: column;
        }

        .hero {
          padding-top: 28px;
        }

        .app-card,
        .empty-card {
          min-height: 320px;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar" aria-label="Kumar's Lab">
        <div class="brand">
          <div class="mark" aria-hidden="true"><img src="/lab-logo.svg" alt="" /></div>
          <span>Kumar's Lab</span>
        </div>
        <div class="pill">Interactive learning apps</div>
      </header>

      <section class="hero">
        <div>
          <h1>Pick a lab. Start exploring.</h1>
          <p class="lede">
            A growing collection of lab-ready apps for science, math, and whatever gets built next.
          </p>
        </div>
        <p class="notice">
          This hub is set up for expansion: each app can live in its own folder and appear here as a launch card.
        </p>
      </section>

      <section aria-labelledby="apps-title">
        <div class="apps-header">
          <div>
            <h2 id="apps-title">Apps</h2>
          </div>
          <p>Start with the cell studio. More subjects can plug into the same homepage as Kumar's Lab grows.</p>
        </div>

        <div class="app-grid">
          <a class="app-card" href="/cell-architecture-studio/" aria-label="Open Cell Architecture Studio">
            <img src="/cell-architecture-studio/cell-renders/plant.png" alt="" />
            <div class="app-copy">
              <span class="subject">Biology</span>
              <h3>Cell Architecture Studio</h3>
              <p>Inspect 3D cell models, compare specimens, and study organelles in a visual lab workspace.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>

          <a class="app-card" href="/layers-of-earth/" aria-label="Open Layers of Earth">
            <div class="app-visual" aria-hidden="true"></div>
            <div class="app-copy">
              <span class="subject">Earth Science</span>
              <h3>Layers of Earth</h3>
              <p>Explore the crust, mantle, and core with thickness, composition, minerals, rocks, and evidence.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>

          <a class="app-card" href="/solar-lunar-eclipses/" aria-label="Open Solar and Lunar Eclipses">
            <div class="eclipse-visual" aria-hidden="true"></div>
            <div class="app-copy">
              <span class="subject">Astronomy</span>
              <h3>Solar and Lunar Eclipses</h3>
              <p>Observe orbit motion, umbra and penumbra shadows, and why alignment matters.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>

          <a class="app-card" href="/periodic-table-lab/" aria-label="Open Periodic Table Lab">
            <div class="periodic-visual" aria-hidden="true">${Array.from({ length: 40 }, () => "<span></span>").join("")}</div>
            <div class="app-copy">
              <span class="subject">Chemistry</span>
              <h3>Periodic Table Lab</h3>
              <p>Filter elements, inspect electron shells, and connect atomic structure to uses and ions.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>

          <a class="app-card" href="/forces-motion-playground/" aria-label="Open Forces and Motion Playground">
            <div class="forces-visual" aria-hidden="true"></div>
            <div class="app-copy">
              <span class="subject">Physics</span>
              <h3>Forces & Motion Playground</h3>
              <p>Adjust mass, force, angle, friction, and gravity while vectors and motion respond live.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>

          <a class="app-card" href="/human-body-systems-explorer/" aria-label="Open Human Body Systems Explorer">
            <div class="body-visual" aria-hidden="true"></div>
            <div class="app-copy">
              <span class="subject">Life Science</span>
              <h3>Human Body Systems Explorer</h3>
              <p>Switch body systems and study their organs, tissues, jobs, and connections.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>

          <a class="app-card" href="/weather-atmosphere-simulator/" aria-label="Open Weather and Atmosphere Simulator">
            <div class="weather-visual" aria-hidden="true"></div>
            <div class="app-copy">
              <span class="subject">Earth Science</span>
              <h3>Weather & Atmosphere Simulator</h3>
              <p>Change humidity, pressure, temperature, and wind to form clouds, rain, and storms.</p>
              <span class="launch">Launch app <span aria-hidden="true">-></span></span>
            </div>
          </a>
        </div>
      </section>
    </main>
  </body>
</html>
`,
);
