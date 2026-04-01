import { renderHeroSection } from '../components/HeroSection.js';
import { renderNavGrid } from '../components/NavGrid.js';

// 💡 1. 靜態骨架初始化：由 main.js 啟動時呼叫
export function initStaticUI() {
    renderHeroSection('hero-container');
    renderNavGrid('nav-grid-container');
}

// 💡 2. 動態資料渲染：畫廊模式
export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

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
    
    // 渲染分頁膠囊
    renderPagination(tools.length, 'gallery-pagination');

    // 重新繪製 Lucide 圖示
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// 💡 3. 小工具：渲染膠囊分頁點
function renderPagination(count, paginationId) {
    const container = document.getElementById(paginationId);
    if (!container) return;

    container.innerHTML = Array(count).fill(0).map((_, i) => 
        `<div class="capsule-dot ${i === 0 ? 'active' : ''}"></div>`
    ).join('');
}
