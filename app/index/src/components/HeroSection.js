export function renderHeroSection(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="flex flex-col justify-between h-full space-y-8">
            <div>
                <div class="flex items-center gap-4 mb-6">
                    <div id="secret-trigger" class="glass-panel inline-flex p-4 rounded-2xl cursor-pointer hover:bg-white/20 transition shrink-0">
                        <i data-lucide="clock" class="w-10 h-10 text-white"></i>
                    </div>
                    
                    <div>
                        <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
                            可蘿嵐的小箱箱
                        </h1>
                        <p class="text-white/60 text-sm tracking-wide uppercase mt-1">Caroline's tool</p>
                    </div>
                </div>

                <p class="text-white/80 text-lg ml-2 border-l-2 border-white/20 pl-4">
                    存活於互聯網邊緣的實用小站
                </p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border-l-4 border-white shadow-xl" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px);">
                <p class="text-white/90 italic leading-relaxed">
                    "不敢打開信封啊。因為，打開了就結束了啊。" <br>
                    <span class="block mt-2 text-right text-sm opacity-70">-「旋風管家」</span>
                </p>
            </div>
        </div>
    `;
    
    // 記得觸發 Lucide 圖示渲染
    if (window.lucide) window.lucide.createIcons();
}
