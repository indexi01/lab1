import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useMDXComponents } from "zudoku/components";
const excerpt = "Thanks for choosing to use Zudoku to power your API documentation!";
const tableOfContents = [{
  "depth": 2,
  "value": "Edit this page",
  "id": "edit-this-page"
}, {
  "depth": 2,
  "value": "Additional Configuration",
  "id": "additional-configuration"
}];
const frontmatter = {
  "title": "Welcome to Zudoku"
};
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    p: "p",
    ...useMDXComponents(),
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsx(_components.p, {
      children: "Thanks for choosing to use Zudoku to power your API documentation!"
    }), "\n", jsx(_components.h2, {
      id: "edit-this-page",
      children: "Edit this page"
    }), "\n", jsxs(_components.p, {
      children: ["To edit this page, open the ", jsx(_components.code, {
        inline: true,
        children: "index.mdx"
      }), " file in the ", jsx(_components.code, {
        inline: true,
        children: "pages"
      }), " directory."]
    }), "\n", jsx(_components.h2, {
      id: "additional-configuration",
      children: "Additional Configuration"
    }), "\n", jsxs(_components.p, {
      children: ["You can find the full configuration for your Zudoku site in the ", jsx(_components.code, {
        inline: true,
        children: "zudoku.config.ts"
      }), " file."]
    }), "\n", jsxs(_components.p, {
      children: ["For further information on how to customize your site, check out the ", jsx(_components.a, {
        href: "https://zudoku.dev/docs",
        children: "Zudoku documentation"
      }), "."]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = {
    ...useMDXComponents(),
    ...props.components
  };
  return MDXLayout ? jsx(MDXLayout, {
    ...props,
    children: jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default,
  excerpt,
  frontmatter,
  tableOfContents
};
//# sourceMappingURL=introduction-IOkbK55C.js.map
