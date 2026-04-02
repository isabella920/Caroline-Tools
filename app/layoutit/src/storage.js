const STORAGE_KEY = 'VIBE_LAYOUT_DATA';

/**
 * 職責：將目前的區塊陣列儲存至 LocalStorage
 * 為什麼不在這裡處理 DOM？ 為了 SoC，這裡只管數據 (Data)。
 */
export const saveLayout = (blocks) => {
  try {
    const data = JSON.stringify(blocks);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error("儲存失敗：", err);
  }
};

/**
 * 職責：讀取儲存的佈局
 * @returns {Array} 之前的佈局數據，若無則回傳空陣列
 */
export const loadLayout = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * 職責：清空畫布
 */
export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
