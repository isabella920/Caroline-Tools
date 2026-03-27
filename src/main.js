import { TOOL_DATA } from './constants/config.js';
import { renderTools } from './ui/uiRender.js';
import { handleSecretClick, verifyAdmin } from './services/authService.js';
// 匯入後台 UI
import { showAdminPanel } from './ui/adminUI.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 渲染初始畫面
    renderTools(TOOL_DATA, 'tool-grid');

    // 2. 綁定隱密登入事件
    const secretTrigger = document.getElementById('secret-trigger');
    
    if (secretTrigger) {
        let secretCounter = 0; // 如果 handleSecretClick 沒幫你算，這裡自己算也可以
        
        secretTrigger.addEventListener('click', () => {
            // 這裡假設你的 handleSecretClick 會判斷是否正確使用暗號
            const isTriggered = handleSecretClick(Date.now());
            
            if (isTriggered) {
                const pwd = prompt("🕵️ 進入隱密後台");
                if (verifyAdmin(pwd)) {
                    // 密碼對了，直接啟動後台，不傳參數
                    showAdminPanel(); 
                } else if (pwd !== null) {
                    alert("密碼錯誤。");
                }
            }
        });
    }
});
