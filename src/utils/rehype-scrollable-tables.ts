import type { Element, Root } from "hast";

export function rehypeScrollableTables() {
  return (tree: Root) => {
    function wrapTables(parent: Root | Element) {
      parent.children = parent.children.map((node) => {
        if (node.type !== "element") return node;

        if (node.tagName === "table") {
          return {
            type: "element",
            tagName: "div",
            properties: {
              className: ["table-scroll"],
              tabIndex: 0,
              role: "region",
              ariaLabel: "Scrollable table",
            },
            children: [node],
          };
        }

        wrapTables(node);
        return node;
      });
    }

    wrapTables(tree);
  };
}
