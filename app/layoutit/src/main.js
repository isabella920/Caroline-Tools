import { COMPONENT_LIBRARY } from './constants.js';
import { createBlockElement } from './renderer.js';

const canvas = document.getElementById('canvas');
const sidebar = document.getElementById('sidebar');

// 初始化側邊欄
COMPONENT_LIBRARY.forEach(item => {
  const btn = document.createElement('button');
  btn.innerText = `+ ${item.label}`;
  btn.onclick = () => {
    const newBlock = createBlockElement(item);
    canvas.appendChild(newBlock);
    // 這裡可以呼叫 storage.js 的儲存邏輯
  };
  sidebar.appendChild(btn);
});

// 這裡處理畫布寬度切換邏輯 (1920/768/375)
export const resizeCanvas = (width) => {
  canvas.style.width = `${width}px`;
};
