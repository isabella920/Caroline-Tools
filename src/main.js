import { renderTools } from './ui/uiRender.js';
import { verifyAdmin } from './services/authService.js';
import { showAdminPanel } from './ui/adminUI.js';

document.addEventListener('DOMContentLoaded', async () => {
    // --- 【動態讀取開始】 ---
    try {
        // 去抓你剛剛辛苦寫入的那個檔案 (加個時間戳防止瀏覽器快取舊資料)
        const response = await fetch(`./data/tools.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("找不到資料庫");
        
        const cloudData = await response.json();
        
        // 使用雲端抓回來的資料進行渲染
        renderTools(cloudData, 'tool-grid');
        console.log("✅ 成功從雲端載入最新工具卡片！");
        
    } catch (error) {
        console.error("❌ 讀取失敗，改用本地備份：", error);
        // 如果雲端抓失敗，可以考慮放個備份或提示
    }
    const trigger = document.getElementById('secret-trigger');
    if (!trigger) return;
    let magic = []; 

    trigger.addEventListener('click', () => {
        const now = Date.now();
        // 每次點擊存入時間
        magic.push(now);
        if (magic.length > 5) magic.shift();
        if (magic.length === (2 + 3) && (magic[4] - magic[0] < 2000)) {
            magic = []; // 清空
            const val = prompt("Enter Command:");
            if (verifyAdmin(val)) {
                showAdminPanel();
            }
        }
    });
});
