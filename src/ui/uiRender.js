export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. 生成資料卡片
    const toolsHTML = tools.map(tool => `
        <a href="${tool.link}" target="_blank" class="tool-card p-6 rounded-3xl flex flex-col items-start gap-4 bg-white shadow-sm hover:shadow-md transition-all border border-slate-100">
            <div class="p-3 bg-${tool.colorTheme || 'blue'}-100 rounded-2xl text-${tool.colorTheme || 'blue'}-600">
                <i data-lucide="${tool.icon || 'box'}" class="w-6 h-6"></i>
            </div>
            <div>
                <h2 class="text-xl font-bold text-slate-800">${tool.name}</h2>
                <p class="text-sm text-slate-500 mt-1">${tool.description}</p>
            </div>
        </a>
    `).join('');

    // 2. 準備你心愛的「即將推出」卡片
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

    // 3. 注入 HTML (這會覆蓋原本的內容)
    container.innerHTML = toolsHTML + comingSoonHTML;

    // 4. 🔥 重點中的重點：手動觸發 Lucide 渲染
    if (window.lucide) {
        window.lucide.createIcons();
        console.log("✨ Lucide 圖示已重新渲染");
    }
}
