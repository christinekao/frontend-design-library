import draw004 from "./drawing-prompts/DRAW-004.json";

/** Prompt-collection records. Starter previews are original SVG examples, NOT AI generated images. */
export type IllustrationPreview = "pastel-cat" | "paper-cafe" | "isometric-desk" | "white-doodle" | "uploaded";
export type IllustrationPromptEntry = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  negativePrompt: string;
  tags: string[];
  model: string;
  aspectRatio: string;
  notes: string;
  imageDataUrl: string;
  preview: IllustrationPreview;
  sourceUrl: string;
  createdAt: string;
  origin: "example" | "local";
};
export const ILLUSTRATION_EXAMPLES: IllustrationPromptEntry[] = [
  {
    id: "DRAW-001",
    title: "粉彩粗描邊 · 小貓讀書",
    description: "從 STYLE-001 的抽象設計語言衍生：圓潤插畫、奶油底色與柔和粉彩，換成全新主題。",
    prompt: "Draw a charming flat vector illustration of a small cream-colored cat studying at a tidy desk beside a sunny window. Thick rounded charcoal outlines, soft muted pastel palette (sage green, sky blue, warm coral and butter yellow), smooth rounded geometry, cream paper backdrop, minimal details and plenty of breathing room. Whimsical friendly editorial illustration for a learning planner. Consistent 2–3px outline weight, clean color fills, centered composition, no gradient, no lettering, no logos. Entirely original scene.",
    negativePrompt: "Photorealism, glossy 3D, glassmorphism, neon, busy background, hard black shadows, gradients, watermark, copied characters, text.",
    tags: ["Pastel", "Cute", "Flat Illustration", "Bold Outline"],
    model: "模型不限（提示詞範例）", aspectRatio: "4:3", notes: "畫面為本網站自行繪製的 SVG 示意，非模型實際生成結果。可將 Prompt 貼至繪圖模型並替換為實際成品。", imageDataUrl: "", preview: "pastel-cat",
    sourceUrl: "", createdAt: "2026-10-24", origin: "example"
  },
  {
    id: "DRAW-002",
    title: "紙張拼貼 · 午後咖啡館",
    description: "以不規則紙張切片、低彩度材質及層次陰影創造編輯插畫。",
    prompt: "Create an original editorial cut-paper collage illustration of a quiet neighborhood coffee shop on a bright afternoon. Layered hand-cut paper shapes with gently uneven contours; warm terracotta, dusty yellow, muted forest green and parchment colors; subtle natural paper texture, gentle offset paper shadows and clean simplified composition. A large storefront window, an outdoor round table, a tiny potted plant and warm sunlight. Graphic, poetic, tactile, nostalgic, no text, no logo, 4:3.",
    negativePrompt: "Plastic 3D renders, metallic highlights, photorealism, neon palette, hard perfect edges, text, watermark.",
    tags: ["Editorial", "Collage", "Paper Texture", "Warm"], model: "模型不限（提示詞範例）", aspectRatio: "4:3",
    notes: "SVG 是可視化畫風示意，不是 AI 繪圖模型生成成品。", imageDataUrl: "", preview: "paper-cafe", sourceUrl: "", createdAt: "2026-10-24", origin: "example"
  },
  {
    id: "DRAW-003",
    title: "柔和等角 3D · 創作者工作桌",
    description: "以等角視角、柔霧材質與柔和光影呈現微縮空間。",
    prompt: "Illustrate an original miniature creator's workspace in a gentle isometric 3D toy-diorama style. A pale mint desk with a small monitor, pink notebook, turquoise headphones, cream desk lamp and a tiny leafy plant. Clean 30-degree isometric perspective, softened geometric edges, clay-like matte surfaces, warm neutral ambient lighting, calm pastel tones, soft contact shadows, generous negative space, no labels, no branding, square 1:1 composition.",
    negativePrompt: "Hyperrealistic interiors, cyberpunk neon, glossy chrome, harsh reflections, clutter, logos, text, people.",
    tags: ["Isometric", "Soft 3D", "Clay", "Pastel"], model: "模型不限（提示詞範例）", aspectRatio: "1:1",
    notes: "SVG 模擬等角造型供辨識畫風；實際 3D 成品需另用繪圖模型產生。", imageDataUrl: "", preview: "isometric-desk", sourceUrl: "", createdAt: "2026-10-24", origin: "example"
  },
  { ...draw004, preview: "white-doodle", origin: "example" }
];
export function nextDrawingId(entries: IllustrationPromptEntry[]): string {
  const n = Math.max(0, ...entries.map(x => Number(x.id.match(/^DRAW-(\d+)$/)?.[1] || 0)));
  return `DRAW-${String(n + 1).padStart(3, "0")}`;
}
