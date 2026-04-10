/**
 * @fileoverview Generates logos.json — a manifest of all SVG assets in the
 * library. Run via `npm run build:manifest` after adding or removing logos.
 *
 * Output format:
 * ```json
 * [
 *   { "name": "React", "category": "development", "path": "development/react.svg" }
 * ]
 * ```
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the repository root. */
const ROOT = path.resolve(__dirname, "..");

/**
 * Ordered list of logo categories. Each corresponds to a top-level directory
 * in the repository. Add new categories here when new directories are created.
 *
 * @type {string[]}
 */
const CATEGORIES = [
    "development",
    "educational-tools",
    "lms",
    "sites",
    "software",
    "universities",
];

/**
 * Display name overrides for filenames that do not title-case correctly.
 *
 * Keys are SVG filename stems (without extension). Values are the preferred
 * human-readable display names. Entries without an override fall back to
 * `toTitleCase`.
 *
 * @type {Record<string, string>}
 */
const NAME_OVERRIDES = {
    "affinity-designer-2": "Affinity Designer 2",
    blackboard: "Blackboard",
    "blackboard-learn": "Blackboard Learn",
    bootstrap: "Bootstrap",
    brightspace: "Brightspace",
    cambridge: "Cambridge",
    canvas: "Canvas",
    "city-st-georges": "City, St George's",
    codepen: "CodePen",
    css3: "CSS3",
    docker: "Docker",
    electron: "Electron",
    ellucian: "Ellucian",
    git: "Git",
    github: "GitHub",
    "github-mark": "GitHub (Mark)",
    "github-mark-white": "GitHub (Mark, White)",
    "github-white": "GitHub (White)",
    graphql: "GraphQL",
    html5: "HTML5",
    "imperial-college-london": "Imperial College London",
    javascript: "JavaScript",
    "kingston-university": "Kingston University",
    markdown: "Markdown",
    mongodb: "MongoDB",
    moodle: "Moodle",
    nextjs: "Next.js",
    nodejs: "Node.js",
    npm: "npm",
    postgresql: "PostgreSQL",
    postman: "Postman",
    prettier: "Prettier",
    react: "React",
    "sits-vision": "SITS Vision",
    tailwindcss: "Tailwind CSS",
    "tailwindcss-mark": "Tailwind CSS (Mark)",
    turnitin: "Turnitin",
    typescript: "TypeScript",
    "university-of-roehampton": "University of Roehampton",
    "visual-studio-code": "Visual Studio Code",
    vite: "Vite",
};

/**
 * Converts a hyphen-separated string to title case.
 *
 * @example
 * toTitleCase("visual-studio-code"); // "Visual Studio Code"
 *
 * @param {string} str A hyphen-separated string.
 * @return {string} The title-cased result.
 */
function toTitleCase(str) {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Returns the display name for an SVG filename stem. Checks `NAME_OVERRIDES`
 * first, then falls back to `toTitleCase`.
 *
 * @param {string} stem The SVG filename without its extension (e.g. `"react"`).
 * @return {string} The human-readable display name (e.g. `"React"`).
 */
function getName(stem) {
    return NAME_OVERRIDES[stem] || toTitleCase(stem);
}

/**
 * @typedef {Object} LogoEntry
 * @property {string} name     Human-readable display name.
 * @property {string} category The category directory the logo belongs to.
 * @property {string} path     Relative path from the package root to the SVG.
 */

/** @type {LogoEntry[]} */
const logos = [];

for (const category of CATEGORIES) {
    const dir = path.join(ROOT, category);
    if (!fs.existsSync(dir)) continue;

    const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".svg"))
        .sort();

    for (const file of files) {
        const stem = path.basename(file, ".svg");
        logos.push({
            name: getName(stem),
            category,
            path: `${category}/${file}`,
        });
    }
}

const output = path.join(ROOT, "logos.json");
fs.writeFileSync(output, JSON.stringify(logos, null, 4));
console.log(`Generated logos.json with ${logos.length} entries`);
