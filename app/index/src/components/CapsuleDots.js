/**
 * 渲染膠囊分頁點組件
 * @param {string} containerId - 掛載分頁點的容器 ID (例如 'gallery-pagination')
 * @param {number} totalPages - 總頁數
 * @param {number} currentPage - 當前頁碼 (從 0 開始)
 * @param {Function} onPageChangeCallback - 點擊後要執行的回呼函數 (在 main.js 中定義)
 */
export function renderCapsuleDots(containerId, totalPages, currentPage, onPageChangeCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. 生成 HTML 字串 (這裡使用你 style.css 中已定義的 class: capsule-dot, active)
    const dotsHTML = Array(totalPages).fill(0).map((_, i) => `
        <button 
            class="capsule-dot ${i === currentPage ? 'active' : ''} hover:bg-white/50 transition-all focus:outline-none focus:ring-1 focus:ring-white/50" 
            data-page-index="${i}"
            aria-label="Goto Page ${i + 1}">
        </button>
    `).join('');

    // 2. 注入 DOM
    container.innerHTML = dotsHTML;

    // 3. ✨ 安全地綁定點擊事件 (使用事件委託 Event Delegation，提升效能)
    // 職責分離：組件負責偵測點擊，main.js 負責處理邏輯
    container.querySelectorAll('.capsule-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const newPageIndex = parseInt(e.target.dataset.pageIndex);
            
            // 如果點擊的不是當前頁面，才執行回呼
            if (newPageIndex !== currentPage && typeof onPageChangeCallback === 'function') {
                console.log(`[CapsuleDots] 點擊分頁: ${newPageIndex + 1}`);
                onPageChangeCallback(newPageIndex);
            }
        });
    });
}
