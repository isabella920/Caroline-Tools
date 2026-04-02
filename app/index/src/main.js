/**
 * app/index/src/main.js
 * 狀態：已修復嵌套錯誤，整合分頁與管理員邏輯
 */
import { renderTools, initStaticUI } from './ui/uiRender.js';
import { getPageData, getTotalPages } from './services/galleryService.js';
import { renderCapsuleDots } from './components/CapsuleDots.js';
import { verifyAdmin } from './services/authService.js';
import { showAdminPanel } from './ui/adminUI.js';

// 1. 全域狀態管理
let state = {
    allTools: [],
    currentPage: 0
};

// 2. 核心渲染指揮中心 (負責同步更新卡片與分頁點)
function updateGallery() {
    // 從 Service 取得當前頁資料
    const displayData = getPageData(state.allTools, state.currentPage);
    
    // 呼叫 UI 渲染卡片
    renderTools(displayData, 'tool-gallery');
    
    // 渲染分頁膠囊並綁定點擊事件
    const total = getTotalPages(state.allTools);
    renderCapsuleDots('gallery-pagination', total, state.currentPage, (newIndex) => {
        state.currentPage = newIndex;
        updateGallery(); // 遞迴更新
    });
}

// 3. 唯一的入口點
document.addEventListener('DOMContentLoaded', async () => {
    
    // A. 初始化靜態組件 (Hero, Nav)
    try {
        initStaticUI();
    } catch (e) {
        console.error("❌ 靜態初始化失敗:", e);
    }

    // B. 非同步載入工具資料
    try {
        const response = await fetch(`./data/tools.json?nocache=${Date.now()}`, {
            cache: "no-store"
        });
        if (!response.ok) throw new Error("資料庫讀取失敗");
        
        state.allTools = await response.json();
        
        // 啟動畫廊
        updateGallery();
        console.log("✅ 畫廊與分頁系統初始化成功");
        
    } catch (error) {
        console.error("❌ 載入失敗:", error);
    }

    // C. 管理員面板觸發邏輯
    const trigger = document.getElementById('secret-trigger');
    if (trigger) {
        let magic = []; 
        trigger.addEventListener('click', () => {
            const now = Date.now();
            magic.push(now);
            magic = magic.filter(t => now - t < 5000);
            
            if (magic.length >= 5) {
                magic = []; // 觸發後清空
                const val = prompt("Enter Command:");
                if (verifyAdmin(val)) {
                    showAdminPanel();
                }
            }
        });
    }
});
