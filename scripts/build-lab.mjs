import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url)).replace(/\/scripts$/, "");
const cellAppDir = resolve(rootDir, "cell-architecture-studio-main");
const rootDistDir = resolve(rootDir, "dist");
const cellDistDir = resolve(cellAppDir, "dist");
const labCellDir = resolve(rootDistDir, "cell-architecture-studio");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

execFileSync(npmCommand, ["run", "build", "--", "--base=/cell-architecture-studio/"], {
  cwd: cellAppDir,
  stdio: "inherit",
});

rmSync(rootDistDir, { recursive: true, force: true });
mkdirSync(rootDistDir, { recursive: true });
cpSync(cellDistDir, labCellDir, { recursive: true });

writeFileSync(
  resolve(rootDistDir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kumar's Lab</title>
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
        width: 42px;
        height: 42px;
        place-items: center;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--card);
        box-shadow: 0 14px 34px rgba(24, 36, 34, 0.08);
      }

      .mark span {
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 6px;
        background:
          linear-gradient(90deg, transparent 45%, rgba(255, 255, 255, 0.72) 45% 56%, transparent 56%),
          linear-gradient(0deg, transparent 45%, rgba(255, 255, 255, 0.72) 45% 56%, transparent 56%),
          linear-gradient(135deg, var(--green), var(--blue));
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
          <div class="mark" aria-hidden="true"><span></span></div>
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

          <div class="empty-card">
            <div>
              <strong>Next app slot</strong>
              Add another app folder and card when the next lab tool is ready.
            </div>
          </div>

          <div class="empty-card">
            <div>
              <strong>Future collection</strong>
              Build this into a menu for labs, practice tools, demos, and projects.
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
`,
);
