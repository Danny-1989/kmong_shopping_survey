import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ChevronRight, CheckCircle2, AlertCircle, ShoppingBag, Camera, 
  Layout, MessageSquare, ArrowRight, TrendingUp, Instagram, 
  Search, Zap, Users, PlayCircle, MousePointerClick
} from 'lucide-react';

// --- Kmong Brand Theme Colors ---
const COLORS = {
  primary: '#92FA72',
  primaryDark: '#5DD877',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  enterprise: '#1787FF',
  biz: '#01A77E',
  unse: '#6E00FF',
};

const App = () => {
  const [step, setStep] = useState('intro'); // intro, quiz, result
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [answers, setAnswers] = useState({
    channel: '', // 입점몰, 자사몰
    branding: null, // 예, 아니오
    visual: null,
    detailPage: null,
    reliability: null
  });

  const quizzes = [
    {
      id: 'channel',
      question: "네이버/쿠팡 같은 곳에 입점하셨나요?\n아니면 자사몰을 만드셨나요?",
      options: [
        { label: '입점몰', value: '입점몰', desc: '네이버 스마트스토어, 쿠팡 등' },
        { label: '자사몰', value: '자사몰', desc: '카페24, 아임웹, 식스샵 등' }
      ]
    },
    {
      id: 'branding',
      question: "쇼핑몰의 얼굴인 로고와\n쇼핑몰 이름은 정하셨나요?",
      options: [
        { label: '예', value: true },
        { label: '아니오', value: false }
      ]
    },
    {
      id: 'visual',
      question: "판매할 제품의 사진과 영상을\n매력적으로 보이게 찍으셨나요?",
      options: [
        { label: '예', value: true },
        { label: '아니오', value: false }
      ]
    },
    {
      id: 'detailPage',
      question: "제품, 고객, 사이트 특성을 고려한\n상세페이지를 제작하셨나요?",
      options: [
        { label: '예', value: true },
        { label: '아니오', value: false }
      ]
    },
    {
      id: 'reliability',
      question: "제품의 첫 번째 신뢰를 나타낼 수 있는\n리뷰는 작성되어 있나요?",
      options: [
        { label: '예', value: true },
        { label: '아니오', value: false }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const currentQuiz = quizzes[currentQuizIdx];
    setAnswers(prev => ({ ...prev, [currentQuiz.id]: value }));
    
    if (currentQuizIdx < quizzes.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const resetQuiz = () => {
    setStep('intro');
    setCurrentQuizIdx(0);
    setAnswers({
      channel: '',
      branding: null,
      visual: null,
      detailPage: null,
      reliability: null
    });
  };

  // --- Components ---

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kmong_logo.svg/1024px-Kmong_logo.svg.png" 
          alt="kmong" 
          className="h-5"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/100x20?text=kmong'; }}
        />
      </div>
      <button className="text-sm font-medium text-gray-600">로그인</button>
    </header>
  );

  const IntroSection = () => (
    <div className="flex flex-col items-center px-6 py-12 text-center bg-white">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-[#92FA72]">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Expert" />
        </div>
        <div className="absolute -right-16 -top-4 bg-black text-white text-xs px-3 py-2 rounded-2xl rounded-bl-none shadow-lg animate-bounce">
          안녕하세요 대표님! 👋
        </div>
      </div>
      
      <h1 className="text-2xl font-bold leading-tight mb-4 text-black">
        온라인 쇼핑몰 사업을 시작한<br />
        <span className="text-[#5DD877]">대표님을 위한 전문가의 가이드</span>
      </h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        지금 쇼핑몰 전문가 김크몽 님의<br />
        맞춤 가이드를 확인해보세요.
      </p>

      <div className="bg-[#F9FAFB] p-5 rounded-2xl mb-8 w-full max-w-sm border border-gray-100">
        <p className="text-sm text-gray-700 italic">
          "현재 상황을 알려주시면 가장 필요한 솔루션을 제안해 드릴게요."
        </p>
      </div>

      <button 
        onClick={() => setStep('quiz')}
        className="w-full max-w-sm py-4 bg-black text-[#92FA72] font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xl shadow-lime-100"
      >
        진단 시작하기 <ChevronRight size={20} />
      </button>
    </div>
  );

  const QuizSection = () => {
    const currentQuiz = quizzes[currentQuizIdx];
    const progress = ((currentQuizIdx + 1) / quizzes.length) * 100;

    return (
      <div className="px-6 py-10 min-h-[60vh] flex flex-col">
        <div className="w-full bg-gray-100 h-1.5 rounded-full mb-10">
          <div 
            className="bg-[#92FA72] h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-bold text-[#5DD877] mb-2 uppercase tracking-wider">Step {currentQuizIdx + 1}</span>
        <h2 className="text-xl font-bold mb-10 whitespace-pre-wrap leading-snug">
          {currentQuiz.question}
        </h2>

        <div className="space-y-3 mt-auto">
          {currentQuiz.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.value)}
              className="w-full p-5 text-left bg-white border border-gray-200 rounded-2xl hover:border-[#92FA72] hover:bg-lime-50 transition-all flex items-center justify-between group shadow-sm"
            >
              <div>
                <div className="font-bold text-gray-900">{opt.label}</div>
                {opt.desc && <div className="text-xs text-gray-500 mt-1">{opt.desc}</div>}
              </div>
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#92FA72] group-hover:border-[#92FA72]">
                <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const ResultSection = () => {
    const isSuccess = answers.branding && answers.visual;
    const needsDetail = !answers.detailPage;
    const needsReview = !answers.reliability;

    return (
      <div className="bg-gray-50 pb-20">
        {/* Result Header */}
        <div className="bg-white px-6 py-12 text-center border-b border-gray-100">
          <div className="inline-block p-2 bg-lime-100 rounded-full mb-4">
            <CheckCircle2 size={32} className="text-[#5DD877]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">진단 결과가 나왔습니다!</h2>
          <div className="flex items-start gap-4 p-5 bg-[#F9FAFB] rounded-2xl mt-6 text-left border border-gray-100">
            <div className="w-12 h-12 shrink-0 rounded-full bg-gray-200 overflow-hidden border border-white">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Expert" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1">김크몽 전문가의 한마디</p>
              <p className="text-sm leading-relaxed text-gray-800">
                "대표님은 쇼핑몰을 시작하기 위한 기본 준비는 어느 정도 하셨네요! 하지만 들어온 고객을 <span className="font-bold text-black border-b-2 border-[#92FA72]">‘구매’</span>로 연결하는 마지막 한 끗이 부족합니다. 설득력 있는 구성으로 매출을 일으켜보세요."
              </p>
            </div>
          </div>
        </div>

        {/* Status Blocks */}
        <div className="px-4 py-8 space-y-6">
          {/* Prepared Items */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-[#5DD877]">✅</span> 이미 준비된 항목
                </h3>
                <ChevronRight size={18} className="text-gray-400 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#5DD877]" /> 
                  로고 제작 / 사진 촬영 / 영상 촬영
                </div>
                <div className="p-3 bg-lime-50 rounded-lg text-xs text-[#01A77E]">
                  "이미 훌륭한 비즈니스 자산을 갖고 계시네요! 이를 어떻게 활용할지 아래 가이드를 확인하세요."
                </div>
              </div>
            </details>
          </div>

          {/* Action Items */}
          <h3 className="font-bold text-lg px-2">지금 바로 보완이 필요한 항목</h3>

          {/* Detail Page Solution */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">1</span>
              <h4 className="font-bold">고객을 설득할 상세페이지 제작</h4>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#92FA72]">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                <span className="font-bold text-black">Guide:</span> "정교하게 설계된 상세페이지는 24시간 일하는 최고의 영업사원이에요. 제품 속성과 플랫폼 특성을 고려해 제작해보세요."
              </p>
              
              <div className="space-y-3">
                <ExpertCard 
                  title="[구매전환율 200% 상승] 기획형 상세페이지" 
                  expert="전문가 A" 
                  tag="Best"
                  price="150,000원~"
                />
                <ExpertCard 
                  title="[트렌디 디자인] 감성 패션/뷰티 상세페이지" 
                  expert="전문가 B" 
                  tag="디자인"
                  price="200,000원~"
                />
              </div>
            </div>
          </div>

          {/* Review Solution */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">2</span>
              <h4 className="font-bold">고객에게 신뢰를 주는 초기 리뷰</h4>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#5DD877]">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                <span className="font-bold text-black">Guide:</span> "리뷰 0과 1의 차이는 고객 설득에 엄청난 차이를 만듭니다. 초기 브랜드 성패를 가르는 리뷰 관리를 지금 시작하세요."
              </p>
              
              <div className="space-y-3">
                <ExpertCard 
                  title="실구매자 기반 고퀄리티 포토 리뷰 체험단" 
                  expert="전문가 D" 
                  tag="마케팅"
                  price="50,000원~"
                />
                <ExpertCard 
                  title="업종별 맞춤 가이드 리뷰 이벤트 대행" 
                  expert="전문가 E" 
                  tag="인기"
                  price="80,000원~"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Roadmap */}
        <div className="px-4 mt-10">
          <div className="bg-black rounded-3xl p-8 text-white relative overflow-hidden">
            <TrendingUp className="absolute -right-4 -top-4 opacity-10 w-32 h-32" />
            <h3 className="text-xl font-bold mb-2">운영 준비가 되었다면 다음은 마케팅입니다.</h3>
            <p className="text-gray-400 text-sm mb-8">목적에 맞춰 최적의 마케팅을 진행하세요.</p>
            
            <div className="space-y-4">
              <MarketingItem 
                icon={<Instagram size={18} />} 
                target="이미지와 소통이 중요하다면" 
                title="SNS 관리" 
              />
              <MarketingItem 
                icon={<Search size={18} />} 
                target="플랫폼 상단 노출을 원한다면" 
                title="검색 노출" 
              />
              <MarketingItem 
                icon={<Zap size={18} />} 
                target="단기 매출 폭발이 필요하다면" 
                title="핫딜 바이럴" 
              />
              <MarketingItem 
                icon={<Users size={18} />} 
                target="강력한 트렌드 형성이 필요하다면" 
                title="인플루언서" 
              />
              <MarketingItem 
                icon={<PlayCircle size={18} />} 
                target="숏폼으로 고객을 사로잡으려면" 
                title="숏폼 제작" 
              />
              <MarketingItem 
                icon={<MousePointerClick size={18} />} 
                target="고객 유입을 극대화하려면" 
                title="퍼포먼스 광고" 
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-10 flex flex-col gap-4">
          <button 
            onClick={resetQuiz}
            className="w-full py-4 border border-gray-300 font-bold rounded-xl text-gray-600 bg-white"
          >
            다시 진단하기
          </button>
          <button className="w-full py-4 bg-[#92FA72] text-black font-bold rounded-xl shadow-lg">
            전체 전문가 리스트 보기
          </button>
        </div>
      </div>
    );
  };

  const ExpertCard = ({ title, expert, tag, price }) => (
    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-1.5 py-0.5 bg-white text-[10px] font-bold border border-gray-200 rounded text-gray-500">{tag}</span>
          <span className="text-[10px] font-medium text-gray-400">{expert}</span>
        </div>
        <div className="text-sm font-bold text-gray-900 group-hover:text-[#5DD877] transition-colors">{title}</div>
        <div className="text-xs font-bold mt-1 text-gray-900">{price}</div>
      </div>
      <ArrowRight size={16} className="text-gray-300 group-hover:text-[#92FA72] transition-colors" />
    </div>
  );

  const MarketingItem = ({ icon, target, title }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#92FA72]">
          {icon}
        </div>
        <div>
          <div className="text-[10px] text-gray-400">{target}</div>
          <div className="text-sm font-bold">{title}</div>
        </div>
      </div>
      <div className="text-[10px] font-bold flex items-center gap-1 group-hover:text-[#92FA72]">
        바로가기 <ChevronRight size={12} />
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#F9FAFB] px-6 py-10 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-400 mb-6 leading-relaxed">
          <span>(주)크몽</span>
          <span className="text-gray-200">|</span>
          <span>서울시 서초구 사임당로 157, 3층</span>
          <span className="text-gray-200">|</span>
          <span>대표 : 박현호, 김태헌</span>
          <span className="text-gray-200">|</span>
          <span>사업자등록번호 : 613-81-65278 <a href="#" className="underline">사업자 정보확인</a></span>
          <span className="text-gray-200">|</span>
          <span>통신판매업신고 : 2018-서울서초-2134</span>
          <span className="text-gray-200">|</span>
          <span>유료직업소개사업등록번호 : 제2021-3210195-14-5-00035호</span>
          <span className="text-gray-200">|</span>
          <span>고객센터 : 1544-6254</span>
          <span className="text-gray-200">|</span>
          <span>호스팅 사업자: Amazon Web Service(AWS)</span>
          <span className="text-gray-200">|</span>
          <a href="#" className="underline">1:1 문의하기</a>
          <span className="text-gray-200">|</span>
          <span>help@kmong.com</span>
        </div>

        <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">
          (주)크몽은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
        </p>
        
        <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">
          (주)크몽 사이트의 상품/전문가/이벤트 정보, 디자인 및 화면의 구성, UI 등의 무단복제, 배포, 방송 또는 전송, 스크래핑 등의 행위는 저작권법, 콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다. <a href="#" className="underline font-bold">안내 보기</a>
        </p>

        <p className="text-[10px] text-gray-400 leading-relaxed">
          (주)크몽은 선불전자지급수단에 대해 지급보증보험에 가입하여 안전하게 보호하고 있습니다. <a href="#" className="underline font-bold">가입 사실 확인</a>
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 max-w-[480px] mx-auto shadow-2xl relative">
      <Header />
      
      <main className="transition-all duration-300">
        {step === 'intro' && <IntroSection />}
        {step === 'quiz' && <QuizSection />}
        {step === 'result' && <ResultSection />}
      </main>

      <Footer />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
