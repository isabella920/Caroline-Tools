export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 先清除舊的動態卡片
    const oldDynamicCards = container.querySelectorAll('.dynamic-card');
    oldDynamicCards.forEach(card => card.remove());

    const toolsHTML = tools.map(tool => `
        <a href="${tool.link}" target="_blank" class="dynamic-card tool-card p-6 rounded-3xl flex flex-col items-start gap-4 bg-white shadow-sm hover:shadow-md transition-all border border-slate-100">
            <div class="p-3 bg-${tool.colorTheme || 'emerald'}-100 rounded-2xl text-${tool.colorTheme || 'emerald'}-600">
                <i data-lucide="${tool.icon || 'box'}" class="w-6 h-6"></i>
            </div>
            <div class="flex-1">
                <h2 class="text-xl font-bold text-slate-800">${tool.name}</h2>
                <p class="text-sm text-slate-500 mt-1">${tool.description}</p>
            </div>
            
            <div class="flex items-center text-${tool.colorTheme || 'emerald'}-600 font-medium text-sm mt-2">
                立即開啟
                <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i>
            </div>
        </a>
    `).join('');

    // 使用 insertAdjacentHTML 塞到「即將推出」的前面
    container.insertAdjacentHTML('afterbegin', toolsHTML);

    // 重新驅動 Lucide (包含新加入的 chevron-right)
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
