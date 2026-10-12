import { retext } from "retext";
import retextSmartypants from "retext-smartypants";

const processor = retext().use(retextSmartypants);

/** Apply Markdown's smart punctuation to plain text, without interpreting Markdown or HTML. */
export function smartPunctuation(text: string): string {
  return String(processor.processSync(text));
}
