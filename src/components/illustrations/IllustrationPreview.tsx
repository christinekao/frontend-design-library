"use client";

import type { IllustrationPreview as PreviewKey } from "@/data/illustration-prompts";

/** Independent, original vector sketches illustrating what a prompt's visual vocabulary means. */
export function IllustrationPreview({ type, image, title }: { type: PreviewKey; image?: string; title: string }) {
  if (image) return <img className="ill-preview-image" src={image} alt={`${title}：使用者儲存的圖片成品`} />;
  if (type === "uploaded") return <div className="ill-preview-missing"><span>＋</span> 尚未上傳繪圖成果</div>;
  if (type === "white-doodle") return <svg className="ill-preview-art" viewBox="0 0 420 320" role="img" aria-label="白色細線手繪疊加效果示意：暖色咖啡桌、白色蒸氣、愛心、箭頭和手寫短句">
    <defs>
      <linearGradient id="d004-wall" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#CFC3A8"/><stop offset=".5" stopColor="#A78E72"/><stop offset="1" stopColor="#725D4E"/></linearGradient>
      <linearGradient id="d004-light" x1="0" y1="0" x2=".9" y2="1"><stop stopColor="#FFE8BD" stopOpacity=".75"/><stop offset="1" stopColor="#F2E4CF" stopOpacity=".04"/></linearGradient>
      <linearGradient id="d004-table" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#B99169"/><stop offset="1" stopColor="#694833"/></linearGradient>
      <radialGradient id="d004-coffee"><stop stopColor="#52301F"/><stop offset=".65" stopColor="#6D3C26"/><stop offset="1" stopColor="#B78760"/></radialGradient>
      <filter id="d004-soft"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="d004-smaller"><feGaussianBlur stdDeviation="2"/></filter>
    </defs>
    <rect width="420" height="320" rx="18" fill="url(#d004-wall)"/>
    <path d="M15 0h184v186H15Z" fill="#604F40" opacity=".55"/>
    <path d="M25 0h153v170H25Z" fill="#A4B4A2" opacity=".85"/>
    <path d="M25 5h153v145H25Z" fill="#B8B9A1"/>
    <path d="M25 12h153v140H25Z" fill="url(#d004-light)"/>
    <path d="M73 0v166M25 92h153" stroke="#5C4F42" strokeWidth="10" opacity=".74"/>
    <g filter="url(#d004-soft)" opacity=".75"><circle cx="55" cy="25" r="22" fill="#E9D4AC"/><circle cx="125" cy="46" r="18" fill="#8D9A70"/><circle cx="168" cy="139" r="17" fill="#E8CB8E"/><circle cx="366" cy="55" r="42" fill="#F9D7A6"/><circle cx="302" cy="60" r="18" fill="#6F8055"/><circle cx="215" cy="99" r="13" fill="#DBA977"/></g>
    <path d="M0 198 420 151v169H0Z" fill="url(#d004-table)"/>
    <path d="M0 217 420 161" stroke="#E6C79E" strokeWidth="4" opacity=".35"/>
    <path d="M0 264 420 211" stroke="#C3946B" strokeWidth="3" opacity=".35"/>
    <path d="M231 196 345 169 402 237 274 276Z" fill="#E2CBAB" opacity=".95"/>
    <path d="M237 196 299 182 338 196 275 211Z" fill="#F9EFDC" />
    <path d="M276 211 338 196 393 236 330 252Z" fill="#ECE4D2"/>
    <path d="M276 213 277 261" stroke="#987E68" strokeWidth="2"/>
    <path d="M289 224 339 212M294 233 348 221M299 243 356 230" stroke="#8A7D68" strokeWidth="1.3" opacity=".5"/>
    <ellipse cx="185" cy="253" rx="81" ry="26" fill="#442D1D" opacity=".28" filter="url(#d004-smaller)"/>
    <ellipse cx="185" cy="248" rx="76" ry="20" fill="#EAD8B9"/>
    <ellipse cx="185" cy="246" rx="59" ry="14" fill="#C7A886"/>
    <path d="M139 177h92v69c0 24-92 24-92 0Z" fill="#D6C2A1" stroke="#8F795D" strokeWidth="3"/>
    <path d="M229 192c48-19 43 42 2 35" fill="none" stroke="#D6C2A1" strokeWidth="14"/>
    <path d="M229 192c48-19 43 42 2 35" fill="none" stroke="#8F795D" strokeWidth="3"/>
    <ellipse cx="185" cy="179" rx="46" ry="14" fill="#EFDBB9" stroke="#876D57" strokeWidth="3"/>
    <ellipse cx="185" cy="179" rx="36" ry="9" fill="url(#d004-coffee)"/>
    <path d="M298 145c6-32-1-45-6-48M310 150c-7-26-3-44 5-53M321 148c12-24 26-31 32-35" stroke="#4D6144" strokeWidth="5" fill="none"/>
    <ellipse cx="286" cy="108" rx="14" ry="26" transform="rotate(-28 286 108)" fill="#5B704B"/>
    <ellipse cx="318" cy="106" rx="11" ry="23" transform="rotate(28 318 106)" fill="#708453"/>
    <ellipse cx="335" cy="129" rx="15" ry="23" transform="rotate(66 335 129)" fill="#4F6C4B"/>
    <path d="M277 145h71l-8 46h-56Z" fill="#9C6D57"/>
    <path d="M278 145h69l-4 10h-61Z" fill="#B68D70"/>
    <path d="M312 108c5-9 12-14 20-12l3 11-11 9z" fill="#E8D9BD"/>
    <circle cx="335" cy="95" r="9" fill="#EFE3CB"/><circle cx="342" cy="100" r="7" fill="#F3E8D6"/>
    <path d="M26 223 88 206 114 281 44 301Z" fill="#E9D9BC" opacity=".9"/>
    <path d="M45 250 90 239M47 262l35-9M53 275l39-10" stroke="#7E6750" strokeWidth="2" opacity=".45"/>
    <g stroke="#FFFCF6" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M145 178c16-15 66-15 83-1M134 190c-1 23 0 47 8 57M145 258c23 11 62 11 83-2M240 214c21-2 27-22 16-28"/>
      <path d="M166 153c-13-14 14-24 3-39M190 154c-13-18 14-24 5-43M214 153c-13-15 13-24 6-41"/>
      <path d="M110 118c-10 3-17 12-19 24M89 133l2 11 10-4"/>
      <path d="M334 209c7-3 18-1 22 7-11 4-21 12-28 19M333 233l-7 3 0-8"/>
      <path d="M265 38l5 11 11 3-10 5-5 12-5-12-11-5 11-3z"/>
      <path d="M372 91l3 7 8 3-8 3-3 8-3-8-8-3 8-3z"/>
      <path d="M77 176c-13-17-20 4-4 13 12-10 1-25-8-15"/>
      <path d="M341 261c-10-12-17 0-8 9 12 10 20-12 9-12-2 0-4 1-5 4z"/>
      <path d="M298 261c2 7 12 7 13 0M298 255h1M310 255h1"/>
    </g>
    <g fill="#FFF9F0" fontFamily="'Comic Sans MS','Bradley Hand',cursive" fontSize="18" transform="rotate(-7 70 55)"><text x="33" y="54">slow</text><text x="30" y="75">morning ♡</text></g>
    <g fill="#FFFAF3" fontFamily="'Comic Sans MS','Bradley Hand',cursive" fontSize="15" transform="rotate(7 332 53)"><text x="326" y="56">little</text><text x="323" y="75">joys</text></g>
    <g stroke="#FFFDF7" strokeWidth="1.4" strokeDasharray="2 5" fill="none" opacity=".94"><path d="M38 151q36 25 73 6"/><path d="M261 294q28 6 58-13"/></g>
  </svg>;
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
