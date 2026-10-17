import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import sharp from "sharp";

import type { OpenGraphCard } from "~/utils/open-graph";

import darkPortraitData from "~/assets/portrait-rotation-dark/portrait-06-front.webp?inline";
import portraitData from "~/assets/portrait-rotation/portrait-06-front.webp?inline";
import { SITE_NAME } from "~/constants";

// Kinda wanna have light the default but dark is more me
const OPEN_GRAPH_THEME: "light" | "dark" = "dark";

const require = createRequire(import.meta.url);

// Load local assets once for the entire build; card generation needs no network.
const assets = Promise.all([
  readFile(require.resolve("@fontsource/pretendard/files/pretendard-latin-400-normal.woff")),
  readFile(require.resolve("@fontsource/pretendard/files/pretendard-latin-500-normal.woff")),
  readFile(require.resolve("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff")),
  sharp(Buffer.from(portraitData.split(",")[1], "base64"))
    .png()
    .toBuffer(),
  sharp(Buffer.from(darkPortraitData.split(",")[1], "base64"))
    .composite([{ input: { create: { width: 512, height: 512, channels: 3, background: "#202020" } }, blend: "lighten" }])
    .png()
    .toBuffer(),
]);

export async function renderOpenGraphCard(card: OpenGraphCard, theme: "light" | "dark" = OPEN_GRAPH_THEME) {
  const [regular, medium, mono, lightPortrait, darkPortrait] = await assets;
  const portrait = theme === "dark" ? darkPortrait : lightPortrait;
  const colors =
    theme === "dark"
      ? { background: "#202020", foreground: "#f0f0ff", muted: "#b2b2bc", primary: "#faaa14", border: "#2a2a2b" }
      : { background: "#fff", foreground: "#202020", muted: "#636363", primary: "#cc8604", border: "#ededed" };
  const titleSize = card.title.length > 70 ? 46 : card.title.length > 44 ? 54 : 64;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: { display: "flex", width: 1200, height: 630, position: "relative", overflow: "hidden", backgroundColor: colors.background, color: colors.foreground, fontFamily: "Pretendard" },
        children: [
          {
            type: "img",
            props: {
              src: `data:image/png;base64,${portrait.toString("base64")}`,
              width: 780,
              height: 780,
              style: { position: "absolute", left: -300, top: -54, opacity: 0.5 },
            },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", justifyContent: "center", position: "absolute", left: 454, right: 64, top: 64, bottom: 110 },
              children: [
                {
                  type: "div",
                  props: { style: { width: 48, height: 3, backgroundColor: colors.primary, marginBottom: 30 } },
                },
                ...(card.date
                  ? [
                      {
                        type: "div",
                        props: { children: card.date.toUpperCase(), style: { fontFamily: "JetBrains Mono", fontSize: 18, color: colors.muted, marginBottom: 20 } },
                      },
                    ]
                  : []),
                {
                  type: "div",
                  props: { children: card.title, style: { fontSize: titleSize, fontWeight: 500, lineHeight: 1.08, letterSpacing: -1.6, textWrap: "balance" } },
                },
                {
                  type: "div",
                  props: { children: card.subtitle, style: { fontSize: 32, lineHeight: 1.45, color: colors.muted, marginTop: 24 } },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                left: 454,
                right: 64,
                bottom: 44,
                borderTop: `1px solid ${colors.border}`,
                paddingTop: 20,
                fontSize: 17,
              },
              children: [
                { type: "div", props: { children: card.section ? `${SITE_NAME} → ${card.section}` : SITE_NAME, style: { color: colors.muted } } },
                { type: "div", props: { children: "kristofdewil.de", style: { color: colors.primary } } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
