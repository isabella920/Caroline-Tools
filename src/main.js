import { TOOL_DATA } from './constants/config.js';
import { renderTools } from './ui/uiRender.js';
import { handleSecretClick, verifyAdmin } from './services/authService.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 渲染初始畫面
    renderTools(TOOL_DATA, 'tool-grid');

    // 2. 綁定隱密登入事件
    const secretTrigger = document.getElementById('secret-trigger');
    if (secretTrigger) {
        secretTrigger.addEventListener('click', () => {
            const isTriggered = handleSecretClick(Date.now());
            
            if (isTriggered) {
                const pwd = prompt("🕵️ 進入隱密後台 (測試密碼: vibe2026):");
                if (verifyAdmin(pwd)) {
                    alert("登入成功！即將載入後台管理模組...");
                    // 這裡可以跳轉至 admin.html 或動態加載後台組件
                } else if (pwd !== null) {
                    alert("密碼錯誤。");
                }
            }
        });
    }
});
