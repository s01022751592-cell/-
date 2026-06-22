import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, Palette, BarChart, FileText, Download, Sparkles, Brain, CheckCircle, Mail, Smartphone, Globe } from "lucide-react";
import { ProfileConfig } from "./admin/AdminSiteSettings";

interface ProfileProps {
  isStandalone?: boolean;
  onBackToHome?: () => void;
  profile?: ProfileConfig;
}

export default function Profile({ isStandalone = false, onBackToHome, profile }: ProfileProps) {
  const defaultProfile: ProfileConfig = {
    name: "신윤섭",
    email: "s01022751592@gmail.com",
    phone: "010-2275-1592",
    summary: "콘텐츠마케터 역량과 영상제작, 콘텐츠기획, SEO, SNS마케팅 능력을 가진 기획자 신윤섭입니다.",
    heroHeadline: "상호작용 데이터를 기반으로 정교한 모니터링 분석 및 트렌디한 디지털 커뮤니케이션을 기획합니다.",
    
    eduYear: "2022. 01 ~ 2028. 01 (졸업예정)",
    eduTitle: "청주대학교 광고홍보학과",
    eduSubtitle: "대학교(4년) 졸업예정",
    
    internYear: "2025. 12 ~ 2026. 02 (3개월)",
    internTitle: "김수현드라마아트홀 인턴",
    internSubtitle: "공식 SNS 채널 관리, 카드뉴스 기획/제작(미리캔버스), 트렌드 정보 제공 및 아카이브실 소장품 홍보.",
    
    intern2Year: "2025. 09 ~ 2025. 12 (4개월)",
    intern2Title: "한국인터넷소통협회 인턴",
    intern2Subtitle: "제18회 대한민국소통어워즈 디지털소통 효과분석 모니터링. 관광 기업 3곳의 상호작용 데이터 진단 및 정량/정성 데이터 분석.",
    
    skillDesign1_name: "Photoshop",
    skillDesign1_level: 90,
    skillDesign1_desc: "시각 디자인 보정, 썸네일 합성 및 키비주얼 그래픽 리터칭",
    skillDesign2_name: "창의성",
    skillDesign2_level: 95,
    skillDesign2_desc: "독창적인 아이디어 기획 및 차별화된 콘텐츠 제작 역량",
    skillDesign3_name: "의사소통",
    skillDesign3_level: 95,
    skillDesign3_desc: "객관적인 데이터 기반 설득 및 원활한 팀 커뮤니케이션",
    
    skillMarketing1_name: "영상제작",
    skillMarketing1_level: 85,
    skillMarketing1_desc: "디지털 채널 숏폼 및 주요 미디어 영상 기획 및 컷편집",
    skillMarketing2_name: "콘텐츠기획",
    skillMarketing2_level: 90,
    skillMarketing2_desc: "타겟 오디언스 분석을 통한 직관적이고 세련된 정보성 콘텐츠 제작",
    
    skillPlanning1_name: "SEO",
    skillPlanning1_level: 85,
    skillPlanning1_desc: "검색 엔진 최적화를 통한 유입 증대 및 키워드 마이닝",
    skillPlanning2_name: "SNS마케팅",
    skillPlanning2_level: 95,
    skillPlanning2_desc: "트렌디한 월간 큐레이션 시리즈 및 브랜드 채널 운영 관리"
  };

  const activeProfile = profile || defaultProfile;

  const timeline = [
    {
      id: "edu",
      year: activeProfile.eduYear || "청주대학교 광고홍보학과",
      badge: "학력",
      icon: <GraduationCap className="w-4 h-4 text-[#a78bfa]" />,
      title: activeProfile.eduTitle || "광고홍보학과 전공 (2022. 01 ~ 2028. 01 졸업예정)",
      subtitle: activeProfile.eduSubtitle || "체계적인 광고 기획 가설 수립 및 홍보 전략, 설득 구조의 기초를 다진 탄탄한 학술적 배경."
    },
    {
      id: "intern",
      year: activeProfile.internYear || "김수현드라마아트홀",
      badge: "인턴",
      icon: <Award className="w-4 h-4 text-[#a78bfa]" />,
      title: activeProfile.internTitle || "인턴 (2025. 12 ~ 2026. 02, 3개월)",
      subtitle: activeProfile.internSubtitle || "공식 SNS 채널을 통해 방문객과 일반 대중에게 유용한 드라마 트렌드 정보를 제공하고, 아카이브실이 보유한 특별한 소장 자료들을 매력적으로 홍보해야 했습니다. 디자인 툴(미리캔버스)을 활용하여 대중의 시선을 사로잡을 수 있는 직관적이고 세련된 정보성 카드뉴스를 시리즈로 기획 및 제작했습니다. 'TV 방영 드라마'와 같은 월간 큐레이션 콘텐츠를 통해 트렌디한 볼거리를 제공하는 한편, 아카이브실 소장품인 '내 남편과 결혼해줘' 대본 소개 시리즈를 시각화하였고 옛드라마 아카이브를 정리하며 sns를 관리하였습니다."
    },
    {
      id: "intern2",
      year: activeProfile.intern2Year || "한국인터넷소통협회",
      badge: "인턴",
      icon: <Award className="w-4 h-4 text-[#a78bfa]" />,
      title: activeProfile.intern2Title || "디지털소통 효과분석 모니터링 인턴 (2025. 09 ~ 2025. 12, 4개월)",
      subtitle: activeProfile.intern2Subtitle || "과학기술정보통신부가 후원하고 (사)한국인터넷소통협회가 주관한 '제18회 대한민국소통어워즈'의 디지털소통 효과분석 모니터링 프로그램에 인턴으로 참여했습니다. 3개월간 관광 기업 3곳의 실무적인 소통 현황을 진단하여 각 브랜드의 콘텐츠가 타겟과 어떻게 상호작용하는지 데이터를 기반으로 분석하여 소통 강점과 약점을 짚어내는 실무를 수행했습니다."
    }
  ];

  const skillsets = [
    {
      category: "Design",
      icon: <Palette className="w-4 h-4 text-pink-400" />,
      skills: [
        { 
          name: activeProfile.skillDesign1_name || "Figma", 
          level: activeProfile.skillDesign1_level ?? 90, 
          desc: activeProfile.skillDesign1_desc || "Figma 기반 화면 설계, 유저 플로우 도출 및 정보 구조화 설계" 
        },
        { 
          name: activeProfile.skillDesign2_name || "미리캔버스", 
          level: activeProfile.skillDesign2_level ?? 95, 
          desc: activeProfile.skillDesign2_desc || "SNS 배너, 상세페이지 템플릿의 고속 기획 및 레이아웃 배치" 
        },
        { 
          name: activeProfile.skillDesign3_name || "Photoshop", 
          level: activeProfile.skillDesign3_level ?? 80, 
          desc: activeProfile.skillDesign3_desc || "시각 디자인 보정, 썸네일 합성 및 키비주얼 그래픽 리터칭" 
        }
      ]
    },
    {
      category: "Data & Marketing",
      icon: <BarChart className="w-4 h-4 text-emerald-400" />,
      skills: [
        { 
          name: activeProfile.skillMarketing1_name || "Google Analytics (GA4)", 
          level: activeProfile.skillMarketing1_level ?? 85, 
          desc: activeProfile.skillMarketing1_desc || "디지털 채널 정량 수치 모니터링 및 퍼널 전환 로그 분석" 
        },
        { 
          name: activeProfile.skillMarketing2_name || "Excel", 
          level: activeProfile.skillMarketing2_level ?? 90, 
          desc: activeProfile.skillMarketing2_desc || "피벗 테이블 설계, 다차원 통계 자료 가공 및 대시보드 구조화" 
        }
      ]
    },
    {
      category: "Planning",
      icon: <Brain className="w-4 h-4 text-blue-400" />,
      skills: [
        { 
          name: activeProfile.skillPlanning1_name || "PPT 기획", 
          level: activeProfile.skillPlanning1_level ?? 95, 
          desc: activeProfile.skillPlanning1_desc || "프레젠테이션 스토리라인 설계, 논리적 제안서 및 기획 문서 작성" 
        },
        { 
          name: activeProfile.skillPlanning2_name || "ChatGPT Prompting", 
          level: activeProfile.skillPlanning2_level ?? 90, 
          desc: activeProfile.skillPlanning2_desc || "맞춤형 페르소나 설정 및 시장 트렌드 마이닝 최적화 프롬프트 설계" 
        }
      ]
    }
  ];

  return (
    <section 
      id="profile" 
      className={`${isStandalone ? "pt-32 pb-24 min-h-screen" : "py-24 border-b border-[#272735]"} bg-[#121316] relative overflow-hidden`}
    >
      {/* Decorative neon gradient glow in background */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/5 blur-[110px] rounded-full pointer-events-none" />

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

        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#a78bfa] text-xs font-bold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            CREATIVE PARTNER
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-white tracking-tight"
          >
            프로필
          </motion.h2>
          <div className="w-12 h-1 bg-[#8b5cf6] rounded-full mx-auto mt-4" />
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Personal Brand Info & Key Career Timeline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Intro Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1b22] rounded-2xl p-6 border border-[#272735] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b5cf6]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6] via-[#a78bfa] to-[#5b21b6] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                  YS
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {activeProfile.name}
                    <span className="text-[10px] uppercase tracking-wide bg-[#8b5cf6]/20 text-[#a78bfa] px-2 py-0.5 rounded font-mono border border-[#8b5cf6]/30">
                      Planner
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">Creative Strategy & Design Practitioner</p>
                </div>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 bg-[#121316]/50 p-4 rounded-xl border border-[#272735]/40">
                "{activeProfile.summary}"
              </p>

              <div className="space-y-3 text-xs text-zinc-400 border-t border-[#272735] pt-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8b5cf6] shrink-0" />
                  <span>{activeProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#8b5cf6] shrink-0" />
                  <span>{activeProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#8b5cf6] shrink-0" />
                  <span className="text-zinc-400">Chongju University, Advertising & PR Major</span>
                </div>
              </div>
            </motion.div>

            {/* Timeline Careers Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#1a1b22] rounded-2xl p-6 border border-[#272735] shadow-xl"
            >
              <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#8b5cf6] rounded-sm inline-block" />
                핵심 이력 타임라인
              </h3>

              <div className="relative border-l border-[#272735] pl-6 ml-3 space-y-8">
                {timeline.map((item) => (
                  <div key={item.id} className="relative">
                    {/* timeline node icon */}
                    <span className="absolute -left-[38px] top-1 bg-[#1a1b22] border border-[#272735] p-1.5 rounded-full z-10 shadow-sm flex items-center justify-center">
                      {item.icon}
                    </span>

                    {/* Timeline contents */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-[#a78bfa]">{item.year}</span>
                        <span className="text-[10px] bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20 px-2 py-0.5 rounded font-semibold">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white mb-1.5">{item.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Skillset progress slider bars */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[#1a1b22] rounded-2xl p-6 sm:p-8 border border-[#272735] shadow-xl"
            >
              <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#8b5cf6] rounded-sm inline-block" />
                보유 핵심 스킬셋
              </h3>
              <p className="text-xs text-zinc-500 mb-8">실무 현장에서 바로 사용가능한 주요 디자인 및 데이터 분석, 전략적 기획 도구 역량입니다.</p>

              <div className="space-y-8">
                {skillsets.map((categoryObj) => (
                  <div key={categoryObj.category} className="space-y-4">
                    {/* Category Title */}
                    <div className="flex items-center gap-1.5 pb-2 border-b border-[#272735]/60">
                      {categoryObj.icon}
                      <span className="text-sm font-bold text-white tracking-wide">{categoryObj.category}</span>
                    </div>

                    {/* Skills list inner container */}
                    <div className="space-y-5">
                      {categoryObj.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-zinc-200">{skill.name}</span>
                            <span className="text-[#a78bfa] font-mono">{skill.level}%</span>
                          </div>
                          
                          {/* Progress track */}
                          <div className="w-full h-2 bg-[#121316] rounded-full overflow-hidden border border-[#272735]/40">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] rounded-full relative"
                            >
                              <div className="absolute right-0 top-0 w-1.5 h-full bg-white opacity-40 blur-[1px]" />
                            </motion.div>
                          </div>
                          
                          {/* Skill description */}
                          <p className="text-[11px] text-zinc-400 font-normal leading-relaxed">{skill.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary note block */}
              <div className="mt-8 p-4 rounded-xl bg-[#121316]/65 border border-[#272735] flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#8b5cf6] shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                  상기 기술 수준은 가상 점수가 아닌, 다양한 OOH/SNS 디자인 프로젝트 제작 및 브랜드 소통 효과 모니터링 주간/최종 분석 보고서 작성 실무를 통해 검증된 수치입니다.
                </p>
              </div>

              {/* Download Resume Button */}
              <div className="mt-6">
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  href="/resume.pdf"
                  download="신윤섭_이력서.pdf"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#fafafa] bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] hover:from-[#c4b5fd] hover:to-[#a78bfa] shadow-md hover:shadow-[0_4px_18px_rgba(139,92,246,0.3)] cursor-pointer text-center no-underline hover:text-white"
                >
                  <Download className="w-4 h-4 text-white" />
                  상세 이력서 다운로드 (PDF)
                </motion.a>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
