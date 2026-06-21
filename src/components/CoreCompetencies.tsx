import React from "react";
import { motion } from "motion/react";
import { Cpu, TrendingUp, Paintbrush, Layers, CheckCircle2, Award, ArrowUpRight } from "lucide-react";

interface CoreCompetenciesProps {
  isStandalone?: boolean;
  onBackToHome?: () => void;
}

export default function CoreCompetencies({ isStandalone = false, onBackToHome }: CoreCompetenciesProps) {
  const cards = [
    {
      title: "Data & Metrics",
      icon: <TrendingUp className="w-8 h-8 text-[#a78bfa]" />,
      desc: "CPA, CAC, CPC 등 핵심 마케팅 지표와 공식에 입각한 정량적 데이터 분석 및 디지털 소통 효과 모니터링을 토대로 실리적인 결정을 내립니다.",
      bullets: ["핵심 마케팅 핵심 지표(ROI, ROAS) 추적", "주간/월간 소통 효과 데이터 비교 모니터링", "정밀 계산 공식에 근거한 실행 대안 설계"]
    },
    {
      title: "Practical Design",
      icon: <Paintbrush className="w-8 h-8 text-[#a78bfa]" />,
      desc: "미리캔버스, Figma, Adobe 등 고효율 실무 툴을 활용하여 클라이언트의 비즈니스 목적에 최적인 SNS 카드뉴스 및 OOH 시각 디자인을 제작합니다.",
      bullets: ["가독성 높은 텍스트 레이아웃", "재사용성 높은 템플릿 중심의 모듈식 편집", "감도 높고 세련된 프리미엄 다크 톤 시각화"]
    },
    {
      title: "Strategic Planning",
      icon: <Layers className="w-8 h-8 text-[#a78bfa]" />,
      desc: "2030 등 예민한 타겟층의 심리와 행동 패턴을 깊이 분석하여, 매체 특성에 어울리는 최적의 광고 시나리오와 30장 분량의 방대한 기획서를 작성합니다.",
      bullets: ["사용자 시각적 자극(Visual Cues) 연출 기획", "스토리와 갈등 해결 중심의 카피라이팅", "구조화된 고품질 제안용 PPT 제작"]
    }
  ];

  return (
    <section 
      id="competencies" 
      className={`${isStandalone ? "pt-32 pb-24 min-h-screen" : "py-24 border-t border-[#272735]"} bg-[#121316] relative overflow-hidden`}
    >
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#8b5cf6]/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back option on isolation view */}
        {isStandalone && onBackToHome && (
          <div className="mb-10">
            <button
               onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1b22] text-zinc-400 hover:text-[#a78bfa] hover:bg-[#202128] border border-[#272735] text-xs font-semibold cursor-pointer transition-colors"
            >
              <span>←</span> 메인 홈으로 돌아가기
            </button>
          </div>
        )}

        {/* Title block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#a78bfa] text-xs font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-[#8b5cf6]" />
            CORE CAPABILITIES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            핵심 역량 및 크리에이티브 지표
          </motion.h2>
          <div className="w-12 h-1 bg-[#8b5cf6] mx-auto mt-4 rounded" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed"
          >
            기존의 화려하기만 한 슬로건을 탈피하고, 실용적이고 즉각 적용 가능한 마케팅과 디자인의 정밀 조형적 접점을 실체화합니다.
          </motion.p>
        </div>

        {/* Competencies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{
                default: { duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
                y: { type: "spring", stiffness: 450, damping: 22 },
                scale: { type: "spring", stiffness: 450, damping: 22 }
              }}
              className="group bg-[#1a1b22] rounded-2xl p-8 border border-[#272735] hover:border-[#8b5cf6]/40 hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)] transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Icon wrapper with micro-interactions */}
                <div className="w-14 h-14 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {card.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Bullet list of specs */}
              <ul className="space-y-2 border-t border-[#272735] pt-5 mt-auto">
                {card.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start text-xs text-zinc-300">
                    <span className="text-[#8b5cf6] mr-2 font-black">•</span>
                    <span className="font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Standalone Deep Specs block */}
        {isStandalone && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a1b22] to-[#121316] border border-[#8b5cf6]/20">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8b5cf6]" />
              전문 마케팅 &amp; 디자인 연동 기술 스택 (Expert Tech Stack)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#121316] rounded-xl border border-[#272735]">
                <div className="font-bold text-[#a78bfa] text-[13px] mb-1">인구통계학적 타게팅</div>
                <p className="text-zinc-400 text-xs">20대 여성, 직장인, 특정 서브컬처 중심의 초미세 분석 설계</p>
              </div>
              <div className="p-4 bg-[#121316] rounded-xl border border-[#272735]">
                <div className="font-bold text-[#a78bfa] text-[13px] mb-1">매출 트리거 공식</div>
                <p className="text-zinc-400 text-xs">CTR 극대화를 위한 초반 3초 시야 자극 레이아웃 공식 적용</p>
              </div>
              <div className="p-4 bg-[#121316] rounded-xl border border-[#272735]">
                <div className="font-bold text-[#a78bfa] text-[13px] mb-1">자동화 지표 모니터링</div>
                <p className="text-zinc-400 text-xs">A/B 테스팅 및 유입 전환율 성향 변화 실시간 데이터 시각화</p>
              </div>
              <div className="p-4 bg-[#121316] rounded-xl border border-[#272735]">
                <div className="font-bold text-[#a78bfa] text-[13px] mb-1">디테일 브랜딩 보정</div>
                <p className="text-zinc-400 text-xs">독창적인 시각 조형감, 럭셔리 다크 톤앤매너 완벽 보장</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
