// app/index/src/ui/adminUI.js
import { addCardToGithub } from '../services/githubService.js';

/**
 * 單一職責：渲染玻璃擬態風格的後台管理彈窗
 */
export function showAdminPanel() {
    if (document.getElementById('admin-modal')) return;

    const adminModal = document.createElement('div');
    adminModal.id = 'admin-modal';
    // 💡 強化背景遮罩：使用更深一點的模糊感
    adminModal.className = "fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-300";
    
    adminModal.innerHTML = `
        <div class="glass-panel p-8 max-w-md w-full rounded-3xl shadow-2xl text-white animate-in zoom-in duration-300 border border-white/20">
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-white/10 rounded-lg">
                    <i data-lucide="settings" class="w-6 h-6 text-white"></i>
                </div>
                <h2 class="text-2xl font-bold">管理小箱箱</h2>
            </div>
            <p class="text-sm text-white/60 mb-6">新增工具卡片並同步至 GitHub 倉庫</p>
            
            <div class="space-y-4">
                <input id="n" type="text" placeholder="工具名稱 (如: ChatGPT)" 
                    class="w-full p-3 bg-white/10 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40">
                
                <textarea id="d" placeholder="工具描述" 
                    class="w-full p-3 bg-white/10 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40 h-20"></textarea>
                
                <div class="grid grid-cols-2 gap-4">
                    <input id="i" type="text" placeholder="Lucide 圖示名" 
                        class="w-full p-3 bg-white/10 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40">
                    
                    <select id="c" class="w-full p-3 bg-white/10 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-white/30 text-white appearance-none">
                        <option value="emerald" class="text-slate-800">翡翠綠 (Emerald)</option>
                        <option value="blue" class="text-slate-800">天空藍 (Blue)</option>
                        <option value="purple" class="text-slate-800">丁香紫 (Purple)</option>
                        <option value="amber" class="text-slate-800">琥珀橙 (Amber)</option>
                        <option value="rose" class="text-slate-800">玫瑰紅 (Rose)</option>
                    </select>
                </div>

                <input id="l" type="text" placeholder="工具網址 (https://...)" 
                    class="w-full p-3 bg-white/10 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40">
                
                <button id="go-btn" class="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                    <i data-lucide="send" class="w-5 h-5"></i>
                    確認發佈
                </button>
            </div>
            
            <button id="close-admin" class="mt-6 text-white/40 text-sm w-full text-center hover:text-white/80 transition-colors">
                取消並返回
            </button>
        </div>
    `;

    document.body.appendChild(adminModal);

    // 重新驅動圖示渲染
    if (window.lucide) window.lucide.createIcons();

    // 事件監聽邏輯 (保持原樣，僅微調 UI 反饋)
    document.getElementById('close-admin').onclick = () => {
        adminModal.classList.add('fade-out', 'zoom-out');
        setTimeout(() => adminModal.remove(), 200);
    };

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

        if (!newData.name || !newData.link) {
            alert("名稱和網址是必填的喔！");
            return;
        }

        try {
            btn.disabled = true;
            btn.innerHTML = `<i class="animate-spin" data-lucide="loader-2"></i> 正在同步至 GitHub...`;
            if (window.lucide) window.lucide.createIcons();
            
            await addCardToGithub(newData);
            
            btn.innerText = "✅ 發佈成功！";
            setTimeout(() => window.location.reload(), 800);
        } catch (error) {
            console.error(error);
            alert("發佈失敗：" + error.message);
            btn.disabled = false;
            btn.innerText = "重新發佈";
        }
    };
}
