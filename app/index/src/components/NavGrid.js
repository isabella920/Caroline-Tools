export function renderNavGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-white/50 min-h-[120px] border border-white/10 border-dashed hover:bg-white/5 transition cursor-pointer">
                <i data-lucide="layout-template" class="w-8 h-8 mb-2"></i>
                <span class="text-sm font-bold tracking-widest">COMING SOON</span>
            </div>
            <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-white/50 min-h-[120px] border border-white/10 border-dashed hover:bg-white/5 transition cursor-pointer">
                <i data-lucide="sparkles" class="w-8 h-8 mb-2"></i>
                <span class="text-sm font-bold tracking-widest">COMING SOON</span>
            </div>
        </div>
    `;
}
