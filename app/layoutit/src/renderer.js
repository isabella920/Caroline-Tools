/**
 * 職責：生成符合 Low-fi 視覺規格的 DOM [來源: 元件屬性定義.md]
 */
export const createBlockElement = (blockData) => {
    const div = document.createElement('div');
    div.className = 'vibe-block';
    // 根據規格書中的 aspect_ratio 或是固定高度設定
    div.style.minHeight = blockData.height || '200px';
    
    div.innerHTML = `
        <div class="category">${blockData.cat}</div>
        <div class="label">${blockData.label}</div>
        <div style="margin-top: 15px; color: #d1d1d6;">
            ${blockData.elements ? blockData.elements.join(' • ') : ''}
        </div>
    `;
    
    // 雙擊編輯標籤功能 [來源: 簡易規格書.md]
    div.ondblclick = () => {
        const newLabel = prompt('重新命名區塊內容：', blockData.label);
        if (newLabel) {
            div.querySelector('.label').innerText = newLabel;
        }
    };
    
    return div;
};
