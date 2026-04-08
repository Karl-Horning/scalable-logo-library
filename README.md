# Scalable Logo Library

A library of SVG logos covering web development tools, learning management systems, and UK higher education institutions. Maintained for personal use across portfolio and development projects, and open to anyone in the edtech space who needs the same assets.

All assets are SVG-only for resolution-independent rendering and easy CSS styling. The package ships `logos.json` — a machine-readable index — so consuming projects can query available logos without hardcoding paths.

## Project structure

```text
development/       # Developer tools and frameworks
educational-tools/ # Learning technology tools
lms/               # Learning Management Systems
sites/             # Web platforms and social logos
software/          # Productivity and design software
universities/      # University and higher education branding
```

## Installation

**Via npm (from GitHub):**

```bash
npm install github:Karl-Horning/scalable-logo-library
```

**As a Git submodule:**

```bash
git submodule add https://github.com/Karl-Horning/scalable-logo-library.git assets/logos
```

## Usage

### Bundler (Vite, webpack)

```js
import reactLogo from "@karl-horning/scalable-logo-library/development/react.svg";
```

Note: bundlers require SVG import support. Vite handles this out of the box; for webpack, configure `asset/resource` or use `@svgr/webpack`.

### CSS

```css
.react-icon {
    background-image: url("node_modules/@karl-horning/scalable-logo-library/development/react.svg");
}
```

### HTML (submodule)

```html
<img src="assets/logos/development/react.svg" alt="React logo" />
```

## Manifest

`logos.json` indexes every logo with a display name, category, and relative path:

```json
[
    {
        "name": "React",
        "category": "development",
        "path": "development/react.svg"
    }
]
```

Import it to build logo pickers, documentation pages, or any UI that needs to list available assets:

```js
import logos from "@karl-horning/scalable-logo-library/logos.json";

const devLogos = logos.filter((logo) => logo.category === "development");
```

## Contributing

To add a logo:

1. Place the `.svg` file in the appropriate category directory.
2. Regenerate the manifest:

   ```bash
   npm run build:manifest
   ```

3. If the filename does not title-case correctly, add a display name override to `NAME_OVERRIDES` in `scripts/generate-manifest.js`.
4. Commit both the new file and the updated `logos.json`.

## Disclaimer

All third-party logos are the property of their respective owners. This repository is maintained for personal and educational use only.

If you represent a brand and would like an asset removed or updated, please [open an issue](https://github.com/Karl-Horning/scalable-logo-library/issues).

## Licence

MIT © 2025 [Karl Horning](https://github.com/Karl-Horning)
