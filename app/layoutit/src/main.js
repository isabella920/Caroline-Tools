// 這裡就是你要求的「集中控管」
import { COMPONENT_LIBRARY } from './constants.js';
import { saveLayout, loadLayout } from './storage.js';
import { createBlockElement } from './renderer.js';

const canvas = document.getElementById('canvas');
const menu = document.getElementById('component-menu');
const saveBtn = document.getElementById('btn-save');

let state = {
    blocks: []
};

// 啟動 App
const init = () => {
    // 1. 載入選單
    COMPONENT_LIBRARY.forEach(renderMenuItem);
    
    // 2. 恢復舊有數據
    const saved = loadLayout();
    if (saved) {
        state.blocks = saved;
        refreshCanvas();
    }
    
    // 3. 綁定全域事件
    saveBtn.onclick = () => {
        saveLayout(state.blocks);
        alert('Saved!');
    };
};

const renderMenuItem = (item) => {
    const btn = document.createElement('button');
    btn.innerText = item.label;
    btn.onclick = () => {
        state.blocks.push({ ...item, id: Date.now() });
        refreshCanvas();
    };
    menu.appendChild(btn);
};

const refreshCanvas = () => {
    canvas.innerHTML = '';
    state.blocks.forEach(block => {
        const el = createBlockElement(block);
        canvas.appendChild(el);
    });
};

init();
