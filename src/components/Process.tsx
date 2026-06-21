import React from "react";
import { motion } from "motion/react";
import { GitCommit, Search, Lightbulb, MessageSquareCode, FileCheck, CheckCircle2, Award } from "lucide-react";

interface ProcessProps {
  isStandalone?: boolean;
  onBackToHome?: () => void;
}

export default function Process({ isStandalone = false, onBackToHome }: ProcessProps) {
  const steps = [
    {
      num: "01",
      title: "데이터 모니터링 및 진단",
      sub: "지표 분석 및 기업(관) 소통 트렌드 파악",
      icon: <Search className="w-5 h-5 text-[#8b5cf6]" />,
      desc: "지상 과제 수행을 위해 현재 캠페인 효율성(CTR, CPC 등)을 측정 및 비교하고 소비자가 선호하는 최적 소통 채널 형태를 파악합니다."
    },
    {
      num: "02",
      title: "타겟 인사이트 도출",
      sub: "2030 등 타겟의 심리와 행동 패턴 분석",
      icon: <Lightbulb className="w-5 h-5 text-[#8b5cf6]" />,
      desc: "고객군의 단순 인구 통계학적 지표를 넘어서 실제 행동 유발 요인하고 무의식 수용 태도를 규명해 맞춤형 가치 고리를 정의합니다."
    },
    {
      num: "03",
      title: "기획 및 카피라이팅",
      sub: "핵심 메시지 추출 및 시나리오, 타이포그래피 기획",
      icon: <MessageSquareCode className="w-5 h-5 text-[#8b5cf6]" />,
      desc: "채널 목적에 어울리는 최상의 슬로건을 조합하고, 텍스트와 시각적 단서(Visual Cues)가 자연스레 매칭되는 디코딩 시나리오를 집필합니다."
    },
    {
      num: "04",
      title: "시각화 및 문서화",
      sub: "디자인 툴을 활용한 직관적인 시각물 제작 및 결과 보고서 완성",
      icon: <FileCheck className="w-5 h-5 text-[#8b5cf6]" />,
      desc: "제출 직후 바로 인쇄 또는 배포 가능한 가독성 최우선의 SNS 카드뉴스 및 최종 프로젝트 기획 결과를 완결 지어 전달합니다."
    }
  ];

  return (
    <section 
      id="process" 
      className={`${isStandalone ? "pt-32 pb-24 min-h-screen" : "py-24 border-y border-zinc-200"} bg-[#eef1f6] relative overflow-hidden`}
    >
      {/* Background soft light gradient accent */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#8b5cf6]/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back option on isolation view */}
        {isStandalone && onBackToHome && (
          <div className="mb-10">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-600 hover:text-[#8b5cf6] hover:bg-zinc-50 border border-zinc-200 text-xs font-semibold cursor-pointer transition-colors"
            >
              <span>←</span> 메인 홈으로 돌아가기
            </button>
          </div>
        )}

        {/* Section title */}
        <div className="text-center mb-20 animate-fade-in">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#8b5cf6] text-xs font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-1.5"
          >
            <GitCommit className="w-3.5 h-3.5 text-[#8b5cf6]" />
            WORKFLOW
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight"
          >
            기획 &amp; 제작 프로세스
          </motion.h2>
          <div className="w-12 h-1 bg-[#8b5cf6] mx-auto mt-4 rounded" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-600 mt-4 text-sm leading-relaxed whitespace-nowrap max-w-none mx-auto block overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            체계적이고 투명한 단계를 밟아 누락 없이 완벽한 컨셉을 일순화하고, 최상의 하이엔드 퀄리티 결과물을 완결 지어 드립니다.
          </motion.p>
        </div>

        {/* Process Steps Visual - Grid layout that acts as timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative mb-12">
          
          {/* Connector Line for desktop layout */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-[#8b5cf6]/10 via-[#8b5cf6]/30 to-[#8b5cf6]/10 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.025 }}
              transition={{
                default: { duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
                y: { type: "spring", stiffness: 450, damping: 22 },
                scale: { type: "spring", stiffness: 450, damping: 22 }
              }}
              className="group relative flex flex-col items-center lg:items-start text-center lg:text-left z-10 bg-white rounded-2xl p-6 border border-zinc-200/85 hover:border-[#8b5cf6]/40 hover:shadow-lg transition-colors duration-150"
            >
              {/* Timeline bubble marker */}
              <div className="flex items-center justify-between w-full mb-6 relative">
                {/* Number tag */}
                <span className="text-3xl font-black text-[#8b5cf6]/25 font-mono tracking-tight select-none group-hover:scale-105 transition-transform duration-300">
                  {step.num}
                </span>

                {/* Centered beautiful circle */}
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#8b5cf6]/60 group-hover:border-[#8b5cf6] flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Step info details */}
              <div className="flex-grow">
                <h3 className="text-base font-extrabold text-zinc-900 mb-1 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <h4 className="text-[#7c3aed] text-xs font-semibold mb-3 leading-relaxed">
                  {step.sub}
                </h4>
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standalone deep process commitment notice */}
        {isStandalone && (
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] font-bold text-xl shrink-0">
                ★
              </span>
              <div>
                <h4 className="text-zinc-900 font-bold text-base mb-1">프리미엄 포트폴리오 보증 품질 약속 (Premium Service Level Agreement)</h4>
                <p className="text-zinc-600 text-xs leading-relaxed max-w-2xl">
                  중간 시안 발송 시 꼼꼼한 피드백 수렴 반영은 물론, 최종 보고서 전달 후 7일 이내 경미한 수치 변동에 따른 디자인 템플릿 미세조정(2회 무상 지원)을 성실히 약속드립니다.
                </p>
              </div>
            </div>
            <div className="text-center font-semibold text-[#8b5cf6] border-l-0 md:border-l border-zinc-200 pl-0 md:pl-6 text-sm flex items-center gap-1 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#8b5cf6]" />
              전 과정 100% 1대1 담당제
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
