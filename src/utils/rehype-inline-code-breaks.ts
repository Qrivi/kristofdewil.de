import type { Element, ElementContent, Root } from "hast";

export function rehypeInlineCodeBreaks() {
  return (tree: Root) => {
    function addBreaks(parent: Root | Element) {
      for (const node of parent.children) {
        if (node.type !== "element" || node.tagName === "pre") continue;

        if (node.tagName === "code") {
          node.children = node.children.flatMap((child): ElementContent[] => {
            if (child.type !== "text") return [child];

            const parts = child.value.split(/(?<=[/\\])/);
            return parts.flatMap((value, index): ElementContent[] => {
              const text: ElementContent = { type: "text", value };
              return index === parts.length - 1 ? [text] : [text, { type: "element", tagName: "wbr", properties: {}, children: [] }];
            });
          });
        } else {
          addBreaks(node);
        }
      }
    }

    addBreaks(tree);
  };
}
