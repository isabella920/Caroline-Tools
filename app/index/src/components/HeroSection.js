export function renderHeroSection(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="flex flex-col justify-between h-full space-y-8">
            <div>
                <div id="secret-trigger" class="glass-panel inline-flex p-4 rounded-2xl mb-6 cursor-pointer hover:bg-white/20 transition">
                    <i data-lucide="clock" class="w-10 h-10 text-white"></i>
                </div>
                <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-3 drop-shadow-md">
                    可蘿嵐的小箱箱
                </h1>
                <p class="text-white/80 text-lg">存活於互聯網邊緣的實用小站</p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border-l-4 border-white">
                <p class="text-white/90 italic leading-relaxed">
                    "不敢打開信封啊。因為，打開了就結束了啊。" <br>
                    <span class="block mt-2 text-right text-sm opacity-70">-「旋風管家」</span>
                </p>
            </div>
        </div>
    `;
}
