import { renderHeroSection } from '../components/HeroSection.js';
import { renderNavGrid } from '../components/NavGrid.js';

export function initStaticUI() {
    renderHeroSection('hero-container');
    renderNavGrid('nav-grid-container');
}

/**
 * 💡 渲染工具卡片 (僅負責畫出傳入的資料)
 */
export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 依照草圖：卡片應填滿 Grid 格子，使用固定寬度
const toolsHTML = tools.map(tool => `
    <a href="${tool.link}" target="_blank" 
       class="glass-panel p-5 rounded-2xl flex flex-col hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 h-[150px]">
        
        <div class="flex items-start gap-3 mb-2">
            <div class="p-2 bg-white/10 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform">
                <i data-lucide="${tool.icon || 'box'}" class="w-5 h-5"></i>
            </div>
            <h2 class="text-base font-bold text-white leading-tight line-clamp-2">
                ${tool.name}
            </h2>
        </div>

        <p class="text-xs text-white/70 line-clamp-3">
            ${tool.description}
        </p>
    </a>
`).join('');

    container.innerHTML = toolsHTML;

    // 重新繪製 Lucide 圖示
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
