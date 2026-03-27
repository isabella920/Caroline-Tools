import { verifyAdmin } from './services/authService.js';
import { showAdminPanel } from './ui/adminUI.js';

document.addEventListener('DOMContentLoaded', () => {
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
