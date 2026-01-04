
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Monitor, 
  Cpu, 
  Zap, 
  BarChart3, 
  ShieldCheck,
  BrainCircuit,
  Settings,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { SLIDES } from './constants';
import { SlideContent, ChartData } from './types';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insightText, setInsightText] = useState('');
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    let interval: any;
    if (isAutoPlay) {
      interval = setInterval(nextSlide, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  const fetchInsights = async () => {
    if (isGeneratingInsight) return;
    setIsGeneratingInsight(true);
    setShowInsights(true);
    setInsightText('正在调用 Gemini 3 进行深度分析...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const current = SLIDES[currentSlide];
      const prompt = `基于以下PPT页面内容，提供一份深度技术洞察：
      标题：${current.title}
      子标题：${current.subtitle || ''}
      要点：${current.points?.join(', ') || ''}
      
      请从硬件底层逻辑、网络协议演进或未来趋势中任选一个维度进行扩充解释，字数在150字左右。用专业且前瞻性的语气。`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "你是一位全球顶尖的硬件安全与网络协议研究员。你说话风格专业、严谨且富有洞察力。",
          temperature: 0.7
        }
      });
      
      setInsightText(response.text || '无法生成见解，请稍后重试。');
    } catch (error) {
      console.error(error);
      setInsightText('获取洞察失败，请检查 API 配置。');
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const currentData = SLIDES[currentSlide];

  return (
    <div className="flex flex-col h-screen w-full select-none bg-slate-950 overflow-hidden relative">
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800 flex">
        {SLIDES.map((_, i) => (
          <div 
            key={i} 
            className={`h-full transition-all duration-300 ${i <= currentSlide ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-transparent'}`} 
            style={{ width: `${100 / SLIDES.length}%` }}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Dynamic Slide Component */}
        <div className="w-full max-w-6xl z-10 animate-in fade-in zoom-in duration-500">
          <SlideRenderer slide={currentData} />
        </div>
      </div>

      {/* Floating Insights Sidebar */}
      {showInsights && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-80 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-6 z-50 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center gap-2 text-cyan-400 font-bold">
              <BrainCircuit className="w-5 h-5" /> Gemini 深度洞察
            </h3>
            <button onClick={() => setShowInsights(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {insightText}
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="h-20 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-8 border-t border-slate-800/50">
        <div className="flex items-center gap-6">
          <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">
            {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>
          <h2 className="text-slate-300 font-medium hidden sm:block truncate max-w-xs">{currentData.title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={fetchInsights}
            className={`p-3 rounded-xl transition-all ${isGeneratingInsight ? 'bg-cyan-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400'}`}
            title="获取 Gemini 深度见解"
          >
            <BrainCircuit className="w-5 h-5" />
          </button>
          <div className="h-6 w-[1px] bg-slate-700 mx-2" />
          <button 
            onClick={prevSlide}
            className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`p-3 rounded-xl transition-all ${isAutoPlay ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          >
            {isAutoPlay ? <Zap className="w-6 h-6 animate-pulse" /> : <Monitor className="w-6 h-6" />}
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SlideRenderer: React.FC<{ slide: SlideContent }> = ({ slide }) => {
  switch (slide.type) {
    case 'title':
      return (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8 border border-cyan-500/20">
            <Cpu className="w-4 h-4" /> 深度技术研究报告
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-transparent leading-tight">
            {slide.title}
          </h1>
          <p className="text-2xl md:text-3xl text-slate-400 font-light mb-12">{slide.subtitle}</p>
          <div className="w-32 h-1.5 bg-cyan-500 mx-auto rounded-full shadow-[0_0_15px_#06b6d4]" />
          {slide.details && <p className="mt-12 text-slate-500 max-w-2xl mx-auto leading-relaxed">{slide.details}</p>}
        </div>
      );
    
    case 'content':
      return (
        <div>
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 text-white">
            <div className="w-2 h-10 bg-cyan-500 rounded-full" />
            {slide.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ul className="space-y-6">
              {slide.points?.map((point, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 text-sm font-bold group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  <p className="text-xl text-slate-300 leading-relaxed group-hover:text-white transition-colors">{point}</p>
                </li>
              ))}
            </ul>
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex items-center justify-center min-h-[300px] shadow-inner">
               <ShieldCheck className="w-48 h-48 text-cyan-500/20 stroke-[1px]" />
            </div>
          </div>
        </div>
      );

    case 'chart':
      return (
        <div>
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 text-white">
            <div className="w-2 h-10 bg-cyan-500 rounded-full" />
            {slide.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slide.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend />
                  {slide.id === 'aes-ni-perf' ? (
                    <>
                      <Bar dataKey="performance" name="性能提升倍数" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="energy" name="能耗百分比 (%)" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    </>
                  ) : slide.id === 'avx512-pqc' ? (
                    <>
                      <Bar dataKey="纯C" fill="#64748b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="AVX2" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="AVX-512" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="公钥" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="密文" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="签名" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center">
              <ul className="space-y-4">
                {slide.points?.map((point, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                    <p className="text-slate-400 text-sm leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-cyan-500/5 rounded-2xl border border-cyan-500/10">
                <div className="flex items-center gap-3 text-cyan-400 font-bold mb-2">
                  <BarChart3 className="w-5 h-5" /> 数据结论
                </div>
                <p className="text-xs text-slate-500 italic">
                  根据实验数据，硬件加速不仅是性能的提升，更是后量子加密广泛落地的前置条件。
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div>
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 text-white">
            <div className="w-2 h-10 bg-cyan-500 rounded-full" />
            {slide.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                <Monitor className="w-6 h-6" /> {slide.comparison?.left.title}
              </h3>
              <ul className="space-y-4">
                {slide.comparison?.left.points.map((p, i) => (
                  <li key={i} className="text-slate-300 flex gap-3">
                    <span className="text-cyan-500 font-bold">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-purple-500/30 transition-all group">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6" /> {slide.comparison?.right.title}
              </h3>
              <ul className="space-y-4">
                {slide.comparison?.right.points.map((p, i) => (
                  <li key={i} className="text-slate-300 flex gap-3">
                    <span className="text-purple-500 font-bold">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    case 'summary':
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center text-white">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slide.points?.map((point, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-slate-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2 italic">“在硬件加速器的加持下，安全的后量子连接正在变得像传统连接一样轻快且高效。”</h3>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default App;
