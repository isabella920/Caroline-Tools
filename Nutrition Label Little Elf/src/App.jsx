import React, { useState } from 'react';

function App() {
  // 1. 【秘密抽屜】用來放你拍的照片
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 2. 【收件小管家】當你選好照片時，他會幫你把照片拿進家裡
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 這行是讓照片能顯示出來的魔法
    }
  };

  // 3. 【傳送按鈕的邏輯】
  const startAnalyze = () => {
    if (!image) {
      alert("請先餵我一張照片喔！📸");
      return;
    }
    alert("嗶嗶嗶！小精靈接收到照片了！下一步我們就要接上 AI 大腦囉！");
  };

  return (
    // 這層 div 是全螢幕的「翡翠綠」背景
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-teal-600 flex flex-col items-center p-4 font-sans text-gray-800">
      
      {/* 頂部標題：你的產品名字 */}
      <header className="py-8 text-center text-white">
        <h1 className="text-4xl font-black tracking-wider mb-2 drop-shadow-md">🚀 營養小精靈</h1>
        <p className="bg-white/20 inline-block px-4 py-1 rounded-full text-xs backdrop-blur-sm">
          Nutrition Elf v3.0 • AI 智慧分析
        </p>
      </header>

      {/* 主卡片：仿生 App 設計，白色圓角大卡片 */}
      <main className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center">
        
        {/* 圖片上傳區：如果沒照片顯示上傳框，有照片就顯示預覽 */}
        <div className="w-full aspect-square relative group">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          
          <div className="w-full h-full border-4 border-dashed border-emerald-100 rounded-3xl flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-emerald-300 bg-emerald-50/30">
            {preview ? (
              <img src={preview} alt="預覽" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">📸</div>
                <p className="text-emerald-700 font-bold">點擊或拖入包裝照片</p>
                <p className="text-gray-400 text-xs mt-2 text-center px-4">
                  支援：產品正面、成分標示、營養成分表
                </p>
              </>
            )}
          </div>
        </div>

        {/* 裝飾用的 AI 晶片旋轉圖示（模擬規格書說的載入體驗） */}
        <div className="flex items-center gap-2 my-6 text-emerald-600">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <span className="text-sm font-medium">小精靈準備就緒</span>
        </div>

        {/* 任務按鈕：點下去就會觸發 AI 分析（目前先噴出提示） */}
        <button 
          onClick={startAnalyze}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-emerald-200 active:scale-95 transition-all text-xl"
        >
          開始白話分析 ✨
        </button>

        <p className="mt-6 text-gray-400 text-[10px] text-center uppercase tracking-widest">
          Powered by Gemini AI • Free Tier
        </p>
      </main>

      {/* 底部導覽（讓它更像手機 App） */}
      <footer className="mt-auto py-6">
        <div className="flex gap-8 text-white/60">
          <span className="text-white border-b-2 border-white pb-1">掃描儀</span>
          <span>歷史紀錄</span>
          <span>健康小食譜</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
