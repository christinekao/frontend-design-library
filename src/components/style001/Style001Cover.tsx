/** An original, CSS-drawn style interpretation for the public archive cover. */
export function Style001Cover({ large = false }: { large?: boolean }) {
  return <div className={`original-s001-cover ${large ? "large" : ""}`} aria-label="STYLE-001 原創元件預覽：學習計畫與時間軸">
    <div className="original-s001-tag">ORIGINAL COMPONENT PREVIEW</div>
    <div className="original-s001-window">
      <div className="original-s001-doodle" aria-hidden="true"><span>✿</span><span>✦</span><span>☁</span></div>
      <div className="original-s001-title">學習冒險日記</div>
      <div className="original-s001-sub">把目標變成每天的小進步</div>
      <div className="original-s001-tabs"><span>目標</span><span className="active">進度</span><span>筆記</span></div>
      <div className="original-s001-stepper"><i/><i className="active"/><i/><i/></div>
      <div className="original-s001-card"><b>Week 2</b><span>資料模型與 DAX 練習</span></div>
      <div className="original-s001-timeline"><div><em>09:00</em><i/>閱讀筆記</div><div><em>10:30</em><i/>完成實作題</div><div><em>14:00</em><i/>回顧重點</div></div>
    </div>
    <span className="original-s001-caption">取用抽象視覺規則，不重製原作</span>
  </div>;
}
