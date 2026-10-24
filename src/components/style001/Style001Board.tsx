"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Clipboard, Compass, Download, ExternalLink, Layers, Lightbulb, Sparkles } from "lucide-react";
import { makeStyle001Prompt, makeStyle001ComponentPrompt, PHASE_VIEWS, PREVIEW_VARIANTS, STYLE001_COMPONENTS, type PreviewVariant } from "@/data/style001-variants";

export type StudioMode = "components" | "variation";

function SceneArt({ small = false }: { small?: boolean }) {
  return <svg className={`s001-scene-svg ${small ? "s001-small-scene" : ""}`} viewBox="0 0 360 138" fill="none" role="img" aria-label="重新繪製的學習主題插畫：書本、鉛筆、星星與太陽">
    <path d="M0 103 C40 79 70 115 112 103 C156 88 173 116 207 103 C258 82 300 110 360 90 V138 H0Z" fill="#A6CCDF" stroke="#363233" strokeWidth="3"/>
    <circle cx="306" cy="39" r="24" fill="#F8D782" stroke="#363233" strokeWidth="3"/><path d="M306 5v-5M306 74v7M270 39h-8M342 39h8M280 13l-7-7M334 65l7 7" stroke="#363233" strokeWidth="3" strokeLinecap="round"/>
    <rect x="78" y="44" width="103" height="69" rx="15" fill="#E7A094" stroke="#363233" strokeWidth="3"/>
    <path d="M130 49v59M91 54c11-6 22-6 35 0v45c-15-7-25-8-35-1V54ZM136 54c12-6 22-6 34 0v45c-13-7-23-8-34-1V54Z" fill="#FBF9F1" stroke="#363233" strokeWidth="2.5" strokeLinejoin="round"/>
    <rect x="215" y="67" width="21" height="58" rx="5" transform="rotate(22 215 67)" fill="#B5D2A5" stroke="#363233" strokeWidth="3"/>
    <path d="m235 119-21 16-1-25Z" fill="#F8D782" stroke="#363233" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m57 34 5-11 5 11 11 5-11 5-5 11-5-11-11-5Z" fill="#F8D782" stroke="#363233" strokeWidth="2"/>
    <path d="m215 17 4-8 4 8 8 4-8 4-4 8-4-8-8-4Z" fill="#E7A094" stroke="#363233" strokeWidth="2"/>
  </svg>;
}

function MiniStepper({ labels, initial = 1, onChange, selected }: { labels: string[]; initial?: number; selected?: number; onChange?: (n: number) => void }) {
  const [internal, setInternal] = useState(initial);
  const value = selected ?? internal;
  return <div className="s001-stepper" aria-label="進度階段選擇"><div className="s001-step-line"/>{labels.map((d, i) => <button type="button" aria-label={`第 ${i + 1} 階段：${d}`} aria-pressed={value === i} onClick={() => {setInternal(i); onChange?.(i);}} key={`${d}-${i}`} className={`s001-step ${value === i ? "selected" : ""}`}><span className="s001-step-dot">{value === i ? <span className="s001-step-inner"/> : null}</span><span className="s001-step-text">{d}</span></button>)}</div>;
}

function InfoCard({ v }: { v: PreviewVariant }) {
  return <div className="s001-ticket"><div className="s001-ticket-top"><span>{v.ticket.header}</span><span>{v.ticket.code}</span></div><div className="s001-ticket-body"><div><small>{v.ticket.leftLabel}</small><strong>{v.ticket.leftValue}</strong></div><div className="s001-ticket-track"><span>•••••</span><ArrowRight size={17}/></div><div><small>{v.ticket.rightLabel}</small><strong>{v.ticket.rightValue}</strong></div></div><p className="s001-ticket-note">{v.ticket.footer}</p></div>;
}

function Timeline({ v, short = false }: { v: PreviewVariant; short?: boolean }) {
  return <div className="s001-timeline">{v.activities.slice(0, short ? 3 : undefined).map((a, i) => <div className="s001-event" key={`${a.time}-${i}`}><span className="s001-time">{a.time}</span><div className="s001-node-col"><span className="s001-node"/></div><div className="s001-event-data">{a.type === "inline" ? <div className="s001-inline"><span className={`s001-pill ${a.color || "sage"}`}>{a.kind}</span><span>{a.label}</span></div> : <div className="s001-activity"><span>{a.label}</span><span className={`s001-dot ${a.color || "coral"}`}/></div>}</div></div>)}</div>;
}

function ComponentSketch({ id, v }: { id: string; v: PreviewVariant }) {
  switch (id) {
    case "C01": return <div className="s001-sketch-hero"><SceneArt small/><div className="s001-sketch-caption"><strong>{v.title}</strong><span>{v.counter}</span></div></div>;
    case "C02": return <div className="s001-sketch-nav"><div className="s001-mark">✳</div>{v.tabs.map((tab, i) => <span key={tab} className={i === 1 ? "active" : ""}>{tab}</span>)}</div>;
    case "C03": return <InfoCard v={v}/>;
    case "C04": return <div className="s001-stepper" aria-hidden="true"><div className="s001-step-line"/>{v.days.map((d,i)=><span className={`s001-step ${i===v.selected?"selected":""}`} key={d}><span className="s001-step-dot">{i===v.selected?<span className="s001-step-inner"/>:null}</span><span className="s001-step-text">{d}</span></span>)}</div>;
    case "C05": return <div className="s001-summary"><div className="s001-summary-picture"><SceneArt small/></div><div><small>{v.days[v.selected]}</small><strong>{v.summary}</strong><span>{v.summaryMeta}</span></div></div>;
    case "C06": return <Timeline v={v} short/>;
    case "C07": return <div className="s001-activity-demo"><div className="s001-activity">{v.activities[0].label}</div><div className="s001-activity">{v.activities[2].label}</div></div>;
    case "C08": return <div className="s001-pill-demo">{v.pills.map(p => <span className={`s001-pill ${p.color}`} key={p.label}>{p.label}</span>)}</div>;
    default: return <div className="s001-countdown">✦ {v.counter}</div>;
  }
}

export function Style001ComponentBoard({ initialActive = null, onCopy }: { initialActive?: string | null; onCopy: (text: string) => void }) {
  const v = PREVIEW_VARIANTS[0];
  const [active, setActive] = useState<string | null>(initialActive);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const chosen = STYLE001_COMPONENTS.find(c => c.id === active);

  useEffect(() => {
    if (!active) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
      } else if (event.key === "Tab") {
        // Keep focus in the dialog while allowing its copy actions and summaries.
        const dialog = document.querySelector(".s001-spec-panel");
        const controls = Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), summary') || []);
        if (!controls.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
    };
  }, [active]);
  return <div className="s001-section">
    <div className="s001-section-title"><div><span className="s001-overline">DRAWN & REUSABLE · 9 PIECES</span><h2>Component Board</h2><p>不是只列元件名稱，而是以可編輯的 HTML／SVG／CSS 繪製九個元件；畫面內容已改為學習計畫。點擊元件可以查看規格，並複製單一元件的前端或繪圖 Prompt。</p></div><span className="s001-compact-tag">STYLE-001 / COMPONENTS</span></div>
    <div className="s001-board">{STYLE001_COMPONENTS.map(c => <button type="button" className={`s001-board-card ${active === c.id ? "focus" : ""}`} key={c.id} onClick={() => setActive(c.id)} aria-haspopup="dialog" aria-expanded={active === c.id}><div className="s001-card-heading"><span>{c.id}</span><span>查看規格與 Prompt <ArrowRight size={13}/></span></div><div className="s001-sketch"><ComponentSketch id={c.id} v={v}/></div><div className="s001-card-info"><strong>{c.name}</strong><small>{c.title}</small></div></button>)}</div>
    {chosen && <div className="s001-spec-overlay">
      <button type="button" className="s001-spec-shade" aria-label="關閉元件規格" onClick={() => setActive(null)}/>
      <section className="s001-spec s001-spec-panel" role="dialog" aria-modal="true" aria-labelledby="s001-spec-title" aria-describedby="s001-spec-description">
        <div className="s001-spec-head"><div><span className="s001-overline">{chosen.id} / COMPONENT ANATOMY</span><h3 id="s001-spec-title">{chosen.name}</h3></div><button ref={closeButtonRef} type="button" className="s001-spec-close" onClick={() => setActive(null)} aria-label="關閉元件規格">✕</button></div>
        <p className="s001-spec-intro" id="s001-spec-description">{chosen.title} · 以全新學習內容繪製的元件示例。</p>
        <div className="s001-spec-preview"><ComponentSketch id={chosen.id} v={v}/></div>
        <div className="s001-spec-grid"><p><b>元件結構</b>{chosen.anatomy}</p><p><b>互動與狀態</b>{chosen.states}</p><p><b>可替換內容</b>{chosen.flexible}</p><p><b>設計規則</b>{chosen.rule}</p></div>
        <div className="s001-component-prompts">
          <span className="s001-overline">PROMPTS / 直接套用到自己的專案</span>
          <p>針對 <strong>{chosen.name}</strong> 的獨立提示詞；使用新的主題與內容，不複製來源作品。</p>
          <div className="s001-prompt-actions">
            <button type="button" onClick={() => onCopy(makeStyle001ComponentPrompt(chosen.id, "frontend"))}><Clipboard size={15}/> 複製前端實作 Prompt</button>
            <button type="button" onClick={() => onCopy(makeStyle001ComponentPrompt(chosen.id, "visual"))}><Clipboard size={15}/> 複製元件繪圖 Prompt</button>
          </div>
          <details className="s001-prompt-detail">
            <summary>查看前端實作 Prompt</summary>
            <pre>{makeStyle001ComponentPrompt(chosen.id, "frontend")}</pre>
          </details>
          <details className="s001-prompt-detail">
            <summary>查看元件繪圖 Prompt</summary>
            <pre>{makeStyle001ComponentPrompt(chosen.id, "visual")}</pre>
          </details>
        </div>
      </section>
    </div>}
    <p className="s001-fineprint">這些是重新實作的可操作元件示意，並非將其他設計者的圖像切成素材或照抄原站程式碼。</p>
  </div>;
}

export function Style001VariationStudio({ onCopy }: { onCopy: (text: string) => void }) {
  const [presetId, setPresetId] = useState<PreviewVariant["id"]>("study");
  const [customSubject, setCustomSubject] = useState("");
  const [brief, setBrief] = useState("");
  const [stage, setStage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(1);
  const v = PREVIEW_VARIANTS.find(x => x.id === presetId) || PREVIEW_VARIANTS[0];
  const displayedStage = stage === null ? v.selected : Math.min(stage, v.days.length - 1);
  const stageView = PHASE_VIEWS[v.id][displayedStage];
  const prompt = useMemo(() => makeStyle001Prompt(customSubject || v.subject, brief, v), [brief, customSubject, v]);
  function downloadPrompt() {
    const blob = new Blob([prompt], {type:"text/markdown;charset=utf-8"});
    const url = URL.createObjectURL(blob); const el = document.createElement("a");el.href = url; el.download="STYLE-001_AI_Generation_Prompt.md";el.click();URL.revokeObjectURL(url);
  }
  return <div className="s001-section" id="variation-studio">
    <div className="s001-section-title"><div><span className="s001-overline">REFERENCE → RULES → NEW CONTENT</span><h2>Variation Studio</h2><p>同一設計語言，改成不同產品內容。三個可直接查看的範例，不沿用原始釜山資訊。</p></div><span className="s001-compact-tag">CONTENT TRANSFORMATION</span></div>
    <div className="s001-studio">
      <aside className="s001-studio-control"><span className="s001-control-label">01 / 選擇新情境</span><div className="s001-presets">{PREVIEW_VARIANTS.map(p=><button type="button" key={p.id} className={v.id===p.id?"active":""} aria-pressed={v.id===p.id} onClick={()=>{setPresetId(p.id);setStage(null);setActiveTab(1);}}>{p.label}<ArrowRight size={16}/></button>)}</div><span className="s001-control-label">02 / 自訂交給 AI 的主題</span><label className="s001-input-label" htmlFor="s001-topic">新產品主題<input id="s001-topic" value={customSubject} onChange={e=>setCustomSubject(e.target.value)} placeholder="例如：求職面試追蹤器" maxLength={100}/></label><label className="s001-input-label" htmlFor="s001-brief">內容需求<textarea id="s001-brief" rows={4} value={brief} onChange={e=>setBrief(e.target.value)} placeholder="要顯示哪些資訊？誰會使用？有哪些重要操作？" maxLength={1200}/></label><div className="s001-callout"><Lightbulb size={16}/><p>左側自由輸入會更新 AI Prompt。右側是三組**預先設計**的互動示例，並非即時呼叫 AI 生成。</p></div><button className="s001-action" type="button" onClick={()=>onCopy(prompt)}><Clipboard size={16}/> 複製完整 AI 生成 Prompt</button><button className="s001-action-secondary" type="button" onClick={downloadPrompt}><Download size={15}/> 下載 Markdown</button></aside>
      <section className="s001-device-col" aria-label={`${v.label} 新內容版介面預覽`}><div className="s001-preview-status"><span className="s001-live-dot"/> 元件即時互動預覽 <span>已替換內容</span></div><div className="s001-device"><div className="s001-hero"><SceneArt/><span className="s001-hero-eyebrow">{v.eyebrow}</span><h3>{v.title}</h3><p>{v.subtitle}</p><span className="s001-countdown">✦ {v.counter}</span></div><div className="s001-nav">{v.tabs.map((t,i)=><button type="button" key={t} aria-pressed={activeTab===i} className={activeTab===i?"active":""} onClick={()=>setActiveTab(i)}>{t}</button>)}</div><div className="s001-main-card"><div className="s001-preview-section-label">{v.tabs[activeTab]}</div>
    {activeTab !== 2 && <InfoCard v={v}/>}
    {activeTab !== 2 && <><h4>{v.id==="study"?"每週進度":v.id==="onboarding"?"成長階段":"每日進度"}</h4><MiniStepper key={v.id} labels={v.days} selected={displayedStage} onChange={setStage}/><div className="s001-summary"><div className="s001-summary-picture"><SceneArt small/></div><div><small>{v.days[displayedStage]}</small><strong>{stageView.summary}</strong><span>{stageView.meta}</span></div></div></>}
    {activeTab === 1 && <Timeline v={{...v, activities:stageView.activities}}/>}
    {activeTab === 0 && <div className="s001-resource-panel"><strong>這個階段的重點</strong><p>{stageView.meta}</p><p>切換上方章節可查看詳細步驟或準備項目。</p></div>}
    {activeTab === 2 && <div className="s001-resource-panel"><strong>{v.id === "study" ? "學習素材與準備" : v.id === "onboarding" ? "到職準備清單" : "小練習提醒"}</strong><p>{v.id === "study" ? "依照學習進度選擇影片、題庫與筆記。" : v.id === "onboarding" ? "確認會議、工具與必要準備事項。" : "整理可以持續實踐的小步驟。"}</p><div className="s001-activity-demo">{stageView.activities.slice(0,3).map((a,i)=><div className="s001-activity" key={i}>{a.label}</div>)}</div></div>}
    <div className="s001-pill-demo">{v.pills.map(p=><span key={p.label} className={`s001-pill ${p.color}`}>{p.label}</span>)}</div></div></div><p className="s001-device-note">此 UI 使用自行繪製的插畫與新文案。樣式承襲參考的抽象規則，不複製原作畫面。</p></section>
    </div>
  </div>;
}
