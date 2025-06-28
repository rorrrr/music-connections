import { build } from "esbuild";
import { mkdirSync, copyFileSync } from "fs";

// Create dist directory
mkdirSync("dist", { recursive: true });

// Copy HTML file
copyFileSync("src/index.html", "dist/index.html");

// Copy CSS file
copyFileSync("src/index.css", "dist/index.css");

// Copy assets
const assets = ["logo.jpeg", "logo.svg", "react.svg", "triangle.png"];
assets.forEach((asset) => {
  try {
    copyFileSync(`src/${asset}`, `dist/${asset}`);
  } catch (e) {
    console.log(`${asset} not found, skipping...`);
  }
});

// Build the JavaScript bundle
await build({
  entryPoints: ["src/frontend.tsx"],
  bundle: true,
  outfile: "dist/bundle.js",
  format: "esm",
  target: "es2020",
  minify: true,
  sourcemap: true,
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  loader: {
    ".tsx": "tsx",
    ".ts": "ts",
    ".jsx": "jsx",
    ".js": "js",
  },
});

console.log("Build completed successfully!");
