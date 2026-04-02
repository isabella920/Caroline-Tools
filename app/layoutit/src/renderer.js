// 職責：把資料變成你看到的「低保真」視覺區塊
export const createBlockElement = (blockData) => {
  const el = document.createElement('div');
  el.className = 'vibe-block';
  el.style.height = blockData.height;
  el.innerHTML = `
    <div class="block-content">
      <span class="category-tag">${blockData.cat}</span>
      <h3 class="label-text">${blockData.label}</h3>
    </div>
  `;
  // 為什麼不在此寫事件？為了保持渲染器的純粹，事件由 main.js 統一處理。
  return el;
};
