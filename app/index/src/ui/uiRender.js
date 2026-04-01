/**
 * 渲染工具畫廊
 * @param {Array} tools - 來自工具庫的資料陣列
 * @param {string} containerId - 畫廊容器的 DOM ID
 */
export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. 生成畫廊卡片 (適應深色玻璃背景，改為白字)
    const toolsHTML = tools.map(tool => `
        <a href="${tool.link}" target="_blank" class="snap-center shrink-0 w-64 glass-panel p-5 rounded-2xl flex flex-col hover:bg-white/10 transition-colors group">
            <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/10 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <i data-lucide="${tool.icon || 'box'}" class="w-5 h-5"></i>
                </div>
                <h2 class="text-lg font-bold text-white">${tool.name}</h2>
            </div>
            <p class="text-sm text-white/70 flex-1 whitespace-normal break-words">
                ${tool.description}
            </p>
        </a>
    `).join('');

    container.innerHTML = toolsHTML;

    // 2. 渲染膠囊分頁點
    renderPagination(tools.length, 'gallery-pagination');

    // 3. 重新啟動 Lucide 圖示
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * 渲染下方膠囊分頁點 (純視覺裝飾，可依需求加入連動邏輯)
 */
function renderPagination(count, paginationId) {
    const pageContainer = document.getElementById(paginationId);
    if (!pageContainer) return;

    let dotsHTML = '';
    // 假設畫廊第一張預設 active
    for (let i = 0; i < count; i++) {
        const isActive = i === 0 ? 'active' : '';
        dotsHTML += `<div class="capsule-dot ${isActive}"></div>`;
    }
    
    pageContainer.innerHTML = dotsHTML;
}
