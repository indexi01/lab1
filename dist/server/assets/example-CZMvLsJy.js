import { jsx, jsxs } from "react/jsx-runtime";
import { useMDXComponents } from "zudoku/components";
const excerpt = "Edit this page by opening the example.mdx file in the pages/docs directory.";
const tableOfContents = [];
const frontmatter = {
  "title": "Example page"
};
function _createMdxContent(props) {
  const _components = {
    code: "code",
    p: "p",
    tip: "tip",
    ...useMDXComponents(),
    ...props.components
  };
  return jsx(_components.tip, {
    children: jsxs(_components.p, {
      children: ["Edit this page by opening the ", jsx(_components.code, {
        inline: true,
        children: "example.mdx"
      }), " file in the ", jsx(_components.code, {
        inline: true,
        children: "pages/docs"
      }), " directory."]
    })
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
//# sourceMappingURL=example-CZMvLsJy.js.map
