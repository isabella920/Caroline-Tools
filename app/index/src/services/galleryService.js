// 定義常數：一個分頁顯示如圖的 6 格布局
const ITEMS_PER_PAGE = 6;

/**
 * 根據頁碼取得該頁的資料子集
 * @param {Array} fullData - 完整的 tools.json 資料
 * @param {number} pageIndex - 當前頁碼 (從 0 開始)
 * @returns {Array} 切割後的資料陣列
 */
export function getPageData(fullData, pageIndex) {
    if (!fullData || fullData.length === 0) return [];
    
    const startIndex = pageIndex * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // JS 陣列切割：包含開頭，不包含結尾
    return fullData.slice(startIndex, endIndex);
}

/**
 * 計算總頁數
 * @param {Array} fullData - 完整的 tools.json 資料
 * @returns {number} 總頁數
 */
export function getTotalPages(fullData) {
    if (!fullData || fullData.length === 0) return 0;
    // 使用 Math.ceil 向上取整 (例如 7 筆資料除以 6 = 1.16，總頁數為 2)
    return Math.ceil(fullData.length / ITEMS_PER_PAGE);
}
