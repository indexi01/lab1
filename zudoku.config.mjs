/** @type {import('zudoku').ZudokuConfig} */
const config = {
	

  basePath: "/lab1",

  topNavigation: [
    { id: "docs", label: "Documentation" },
    { id: "api", label: "API Reference" },
  ],
  sidebar: {
    docs: [
      {
        type: "category",
        label: "Overview",
        items: ["docs/introduction", "docs/example"],
      },
      {
        type: "category",
        label: "Installation",
        items: ["docs/installation", "docs/requirements"],
      },
      {
        type: "category",
        label: "Authorization",
        items: ["docs/authorization", "docs/oauth"],
      },
      {
        type: "category",
        label: "Advanced Topics",
        items: ["docs/advanced-usage", "docs/performance-tuning"],
      },
    ],
  },
  redirects: [{ from: "/", to: "/docs/introduction" }],
  apis: {
    type: "file",
    input: "./apis/medical_api.yaml",
    navigationId: "api",
  },
  docs: {
    files: "/pages/**/*.{md,mdx}",
  },
};

export default config;