export const dateForComputer = (date: Date) => date.toISOString().split("T")[0];

export const dateForHuman = (date: Date) => date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", weekday: "short" });

export const dateForSummary = (date?: Date | null) => (date ? date.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "present");
