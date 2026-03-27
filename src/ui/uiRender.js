export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. 生成資料卡片 (補回「立即開啟 >」按鈕)
    const toolsHTML = tools.map(tool => `
        <a href="${tool.link}" target="_blank" class="tool-card p-6 rounded-3xl flex flex-col items-start gap-4 bg-white shadow-sm hover:shadow-md transition-all border border-slate-100">
            <div class="p-3 bg-${tool.colorTheme || 'emerald'}-100 rounded-2xl text-${tool.colorTheme || 'emerald'}-600">
                <i data-lucide="${tool.icon || 'box'}" class="w-6 h-6"></i>
            </div>
            <div class="flex-1">
                <h2 class="text-xl font-bold text-slate-800">${tool.name}</h2>
                <p class="text-sm text-slate-500 mt-1">${tool.description}</p>
            </div>
            
            <div class="flex items-center text-${tool.colorTheme || 'emerald'}-600 font-medium text-sm mt-auto pt-2">
                立即開啟
                <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i>
            </div>
        </a>
    `).join('');

    // 2. 準備你心愛的「即將推出」卡片 (這段維持你原本的)
    const comingSoonHTML = `
        <div class="tool-card p-6 rounded-3xl flex flex-col items-start gap-4 opacity-60 border-dashed border-2 border-slate-200">
            <div class="p-3 bg-slate-100 rounded-2xl text-slate-400">
                <i data-lucide="plus" class="w-6 h-6"></i>
            </div>
            <div>
                <h2 class="text-xl font-bold text-slate-400">即將推出...</h2>
                <p class="text-sm text-slate-400 mt-1">新工具正在醞釀中，敬請期待。</p>
            </div>
        </div>
    `;

    // 3. 注入 HTML (這次會包含資料卡片、按鈕與即將推出)
    container.innerHTML = toolsHTML + comingSoonHTML;

    // 4. 🔥 重新啟動 Lucide 圖示
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
