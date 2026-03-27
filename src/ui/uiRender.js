export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. 先畫出從 GitHub 抓回來的工具
    const toolsHTML = tools.map(tool => `
        <a href="${tool.link}" class="tool-card p-6 rounded-3xl flex flex-col items-start gap-4 bg-white shadow-sm hover:shadow-md transition-all border border-slate-100">
            <div class="p-3 bg-${tool.colorTheme || 'blue'}-100 rounded-2xl text-${tool.colorTheme || 'blue'}-600">
                <i data-lucide="${tool.icon}" class="w-6 h-6"></i>
            </div>
            <div>
                <h2 class="text-xl font-bold text-slate-800">${tool.name}</h2>
                <p class="text-sm text-slate-500 mt-1">${tool.description}</p>
            </div>
        </a>
    `).join('');

    // 2. 在最後面強行加上你心愛的「即將推出」卡片
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

    // 3. 合併注入
    container.innerHTML = toolsHTML + comingSoonHTML;

    // 4. 重新驅動 Lucide 圖示 (這步很重要)
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
