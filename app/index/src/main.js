import { renderTools, initStaticUI } from './ui/uiRender.js';
import { getPageData, getTotalPages } from './services/galleryService.js';
import { renderCapsuleDots } from './components/CapsuleDots.js';
import { verifyAdmin } from './services/authService.js';
import { showAdminPanel } from './ui/adminUI.js';

// 全域狀態：記錄當前頁碼與原始資料
let state = {
    allTools: [],
    currentPage: 0
};

/**
 * 核心：更新畫廊畫面
 */
function updateGallery() {
    // 1. 取得當前頁面該顯示的資料 (Logic)
    const displayData = getPageData(state.allTools, state.currentPage);
    
    // 2. 渲染卡片 (UI)
    renderTools(displayData, 'tool-gallery');
    
    // 3. 渲染分頁點並綁定回呼 (Component)
    const total = getTotalPages(state.allTools);
    renderCapsuleDots('gallery-pagination', total, state.currentPage, (newIndex) => {
        state.currentPage = newIndex; // 更新狀態
        updateGallery();              // 遞迴更新介面
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1. 初始化靜態 UI (Hero, Nav)
    try {
        initStaticUI();
    } catch (e) {
        console.error("靜態初始化失敗:", e);
    }

    // 2. 非同步載入資料
    try {
        const response = await fetch(`./data/tools.json?nocache=${new Date().getTime()}`, {
            cache: "no-store"
        });
        if (!response.ok) throw new Error("資料庫讀取失敗");
        
        state.allTools = await response.json();
        
        // 🚀 啟動畫廊
        updateGallery();
        console.log("✅ 畫廊初始化完成 (3x2 佈局)");
        
    } catch (error) {
        console.error("❌ 載入失敗:", error);
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



import { renderTools, initStaticUI } from './ui/uiRender.js';


document.addEventListener('DOMContentLoaded', async () => {
    // 🚀 1. 確保容器存在後才初始化靜態 UI
    try {
        initStaticUI();
        console.log("✅ 靜態組件初始化成功");
    } catch (e) {
        console.error("❌ 靜態組件初始化失敗，請檢查 HTML 是否有對應 ID:", e);
    }
    // --- 【動態讀取開始】 ---
    try {
        // 去抓你剛剛辛苦寫入的那個檔案 (加個時間戳防止瀏覽器快取舊資料)
        const response = await fetch(`./data/tools.json?nocache=${new Date().getTime()}`, {
    cache: "no-store" // 告訴瀏覽器不要存這份資料
});
        if (!response.ok) throw new Error("找不到資料庫");
        
        const cloudData = await response.json();
        
        // 使用雲端抓回來的資料進行渲染
        renderTools(cloudData, 'tool-gallery');
        console.log("✅ 成功從雲端載入最新工具卡片！");
        
    } catch (error) {
        console.error("❌ 讀取失敗，改用本地備份：", error);
        // 如果雲端抓失敗，可以考慮放個備份或提示
    }
   
