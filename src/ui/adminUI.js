// src/ui/adminUI.js
import { addCardToGithub } from '../services/githubService.js';

export function showAdminPanel() {
    if (document.getElementById('admin-modal')) return;

    const adminModal = document.createElement('div');
    adminModal.id = 'admin-modal';
    adminModal.className = "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4";
    
    adminModal.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-slate-800 animate-in fade-in zoom-in duration-300">
            <h2 class="text-2xl font-bold mb-2">🛠️ 新增工具卡片</h2>
            <p class="text-sm text-slate-500 mb-6">請填寫完整資訊以同步至雲端</p>
            
            <div class="space-y-4">
                <input id="n" type="text" placeholder="工具名稱 (如: ChatGPT)" class="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                <textarea id="d" placeholder="工具描述" class="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 h-20"></textarea>
                
                <input id="l" type="text" placeholder="工具網址 (https://...)" class="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                
                <div class="flex gap-2">
                    <input id="i" type="text" placeholder="Lucide Icon (如: link)" class="flex-1 p-3 border rounded-xl outline-none">
                    <select id="c" class="p-3 border rounded-xl outline-none bg-white">
                        <option value="blue">藍色</option>
                        <option value="emerald">綠色</option>
                        <option value="rose">紅色</option>
                        <option value="amber">橘色</option>
                        <option value="purple">紫色</option>
                    </select>
                </div>
                
                <button id="go-btn" class="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
                    確認發佈
                </button>
            </div>
            
            <button id="close-admin" class="mt-4 text-slate-400 text-sm w-full text-center hover:text-slate-600">
                關閉
            </button>
        </div>
    `;

    document.body.appendChild(adminModal);

    document.getElementById('close-admin').onclick = () => adminModal.remove();

    document.getElementById('go-btn').onclick = async () => {
        const btn = document.getElementById('go-btn');
        
        // 抓取所有欄位的值
        const newData = {
            id: `tool-${Date.now()}`,
            name: document.getElementById('n').value.trim(),
            description: document.getElementById('d').value.trim(),
            link: document.getElementById('l').value.trim() || "#", // 抓取網址
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
            btn.innerText = "⏳ 正在同步至 GitHub...";
            await addCardToGithub(newData);
            btn.innerText = "✅ 發佈成功！";
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error(error);
            alert("發佈失敗：" + error.message);
            btn.disabled = false;
            btn.innerText = "重試";
        }
    };
}
