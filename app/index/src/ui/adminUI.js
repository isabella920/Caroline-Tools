import { addCardToGithub } from '../services/githubService.js';

export function showAdminPanel() {
    if (document.getElementById('admin-modal')) return;

    const adminModal = document.createElement('div');
    adminModal.id = 'admin-modal';
    // 背景遮罩
    adminModal.className = "fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999] p-4";
    
    adminModal.innerHTML = `
        <div class="glass-panel p-8 max-w-md w-full rounded-3xl shadow-2xl text-white border border-white/20">
            <h2 class="text-2xl font-bold mb-6">管理小箱箱</h2>
            
            <div class="space-y-4">
                <input id="n" type="text" placeholder="工具名稱" class="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none">
                <textarea id="d" placeholder="工具描述" class="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white h-20 outline-none"></textarea>
                
                <div class="relative w-full">
                    <button id="custom-select-trigger" type="button" class="w-full p-3 bg-zinc-50/20 border border-white/10 rounded-xl flex items-center justify-between text-white hover:bg-white/20 transition-all">
                        <span id="select-label">選擇主題配色</span>
                        <i data-lucide="chevron-down" class="w-4 h-4 opacity-50"></i>
                    </button>
                    
                    <div id="select-options" class="hidden absolute top-full left-0 w-full mt-2 glass-panel rounded-2xl overflow-hidden z-[10000] border border-white/20 shadow-2xl">
                        <div class="option-item p-3 hover:bg-white/10 cursor-pointer flex items-center gap-2" data-value="emerald"><span class="w-3 h-3 rounded-full bg-emerald-400"></span> 翡翠綠 (Emerald)</div>
                        <div class="option-item p-3 hover:bg-white/10 cursor-pointer flex items-center gap-2" data-value="blue"><span class="w-3 h-3 rounded-full bg-blue-400"></span> 天空藍 (Blue)</div>
                        <div class="option-item p-3 hover:bg-white/10 cursor-pointer flex items-center gap-2" data-value="purple"><span class="w-3 h-3 rounded-full bg-purple-400"></span> 丁香紫 (Purple)</div>
                    </div>
                    <input type="hidden" id="c" value="emerald">
                </div>

                <input id="l" type="text" placeholder="工具網址" class="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none">
                <input id="i" type="text" placeholder="Lucide 圖示名" class="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none">
                
                <button id="go-btn" class="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                    確認發佈
                </button>
            </div>
            <button id="close-admin" class="mt-6 text-white/40 text-sm w-full text-center hover:text-white/80 transition-colors">取消</button>
        </div>
    `;

    document.body.appendChild(adminModal);

    // --- 這裡就是你問的 2. 的位置 ---
    const trigger = document.getElementById('custom-select-trigger');
    const optionsPanel = document.getElementById('select-options');
    const hiddenInput = document.getElementById('c');
    const selectLabel = document.getElementById('select-label');

    trigger.onclick = (e) => {
        e.stopPropagation();
        optionsPanel.classList.toggle('hidden');
    };

    document.querySelectorAll('.option-item').forEach(item => {
        item.onclick = () => {
            const val = item.getAttribute('data-value');
            hiddenInput.value = val;
            selectLabel.textContent = item.textContent;
            optionsPanel.classList.add('hidden');
        };
    });

    window.onclick = () => { if(optionsPanel) optionsPanel.classList.add('hidden'); };
    if (window.lucide) window.lucide.createIcons();

    // 關閉邏輯
    document.getElementById('close-admin').onclick = () => adminModal.remove();

    // 發佈邏輯
    document.getElementById('go-btn').onclick = async () => {
        const btn = document.getElementById('go-btn');
        const newData = {
            id: `tool-${Date.now()}`,
            name: document.getElementById('n').value.trim(),
            description: document.getElementById('d').value.trim(),
            link: document.getElementById('l').value.trim() || "#",
            icon: document.getElementById('i').value.trim() || "box",
            colorTheme: document.getElementById('c').value,
            isReady: true
        };
        try {
            btn.disabled = true;
            btn.innerText = "⏳ 正在同步...";
            await addCardToGithub(newData);
            btn.innerText = "✅ 成功！";
            setTimeout(() => window.location.reload(), 1000);
        } catch (e) {
            alert(e.message);
            btn.disabled = false;
            btn.innerText = "重新發佈";
        }
    };
}
