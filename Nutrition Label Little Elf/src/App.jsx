import React, { useState } from 'react';

// 【導師筆記】這段程式碼新增了「跟 AI 講話」的神經系統
function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // 用來存放 AI 的分析結果

  const API_KEY = import.meta.env.VITE_GEMINI_KEY;

  // 1. 【翻譯官】把你的照片轉成 AI 聽得懂的 Base64 格式
  const fileToGenerativePart = async (file) => {
    const base64Promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return { inlineData: { data: await base64Promise, mimeType: file.type } };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // 2. 【核心大腦】呼叫 Gemini API
  const startAnalyze = async () => {
    if (!image) return alert("請先投遞照片喔！📸");
    
    setLoading(true);
    try {
      const imagePart = await fileToGenerativePart(image);
      
      // 這是你規格書要求的「系統指令」
      const prompt = "你是一位幽默但專業的營養師小精靈。請讀取這張食品標示圖片，分析營養與成分，並以『純 JSON 格式』回覆（不要 Markdown）。結構需包含：productName, verdict (含 title, color: red|green|yellow), highlights (陣列), advice (含 target, warning, action)。請用大眾秒懂的白話文。";

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }, imagePart] }]
        })
      });

      const data = await response.json();

      // 🛑 額度檢查：如果 API 噴出 429 錯誤
      if (response.status === 429) {
        alert("🚨 額度用完啦！小精靈今天累壞了，請明天再試，或更換 API Key。");
        return;
      }

      // 解析 AI 回傳的文字（把它從字串變回物件）
      const aiText = data.candidates[0].content.parts[0].text;
      const cleanJson = JSON.parse(aiText.replace(/```json|```/g, ""));
      setResult(cleanJson);

    } catch (error) {
      console.error("分析失敗", error);
      alert("嗚嗚，小精靈斷線了...請檢查網路或 API Key。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-teal-600 flex flex-col items-center p-4 font-sans text-gray-800">
      <header className="py-8 text-center text-white">
        <h1 className="text-4xl font-black tracking-wider mb-2 drop-shadow-md">🚀 營養小精靈</h1>
        <p className="bg-white/20 inline-block px-4 py-1 rounded-full text-xs">V3.0 AI 智慧分析模式</p>
      </header>

      <main className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center">
        
        {/* 上傳與預覽區 */}
        <div className="w-full aspect-square relative group mb-6">
          <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
          <div className="w-full h-full border-4 border-dashed border-emerald-100 rounded-3xl flex flex-col items-center justify-center overflow-hidden bg-emerald-50/30">
            {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="text-center">📸<p className="text-emerald-700 font-bold text-sm">點擊上傳照片</p></div>}
          </div>
        </div>

        {/* 按鈕與狀態 */}
        <button 
          onClick={startAnalyze}
          disabled={loading}
          className={`w-full py-5 rounded-2xl shadow-xl font-extrabold text-xl transition-all ${loading ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95'}`}
        >
          {loading ? "小精靈正在思考中..." : "開始白話分析 ✨"}
        </button>

        {/* 3. 【結果顯示區】當 AI 回話時，這裡會長出來 */}
        {result && (
          <div className="w-full mt-8 border-t-2 border-emerald-50 pt-6 animate-fade-in">
            <div className={`text-center p-4 rounded-2xl mb-4 ${result.verdict.color === 'red' ? 'bg-red-50 text-red-600' : result.verdict.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <h2 className="text-2xl font-bold">{result.productName}</h2>
              <p className="text-lg font-black mt-1">「{result.verdict.title}」</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-emerald-800">📝 小精靈的筆記：</h3>
              {result.highlights.map((h, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-xl text-sm">
                  <span className={h.type === 'bad' ? 'text-red-500' : 'text-emerald-500'}>【{h.label}】</span> {h.value} - {h.desc}
                </div>
              ))}
            </div>

            <div className="mt-6 bg-emerald-600 text-white p-4 rounded-2xl text-sm italic">
              💡 建議：{result.advice.action}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
