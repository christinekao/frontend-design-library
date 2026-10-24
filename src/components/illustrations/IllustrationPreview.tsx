"use client";

import type { IllustrationPreview as PreviewKey } from "@/data/illustration-prompts";

/** Independent, original vector sketches illustrating what a prompt's visual vocabulary means. */
export function IllustrationPreview({ type, image, title }: { type: PreviewKey; image?: string; title: string }) {
  if (image) return <img className="ill-preview-image" src={image} alt={`${title}：使用者儲存的圖片成品`} />;
  if (type === "uploaded") return <div className="ill-preview-missing"><span>＋</span> 尚未上傳繪圖成果</div>;
  if (type === "pastel-cat") return <svg className="ill-preview-art" viewBox="0 0 420 320" role="img" aria-label="原創插畫示意：奶油色小貓在陽光下讀書，深灰描邊與柔和粉彩">
    <rect width="420" height="320" rx="22" fill="#FBF9F1"/>
    <rect x="270" y="34" width="105" height="133" rx="38" fill="#B9D8E9" stroke="#363233" strokeWidth="4"/>
    <path d="M322 34v133M272 94h100" stroke="#363233" strokeWidth="3"/>
    <circle cx="335" cy="72" r="20" fill="#F8D782" stroke="#363233" strokeWidth="3"/>
    <path d="M282 130c13-16 22-11 32 0 13-17 21-12 29-3 11-13 18-11 29-1" stroke="#363233" strokeWidth="3" fill="#F6F1EA" strokeLinecap="round"/>
    <path d="M60 244h294M81 242v47M335 242v47" fill="none" stroke="#363233" strokeWidth="8" strokeLinecap="round"/>
    <rect x="54" y="223" width="309" height="20" rx="8" fill="#E7A094" stroke="#363233" strokeWidth="4"/>
    <path d="M90 175c-12-19-5-52 19-66l-8-37 37 20c20-9 50-8 71 5l37-15-5 40c19 28 13 65-9 81" fill="#F8E5CD" stroke="#363233" strokeWidth="4" strokeLinejoin="round" />
    <path d="M107 92l20 13M216 93l-15 15" stroke="#E7A094" strokeWidth="7" strokeLinecap="round"/>
    <ellipse cx="153" cy="153" rx="6" ry="9" fill="#363233"/><ellipse cx="209" cy="153" rx="6" ry="9" fill="#363233"/>
    <path d="m177 164 6 4 7-4m-7 4v6m0 0c-5 7-11 5-15 0m15 0c4 7 10 5 14 0" stroke="#363233" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <circle cx="120" cy="174" r="10" fill="#E7A094" opacity=".72"/><circle cx="228" cy="174" r="10" fill="#E7A094" opacity=".72"/>
    <rect x="145" y="186" width="77" height="44" rx="5" fill="#A6CCDF" stroke="#363233" strokeWidth="3" />
    <path d="M183 192v30M154 198c10-5 19-4 26 0v24c-7-4-16-5-26 0zm33 0c10-5 17-4 26 0v24c-7-5-16-4-26 0z" fill="#FFFDF7" stroke="#363233" strokeWidth="2"/>
    <rect x="276" y="194" width="32" height="31" rx="6" fill="#B5D2A5" stroke="#363233" strokeWidth="3"/>
    <path d="M307 203c20-6 20 21 0 16" stroke="#363233" strokeWidth="3" fill="none"/>
    <path d="M44 104l6-17 7 17 16 7-16 6-7 17-6-17-16-6z" fill="#F8D782" stroke="#363233" strokeWidth="2"/>
    <path d="M244 41l4-10 4 10 9 4-9 4-4 9-4-9-9-4z" fill="#E7A094" stroke="#363233" strokeWidth="2"/>
  </svg>;
  if (type === "paper-cafe") return <svg className="ill-preview-art" viewBox="0 0 420 320" role="img" aria-label="原創拼貼插畫示意：暖色咖啡館、陽光、盆栽與拼貼紙張">
    <defs><filter id="paperSoft"><feDropShadow dx="3" dy="4" stdDeviation="1.8" floodOpacity=".13"/></filter></defs>
    <rect width="420" height="320" rx="22" fill="#F4EBDB"/>
    <path d="M0 235 36 213 88 231 146 216 205 227 270 214 327 231 383 208 420 230v90H0Z" fill="#E8D5B9"/>
    <circle cx="316" cy="69" r="36" fill="#E6B75D" filter="url(#paperSoft)"/>
    <path d="M80 247V82l23-14 172 1 8 13v168l-26 9z" fill="#C87559" filter="url(#paperSoft)"/>
    <path d="M100 99h159v20H100z" fill="#F2C982"/>
    <path d="m98 117 15 9 15-9 15 9 16-9 16 9 17-9 16 9 16-9 16 9 16-9v-29H98Z" fill="#EEDBB5" filter="url(#paperSoft)"/>
    <path d="M119 146h80v102h-80z" fill="#ACBFB1" filter="url(#paperSoft)"/>
    <path d="M130 155h57v82h-57z" fill="#BDD5CC"/>
    <path d="M158 156v80" stroke="#476D60" strokeWidth="5"/>
    <path d="M212 143h48v105h-48z" fill="#E5B88E" filter="url(#paperSoft)"/>
    <path d="M219 158h34v56h-34z" fill="#AAC8BF"/>
    <path d="M71 242 67 294h17l-3-51M158 243l4 50h18l-12-52" fill="#6B7960"/>
    <ellipse cx="128" cy="231" rx="72" ry="17" fill="#627660" filter="url(#paperSoft)"/>
    <path d="M96 228v-21h23v20M120 214h13M106 202c-5-7 6-11 0-19m11 19c-5-7 7-11 0-19" fill="none" stroke="#E8D9BE" strokeWidth="4" strokeLinecap="round"/>
    <path d="M309 263h58l-8 22h-39Z" fill="#C67A56" filter="url(#paperSoft)"/>
    <path d="M338 262c-27-33-13-41-8-49 18 5 22 23 8 49zm4 0c-1-34 17-48 32-42-1 15-13 30-32 42zm-10-4c-15-24-32-23-39-11 12 15 25 20 39 11" fill="#5F806B"/>
    <path d="M28 78 51 52 79 76 55 101Z" fill="#E6BA8B" opacity=".7"/>
    <path d="m367 142 24 13-18 24-22-13Z" fill="#A1B6A5" opacity=".6"/>
  </svg>;
  return <svg className="ill-preview-art" viewBox="0 0 420 320" role="img" aria-label="原創等角造型示意：柔和立體桌面、顯示器、筆記本、盆栽">
    <defs><linearGradient id="isoDesk" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#B8D6C9"/><stop offset="1" stopColor="#9EBDAD"/></linearGradient></defs>
    <rect width="420" height="320" rx="22" fill="#F0F4F0"/>
    <ellipse cx="208" cy="270" rx="156" ry="34" fill="#CBD4CB" opacity=".5"/>
    <path d="m67 197 141-71 149 69-141 72Z" fill="url(#isoDesk)" stroke="#769688" strokeWidth="2"/>
    <path d="m67 197 149 70v19L67 214z" fill="#8BAA9D"/><path d="m216 267 141-72v19l-141 72z" fill="#739E91"/>
    <path d="m83 219 17 8v54l-17-8zM321 227l17-8v53l-17 8z" fill="#7B9588"/>
    <path d="m139 147 85-41 74 34-87 43Z" fill="#99B4A9"/>
    <path d="m162 88 93-46 3 97-94 45z" fill="#506F6E" stroke="#728C83" strokeWidth="5" strokeLinejoin="round"/>
    <path d="m172 95 76-38v75l-76 38z" fill="#B4D4D1"/>
    <path d="m183 125 21-10 16 10-21 10z" fill="#E7A094"/>
    <path d="m218 113 19-9v23l-19 9z" fill="#F8D782"/>
    <path d="m201 172 28-14 39 17-29 15z" fill="#7D9892"/>
    <path d="m113 200 51-25 54 25-52 26Z" fill="#D99D91"/>
    <path d="m118 203 47-23 48 20-46 23Z" fill="#F4C6BB"/>
    <path d="m148 188 12-6M143 197l23-11M156 205l21-11" stroke="#FFF2E6" strokeWidth="4" strokeLinecap="round"/>
    <path d="m261 195 27-13 24 11-28 15z" fill="#F1DDAC"/>
    <path d="m274 181 19-9 19 8-19 9z" fill="#F8E7C5"/>
    <path d="m290 162 16-8v25l-16 8z" fill="#E8C99A"/>
    <path d="m303 160 7-3" stroke="#AC9272" strokeWidth="2"/>
    <path d="m76 159 15-8 19 9-16 8z" fill="#DFA589"/>
    <path d="m92 150c-17-17-12-38-4-48 19 7 20 30 4 48m4-4c-1-31 18-45 32-41-2 25-15 36-32 41" fill="#73A48B"/>
    <path d="m91 158 3-28" stroke="#497A67" strokeWidth="3"/>
    <circle cx="338" cy="98" r="5" fill="#E9B778"/><circle cx="73" cy="68" r="4" fill="#B9D6C9"/>
  </svg>;
}
