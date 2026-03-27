import { addCardToGithub } from '../services/githubService.js';

export function showAdminPanel() {
    const adminModal = document.createElement('div');
    adminModal.className = "fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4";
    adminModal.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h2 class="text-2xl font-bold mb-6 text-slate-800">🛠️ 快速新增工具</h2>
            <div class="space-y-4">
                <input id="new-name" type="text" placeholder="工具名稱" class="w-full p-3 border rounded-xl">
                <textarea id="new-desc" placeholder="工具描述" class="w-full p-3 border rounded-xl"></textarea>
                <input id="new-icon" type="text" placeholder="Lucide 圖示名 (如: box, cpu)" class="w-full p-3 border rounded-xl">
                <select id="new-color" class="w-full p-3 border rounded-xl">
                    <option value="emerald">綠色 (Emerald)</option>
                    <option value="blue">藍色 (Blue)</option>
                    <option value="purple">紫色 (Purple)</option>
                    <option value="slate">灰色 (Slate)</option>
                </select>
                <button id="send-to-github" class="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                    <span id="btn-text">立即發佈至 GitHub</span>
                </button>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="mt-4 text-slate-400 text-sm w-full">取消</button>
        </div>
    `;
    document.body.appendChild(adminModal);

    const btn = document.getElementById('send-to-github');
    
    btn.addEventListener('click', async () => {
        // 1. 禁用按鈕防止重複點擊
        btn.disabled = true;
        btn.innerHTML = "傳送中...";

        // 2. 封裝數據
        const newData = {
            id: `tool-${Date.now()}`,
            name: document.getElementById('new-name').value,
            description: document.getElementById('new-desc').value,
            icon: document.getElementById('new-icon').value,
            colorTheme: document.getElementById('new-color').value,
            link: "#",
            isReady: true
        };

        // 3. 呼叫自動化服務
        try {
            await addCardToGithub(newData);
            // 成功後關閉視窗並重新整理
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            alert("發佈失敗，請檢查 Token 或網路狀態");
            btn.disabled = false;
            btn.innerHTML = "重試發佈";
        }
    });
}
}
