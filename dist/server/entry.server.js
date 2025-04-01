var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
import { jsx } from "react/jsx-runtime";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import "loglevel";
import { Transform } from "node:stream";
import { renderToPipeableStream, renderToStaticMarkup } from "react-dom/server";
import { createStaticHandler, isRouteErrorResponse, createStaticRouter } from "react-router";
import { RouterError, RouteGuard, Zudoku, Layout, StatusPage, ServerError, BootstrapStatic } from "zudoku/components";
import { openApiPlugin } from "zudoku/plugins/openapi";
import { markdownPlugin } from "zudoku/plugins/markdown";
import { redirectPlugin } from "zudoku/plugins/redirect";
import "zudoku/icons";
const NO_DEHYDRATE = "no-dehydrate";
const config = {
  apis: {
    type: "file",
    input: "./apis/medical_api.yaml",
    navigationId: "api"
  }
};
const configuredApiPlugins = [];
const configuredApiCatalogPlugins = [];
const apis = Array.isArray(config.apis) ? config.apis : [config.apis];
configuredApiPlugins.push(openApiPlugin({
  type: "file",
  input: { "1.0.0": "./apis/medical_api.yaml" },
  navigationId: "api",
  tagPages: [],
  options: {
    examplesLanguage: ((_b = (_a = config.defaults) == null ? void 0 : _a.apis) == null ? void 0 : _b.examplesLanguage) ?? ((_c = config.defaults) == null ? void 0 : _c.examplesLanguage),
    disablePlayground: (_e = (_d = config.defaults) == null ? void 0 : _d.apis) == null ? void 0 : _e.disablePlayground,
    showVersionSelect: ((_g = (_f = config.defaults) == null ? void 0 : _f.apis) == null ? void 0 : _g.showVersionSelect) ?? "if-available",
    expandAllTags: ((_i = (_h = config.defaults) == null ? void 0 : _h.apis) == null ? void 0 : _i.expandAllTags) ?? true,
    transformExamples: (_k = (_j = config.defaults) == null ? void 0 : _j.apis) == null ? void 0 : _k.transformExamples,
    ...apis[0].options ?? {}
  },
  schemaImports: {
    "./apis/medical_api.yaml": () => import("./assets/medical_api.yaml-DEFSc_O8.js")
  }
}));
const configuredAuthProvider = void 0;
const docsPluginOptions = [];
const fileImports0 = Object.assign({
  "/pages/docs/introduction.mdx": () => import("./assets/introduction-IOkbK55C.js"),
  "/pages/docs/example.mdx": () => import("./assets/example-CZMvLsJy.js")
});
docsPluginOptions.push({
  fileImports: fileImports0,
  defaultOptions: void 0,
  files: "/pages/**/*.{md,mdx}"
});
const configuredDocsPlugins = [markdownPlugin(docsPluginOptions)];
const redirects = [
  {
    "from": "/",
    "to": "/docs/introduction"
  }
];
const configuredRedirectPlugin = redirectPlugin({ redirects });
const configuredSidebar = { "docs": [{ "type": "category", "label": "Overview", "items": [{ "type": "doc", "id": "docs/introduction", "label": "Welcome to Zudoku", "categoryLabel": "Overview" }, { "type": "doc", "id": "docs/example", "label": "Example page", "categoryLabel": "Overview" }] }] };
const isNavigationPlugin = (obj) => "getRoutes" in obj && typeof obj.getRoutes === "function";
const convertZudokuConfigToOptions = (config2) => {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l, _m, _n, _o, _p;
  const fallbackLogoLight = ((_a2 = config2.page) == null ? void 0 : _a2.logoUrl) ?? "https://cdn.zudoku.dev/logos/zudoku-logo-full-light.svg";
  const fallbackLogoDark = ((_b2 = config2.page) == null ? void 0 : _b2.logoUrl) ?? "https://cdn.zudoku.dev/logos/zudoku-logo-full-dark.svg";
  const isUsingFallback = !((_c2 = config2.page) == null ? void 0 : _c2.logoUrl) && !((_f2 = (_e2 = (_d2 = config2.page) == null ? void 0 : _d2.logo) == null ? void 0 : _e2.src) == null ? void 0 : _f2.light) && !((_i2 = (_h2 = (_g2 = config2.page) == null ? void 0 : _g2.logo) == null ? void 0 : _h2.src) == null ? void 0 : _i2.dark);
  return {
    basePath: config2.basePath,
    canonicalUrlOrigin: config2.canonicalUrlOrigin,
    protectedRoutes: config2.protectedRoutes,
    page: {
      ...config2.page,
      logo: {
        ...isUsingFallback ? { width: "130px" } : {},
        ...(_j2 = config2.page) == null ? void 0 : _j2.logo,
        src: {
          light: ((_m = (_l = (_k2 = config2.page) == null ? void 0 : _k2.logo) == null ? void 0 : _l.src) == null ? void 0 : _m.light) ?? fallbackLogoLight,
          dark: ((_p = (_o = (_n = config2.page) == null ? void 0 : _n.logo) == null ? void 0 : _o.src) == null ? void 0 : _p.dark) ?? fallbackLogoDark
        }
      }
    },
    slotlets: config2.UNSAFE_slotlets,
    metadata: {
      favicon: "https://cdn.zudoku.dev/logos/favicon.svg",
      title: "%s - Zudoku",
      ...config2.metadata
    },
    sidebars: configuredSidebar,
    topNavigation: config2.topNavigation,
    mdx: config2.mdx,
    authentication: configuredAuthProvider,
    plugins: [
      ...configuredDocsPlugins,
      ...configuredApiPlugins,
      ...[],
      ...configuredRedirectPlugin ? [configuredRedirectPlugin] : [],
      ...[],
      ...[],
      ...configuredApiCatalogPlugins,
      ...[],
      ...config2.plugins ?? []
    ]
  };
};
const getRoutesByOptions = (options, enableStatusPages = false) => {
  const allPlugins = [
    ...options.plugins ?? [],
    ...[]
  ];
  const routes = allPlugins.flatMap((plugin) => isNavigationPlugin(plugin) ? plugin.getRoutes() : []).concat(
    enableStatusPages ? [400, 403, 404, 405, 414, 416, 500, 501, 502, 503, 504].map(
      (statusCode) => ({
        path: `/.static/${statusCode}`,
        element: /* @__PURE__ */ jsx(StatusPage, { statusCode })
      })
    ) : []
  ).concat([
    {
      path: "*",
      loader: () => {
        throw new Response("Not Found", { status: 404 });
      }
    }
  ]);
  return routes;
};
const getRoutesByConfig = (config2) => {
  const options = convertZudokuConfigToOptions(config2);
  const routes = getRoutesByOptions(options, config2.enableStatusPages);
  return [
    {
      element: /* @__PURE__ */ jsx(Zudoku, { ...options, children: /* @__PURE__ */ jsx(Layout, {}) }),
      children: [
        {
          element: /* @__PURE__ */ jsx(RouteGuard, {}),
          errorElement: /* @__PURE__ */ jsx(RouterError, {}),
          children: routes
        }
      ]
    }
  ];
};
const render = async ({
  template,
  request: baseRequest,
  response,
  routes,
  basePath
}) => {
  const { query, dataRoutes } = createStaticHandler(routes, {
    basename: basePath
  });
  const queryClient = new QueryClient();
  const request = baseRequest instanceof Request ? baseRequest : createFetchRequest(baseRequest, response);
  const context = await query(request);
  let status = 200;
  if (context instanceof Response) {
    if ([301, 302, 303, 307, 308].includes(context.status)) {
      return response.redirect(
        context.status,
        context.headers.get("Location")
      );
    }
    throw context;
  } else if (context.errors) {
    const firstError = Object.values(context.errors).find(isRouteErrorResponse);
    if (firstError == null ? void 0 : firstError.status) {
      status = firstError.status;
    }
  }
  const router = createStaticRouter(dataRoutes, context);
  const helmetContext = {};
  const App = /* @__PURE__ */ jsx(
    BootstrapStatic,
    {
      router,
      context,
      queryClient,
      helmetContext
    }
  );
  const { pipe } = renderToPipeableStream(App, {
    onShellError(error) {
      response.status(500);
      response.set({ "Content-Type": "text/html" });
      const html = renderToStaticMarkup(/* @__PURE__ */ jsx(ServerError, { error }));
      response.send(html);
    },
    onAllReady() {
      response.set({ "Content-Type": "text/html" });
      response.status(status);
      const transformStream = new Transform({
        transform(chunk, encoding, callback) {
          response.write(chunk, encoding);
          callback();
        }
      });
      const [htmlStart, htmlEnd] = template.split("<!--app-html-->");
      if (!htmlStart) {
        throw new Error("No <!--app-html--> found in template");
      }
      response.write(
        htmlStart.replace(
          "<!--app-helmet-->",
          [
            helmetContext.helmet.title.toString(),
            helmetContext.helmet.meta.toString(),
            helmetContext.helmet.link.toString(),
            helmetContext.helmet.style.toString(),
            helmetContext.helmet.script.toString()
          ].join("\n")
        )
      );
      transformStream.on("finish", () => {
        const dehydrated = dehydrate(queryClient, {
          shouldDehydrateQuery: (query2) => !query2.queryKey.includes(NO_DEHYDRATE)
        });
        response.end(
          htmlEnd == null ? void 0 : htmlEnd.replace(
            "</body>",
            `<script>window.DATA=${JSON.stringify(dehydrated)}<\/script></body>`
          )
        );
      });
      pipe(transformStream);
    },
    onError(error) {
      status = 500;
      {
        throw error;
      }
    }
  });
};
function createFetchRequest(req, res) {
  const origin = `${req.protocol}://${req.get("host")}`;
  const url = new URL(req.originalUrl || req.url, origin);
  const controller = new AbortController();
  res.on("close", () => controller.abort());
  const headers = new Headers();
  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }
  const init = {
    method: req.method,
    headers,
    signal: controller.signal
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }
  return new Request(url.href, init);
}
export {
  createFetchRequest,
  getRoutesByConfig,
  render
};
//# sourceMappingURL=entry.server.js.map
