import type { Element, Root } from "hast";
import type { VFile } from "vfile";

export function rehypeHeadingLinks() {
  return (tree: Root, file: VFile) => {
    if (!file.history.some((path) => /[/\\]content[/\\]blog[/\\]/.test(path))) return;

    function addLinks(parent: Root | Element) {
      for (const node of parent.children) {
        if (node.type !== "element") continue;

        if (/^h[1-6]$/.test(node.tagName) && typeof node.properties.id === "string") {
          node.children.push({
            type: "element",
            tagName: "a",
            properties: {
              href: `#${node.properties.id}`,
              className: ["heading-link"],
              ariaLabel: "Link to this heading",
              title: "Link to this heading",
            },
            children: [],
          });
        } else {
          addLinks(node);
        }
      }
    }

    addLinks(tree);
  };
}
