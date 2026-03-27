import { addCardToGithub } from '../services/githubService.js';

export function showAdminPanel() {
    console.log("🚀 後台 UI 正在載入...");

    // 檢查是否已經存在，避免重複彈出
    if (document.getElementById('admin-modal')) return;

    const adminModal = document.createElement('div');
    adminModal.id = 'admin-modal';
    // 使用 fixed 和極高的 z-index 確保它在最前面
    adminModal.className = "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4";
    
    adminModal.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-slate-800 scale-100 transition-transform">
            <h2 class="text-2xl font-bold mb-2">🛠️ 新增工具卡片</h2>
            <p class="text-sm text-slate-500 mb-6">填寫後將自動同步至 GitHub</p>
            
            <div class="space-y-4">
                <input id="n" type="text" placeholder="工具名稱" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <textarea id="d" placeholder="工具描述" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24"></textarea>
                <input id="i" type="text" placeholder="Lucide Icon 名稱 (如: cpu, box)" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                
                <button id="go-btn" class="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                    立即發佈到雲端
                </button>
            </div>
            
            <button id="close-admin" class="mt-4 text-slate-400 text-sm w-full text-center hover:text-slate-600">
                暫不新增，關閉視窗
            </button>
        </div>
    `;

    document.body.appendChild(adminModal);
    console.log("✅ HTML 已注入 body");

    // 綁定關閉事件
    document.getElementById('close-admin').onclick = () => adminModal.remove();

    // 綁定發佈事件
    document.getElementById('go-btn').onclick = async () => {
        const btn = document.getElementById('go-btn');
        const originalText = btn.innerText;
        
        const newData = {
            id: `tool-${Date.now()}`,
            name: document.getElementById('n').value,
            description: document.getElementById('d').value,
            icon: document.getElementById('i').value,
            colorTheme: "emerald",
            link: "#",
            isReady: true
        };

        if (!newData.name || !newData.description) {
            alert("請至少填寫名稱與描述！");
            return;
        }

        try {
            btn.disabled = true;
            btn.innerText = "⏳ 正在拼湊 Token 並上傳...";
            await addCardToGithub(newData);
            btn.innerText = "✅ 上傳成功！";
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error(error);
            alert("發佈失敗，請檢查 Console 報錯");
            btn.disabled = false;
            btn.innerText = originalText;
        }
    };
}
