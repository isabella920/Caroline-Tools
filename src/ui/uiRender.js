// 【防屎山備註】：這裡只做字串拼接與 DOM 掛載，禁止在這裡發送 API 或處理密碼邏輯。

export function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = tools.map(tool => {
        if (!tool.isReady) {
            return `
            <div class="tool-card p-6 rounded-3xl flex flex-col items-start gap-4 opacity-60 border-dashed border-2 border-slate-200">
                <div class="p-3 bg-${tool.colorTheme}-100 rounded-2xl text-${tool.colorTheme}-400">
                    <i data-lucide="${tool.icon}" class="w-6 h-6"></i>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-${tool.colorTheme}-400">${tool.name}</h2>
                    <p class="text-sm text-${tool.colorTheme}-400 mt-1">${tool.description}</p>
                </div>
            </div>`;
        }

        return `
        <a href="${tool.link}" class="tool-card p-6 rounded-3xl flex flex-col items-start gap-4">
            <div class="p-3 bg-${tool.colorTheme}-100 rounded-2xl text-${tool.colorTheme}-600">
                <i data-lucide="${tool.icon}" class="w-6 h-6"></i>
            </div>
            <div>
                <h2 class="text-xl font-bold text-slate-800">${tool.name}</h2>
                <p class="text-sm text-slate-500 mt-1">${tool.description}</p>
            </div>
            <div class="mt-auto flex items-center text-xs font-bold text-${tool.colorTheme}-600 uppercase tracking-widest">
                立即開啟 <i data-lucide="chevron-right" class="w-4 h-4 ml-1"></i>
            </div>
        </a>`;
    }).join('');

    lucide.createIcons();
}
