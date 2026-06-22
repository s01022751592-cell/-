import React, { useState, useEffect } from "react";
import { 
  Save, RefreshCw, User, Mail, Phone, FileText, CheckCircle 
} from "lucide-react";

export interface ProfileConfig {
  name: string;
  email: string;
  phone: string;
  summary: string;
  heroHeadline: string;
  
  // Education
  eduYear?: string;
  eduTitle?: string;
  eduSubtitle?: string;
  
  // Intern / Awards
  internYear?: string;
  internTitle?: string;
  internSubtitle?: string;

  // Intern 2
  intern2Year?: string;
  intern2Title?: string;
  intern2Subtitle?: string;
  
  // Design Skills
  skillDesign1_name?: string;
  skillDesign1_level?: number;
  skillDesign1_desc?: string;
  skillDesign2_name?: string;
  skillDesign2_level?: number;
  skillDesign2_desc?: string;
  skillDesign3_name?: string;
  skillDesign3_level?: number;
  skillDesign3_desc?: string;
  
  // Data & Marketing Skills
  skillMarketing1_name?: string;
  skillMarketing1_level?: number;
  skillMarketing1_desc?: string;
  skillMarketing2_name?: string;
  skillMarketing2_level?: number;
  skillMarketing2_desc?: string;
  
  // Planning Skills
  skillPlanning1_name?: string;
  skillPlanning1_level?: number;
  skillPlanning1_desc?: string;
  skillPlanning2_name?: string;
  skillPlanning2_level?: number;
  skillPlanning2_desc?: string;
}

interface AdminSiteSettingsProps {
  config: ProfileConfig;
  onUpdateConfig: (updated: ProfileConfig) => void;
  onResetConfig: () => void;
}

export default function AdminSiteSettings({
  config,
  onUpdateConfig,
  onResetConfig,
}: AdminSiteSettingsProps) {
  const [formName, setFormName] = useState(config.name);
  const [formEmail, setFormEmail] = useState(config.email);
  const [formPhone, setFormPhone] = useState(config.phone);
  const [formSummary, setFormSummary] = useState(config.summary);
  const [formHeroHeadline, setFormHeroHeadline] = useState(config.heroHeadline || "체계적인 지표 분석부터 실무형 기획, 시각적 커뮤니케이션까지 확실한 결과물을 만듭니다.");
  
  // Education
  const [eduYear, setEduYear] = useState(config.eduYear ?? "청주대학교");
  const [eduTitle, setEduTitle] = useState(config.eduTitle ?? "광고홍보학과 (2022. 01 ~ 2028. 01 졸업예정)");
  const [eduSubtitle, setEduSubtitle] = useState(config.eduSubtitle ?? "체계적인 광고 기획 가설 수립 및 홍보 전략, 설득 구조의 기초를 다진 탄탄한 학술적 배경.");

  // Intern 1 (김수현드라마아트홀)
  const [internYear, setInternYear] = useState(config.internYear ?? "김수현드라마아트홀");
  const [internTitle, setInternTitle] = useState(config.internTitle ?? "인턴 (2025. 12 ~ 2026. 02, 3개월)");
  const [internSubtitle, setInternSubtitle] = useState(config.internSubtitle ?? "공식 SNS 채널을 통해 방문객과 일반 대중에게 유용한 드라마 트렌드 정보를 제공하고, 아카이브실이 보유한 특별한 소장 자료들을 미리캔버스 등을 활용하여 정보성 카드뉴스 시리즈로 기획/제작했습니다.");

  // Intern 2 (한국인터넷소통협회)
  const [intern2Year, setIntern2Year] = useState(config.intern2Year ?? "한국인터넷소통협회");
  const [intern2Title, setIntern2Title] = useState(config.intern2Title ?? "디지털소통 효과분석 모니터링 인턴 (2025. 09 ~ 2025. 12, 4개월)");
  const [intern2Subtitle, setIntern2Subtitle] = useState(config.intern2Subtitle ?? "과학기술정보통신부가 후원한 '제18회 대한민국소통어워즈'의 모니터링 프로그램에 인턴으로 참여하여 관광 기업 3곳의 상호작용 데이터를 기반으로 진단하며 정량적·정성적 데이터 분석 역량을 길렀습니다.");

  // Design Skill 1
  const [skillDesign1Name, setSkillDesign1Name] = useState(config.skillDesign1_name ?? "Figma");
  const [skillDesign1Level, setSkillDesign1Level] = useState(config.skillDesign1_level ?? 90);
  const [skillDesign1Desc, setSkillDesign1Desc] = useState(config.skillDesign1_desc ?? "Figma 기반 화면 설계, 유저 플로우 도출 및 정보 구조화 설계");
  // Design Skill 2
  const [skillDesign2Name, setSkillDesign2Name] = useState(config.skillDesign2_name ?? "미리캔버스");
  const [skillDesign2Level, setSkillDesign2Level] = useState(config.skillDesign2_level ?? 95);
  const [skillDesign2Desc, setSkillDesign2Desc] = useState(config.skillDesign2_desc ?? "SNS 배너, 상세페이지 템플릿의 고속 기획 및 레이아웃 배치");
  // Design Skill 3
  const [skillDesign3Name, setSkillDesign3Name] = useState(config.skillDesign3_name ?? "Photoshop");
  const [skillDesign3Level, setSkillDesign3Level] = useState(config.skillDesign3_level ?? 80);
  const [skillDesign3Desc, setSkillDesign3Desc] = useState(config.skillDesign3_desc ?? "시각 디자인 보정, 썸네일 합성 및 키비주얼 그래픽 리터칭");

  // Marketing 1
  const [skillMarketing1Name, setSkillMarketing1Name] = useState(config.skillMarketing1_name ?? "Google Analytics (GA4)");
  const [skillMarketing1Level, setSkillMarketing1Level] = useState(config.skillMarketing1_level ?? 85);
  const [skillMarketing1Desc, setSkillMarketing1Desc] = useState(config.skillMarketing1_desc ?? "디지털 채널 정량 수치 모니터링 및 퍼널 전환 로그 분석");
  // Marketing 2
  const [skillMarketing2Name, setSkillMarketing2Name] = useState(config.skillMarketing2_name ?? "Excel");
  const [skillMarketing2Level, setSkillMarketing2Level] = useState(config.skillMarketing2_level ?? 90);
  const [skillMarketing2Desc, setSkillMarketing2Desc] = useState(config.skillMarketing2_desc ?? "피벗 테이블 설계, 다차원 통계 자료 가공 및 대시보드 구조화");

  // Planning 1
  const [skillPlanning1Name, setSkillPlanning1Name] = useState(config.skillPlanning1_name ?? "PPT 기획");
  const [skillPlanning1Level, setSkillPlanning1Level] = useState(config.skillPlanning1_level ?? 95);
  const [skillPlanning1Desc, setSkillPlanning1Desc] = useState(config.skillPlanning1_desc ?? "프레젠테이션 스토리라인 설계, 논리적 제안서 및 기획 문서 작성");
  // Planning 2
  const [skillPlanning2Name, setSkillPlanning2Name] = useState(config.skillPlanning2_name ?? "ChatGPT Prompting");
  const [skillPlanning2Level, setSkillPlanning2Level] = useState(config.skillPlanning2_level ?? 90);
  const [skillPlanning2Desc, setSkillPlanning2Desc] = useState(config.skillPlanning2_desc ?? "맞춤형 페르소나 설정 및 시장 트렌드 마이닝 최적화 프롬프트 설계");

  const [isSaved, setIsSaved] = useState(false);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const isChanged = 
        config.name !== formName.trim() ||
        config.email !== formEmail.trim() ||
        config.phone !== formPhone.trim() ||
        config.summary !== formSummary.trim() ||
        config.heroHeadline !== formHeroHeadline.trim() ||
        config.eduYear !== eduYear.trim() ||
        config.eduTitle !== eduTitle.trim() ||
        config.eduSubtitle !== eduSubtitle.trim() ||
        config.internYear !== internYear.trim() ||
        config.internTitle !== internTitle.trim() ||
        config.internSubtitle !== internSubtitle.trim() ||
        config.intern2Year !== intern2Year.trim() ||
        config.intern2Title !== intern2Title.trim() ||
        config.intern2Subtitle !== intern2Subtitle.trim() ||
        config.skillDesign1_name !== skillDesign1Name.trim() ||
        config.skillDesign1_level !== Number(skillDesign1Level) ||
        config.skillDesign1_desc !== skillDesign1Desc.trim() ||
        config.skillDesign2_name !== skillDesign2Name.trim() ||
        config.skillDesign2_level !== Number(skillDesign2Level) ||
        config.skillDesign2_desc !== skillDesign2Desc.trim() ||
        config.skillDesign3_name !== skillDesign3Name.trim() ||
        config.skillDesign3_level !== Number(skillDesign3Level) ||
        config.skillDesign3_desc !== skillDesign3Desc.trim() ||
        config.skillMarketing1_name !== skillMarketing1Name.trim() ||
        config.skillMarketing1_level !== Number(skillMarketing1Level) ||
        config.skillMarketing1_desc !== skillMarketing1Desc.trim() ||
        config.skillMarketing2_name !== skillMarketing2Name.trim() ||
        config.skillMarketing2_level !== Number(skillMarketing2Level) ||
        config.skillMarketing2_desc !== skillMarketing2Desc.trim() ||
        config.skillPlanning1_name !== skillPlanning1Name.trim() ||
        config.skillPlanning1_level !== Number(skillPlanning1Level) ||
        config.skillPlanning1_desc !== skillPlanning1Desc.trim() ||
        config.skillPlanning2_name !== skillPlanning2Name.trim() ||
        config.skillPlanning2_level !== Number(skillPlanning2Level) ||
        config.skillPlanning2_desc !== skillPlanning2Desc.trim();

      if (isChanged) {
        onUpdateConfig({
          name: formName.trim(),
          email: formEmail.trim(),
          phone: formPhone.trim(),
          summary: formSummary.trim(),
          heroHeadline: formHeroHeadline.trim(),
          
          eduYear: eduYear.trim(),
          eduTitle: eduTitle.trim(),
          eduSubtitle: eduSubtitle.trim(),
          
          internYear: internYear.trim(),
          internTitle: internTitle.trim(),
          internSubtitle: internSubtitle.trim(),

          intern2Year: intern2Year.trim(),
          intern2Title: intern2Title.trim(),
          intern2Subtitle: intern2Subtitle.trim(),
          
          skillDesign1_name: skillDesign1Name.trim(),
          skillDesign1_level: Number(skillDesign1Level),
          skillDesign1_desc: skillDesign1Desc.trim(),
          
          skillDesign2_name: skillDesign2Name.trim(),
          skillDesign2_level: Number(skillDesign2Level),
          skillDesign2_desc: skillDesign2Desc.trim(),
          
          skillDesign3_name: skillDesign3Name.trim(),
          skillDesign3_level: Number(skillDesign3Level),
          skillDesign3_desc: skillDesign3Desc.trim(),
          
          skillMarketing1_name: skillMarketing1Name.trim(),
          skillMarketing1_level: Number(skillMarketing1Level),
          skillMarketing1_desc: skillMarketing1Desc.trim(),
          
          skillMarketing2_name: skillMarketing2Name.trim(),
          skillMarketing2_level: Number(skillMarketing2Level),
          skillMarketing2_desc: skillMarketing2Desc.trim(),
          
          skillPlanning1_name: skillPlanning1Name.trim(),
          skillPlanning1_level: Number(skillPlanning1Level),
          skillPlanning1_desc: skillPlanning1Desc.trim(),
          
          skillPlanning2_name: skillPlanning2Name.trim(),
          skillPlanning2_level: Number(skillPlanning2Level),
          skillPlanning2_desc: skillPlanning2Desc.trim()
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [
    formName, formEmail, formPhone, formSummary, formHeroHeadline,
    eduYear, eduTitle, eduSubtitle,
    internYear, internTitle, internSubtitle,
    intern2Year, intern2Title, intern2Subtitle,
    skillDesign1Name, skillDesign1Level, skillDesign1Desc,
    skillDesign2Name, skillDesign2Level, skillDesign2Desc,
    skillDesign3Name, skillDesign3Level, skillDesign3Desc,
    skillMarketing1Name, skillMarketing1Level, skillMarketing1Desc,
    skillMarketing2Name, skillMarketing2Level, skillMarketing2Desc,
    skillPlanning1Name, skillPlanning1Level, skillPlanning1Desc,
    skillPlanning2Name, skillPlanning2Level, skillPlanning2Desc,
    config, onUpdateConfig
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      summary: formSummary.trim(),
      heroHeadline: formHeroHeadline.trim(),
      
      eduYear: eduYear.trim(),
      eduTitle: eduTitle.trim(),
      eduSubtitle: eduSubtitle.trim(),
      
      internYear: internYear.trim(),
      internTitle: internTitle.trim(),
      internSubtitle: internSubtitle.trim(),

      intern2Year: intern2Year.trim(),
      intern2Title: intern2Title.trim(),
      intern2Subtitle: intern2Subtitle.trim(),
      
      skillDesign1_name: skillDesign1Name.trim(),
      skillDesign1_level: Number(skillDesign1Level),
      skillDesign1_desc: skillDesign1Desc.trim(),
      
      skillDesign2_name: skillDesign2Name.trim(),
      skillDesign2_level: Number(skillDesign2Level),
      skillDesign2_desc: skillDesign2Desc.trim(),
      
      skillDesign3_name: skillDesign3Name.trim(),
      skillDesign3_level: Number(skillDesign3Level),
      skillDesign3_desc: skillDesign3Desc.trim(),
      
      skillMarketing1_name: skillMarketing1Name.trim(),
      skillMarketing1_level: Number(skillMarketing1Level),
      skillMarketing1_desc: skillMarketing1Desc.trim(),
      
      skillMarketing2_name: skillMarketing2Name.trim(),
      skillMarketing2_level: Number(skillMarketing2Level),
      skillMarketing2_desc: skillMarketing2Desc.trim(),
      
      skillPlanning1_name: skillPlanning1Name.trim(),
      skillPlanning1_level: Number(skillPlanning1Level),
      skillPlanning1_desc: skillPlanning1Desc.trim(),
      
      skillPlanning2_name: skillPlanning2Name.trim(),
      skillPlanning2_level: Number(skillPlanning2Level),
      skillPlanning2_desc: skillPlanning2Desc.trim()
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("설정을 기본값(신윤섭 기획자 프로필)으로 원복하시겠습니까?")) {
      onResetConfig();
      setTimeout(() => {
        setFormName("신윤섭");
        setFormEmail("s01022751592@gmail.com");
        setFormPhone("010-2275-1592");
        setFormSummary("인턴 및 대외활동 실무 경험과 다양한 홍보/기획 역량을 보유한 실무형 크리에이티브 파트너 신윤섭입니다. 데이터 분석, 카드뉴스 제작 및 기획서 서술력을 바탕으로 고객 맞춤형 커뮤니케이션 성과를 창출합니다.");
        setFormHeroHeadline("체계적인 지표 분석부터 실무형 기획, 시각적 커뮤니케이션까지 확실한 결과물을 만듭니다.");
        
        setEduYear("청주대학교");
        setEduTitle("광고홍보학과 (2022. 01 ~ 2028. 01 졸업예정)");
        setEduSubtitle("체계적인 광고 기획 가설 수립 및 홍보 전략, 설득 구조의 기초를 다진 탄탄한 학술적 배경.");
        
        setInternYear("김수현드라마아트홀");
        setInternTitle("인턴 (2025. 12 ~ 2026. 02, 3개월)");
        setInternSubtitle("공식 SNS 채널을 통해 방문객과 일반 대중에게 유용한 드라마 트렌드 정보를 제공하고, 아카이브실이 보유한 특별한 소장 자료들을 미리캔버스 등을 활용하여 정보성 카드뉴스 시리즈로 기획/제작했습니다.");

        setIntern2Year("한국인터넷소통협회");
        setIntern2Title("디지털소통 효과분석 모니터링 인턴 (2025. 09 ~ 2025. 12, 4개월)");
        setIntern2Subtitle("과학기술정보통신부가 후원한 '제18회 대한민국소통어워즈'의 모니터링 프로그램에 인턴으로 참여하여 관광 기업 3곳의 상호작용 데이터를 기반으로 진단하며 정량적·정성적 데이터 분석 역량을 길렀습니다.");
        
        setSkillDesign1Name("Figma");
        setSkillDesign1Level(90);
        setSkillDesign1Desc("Figma 기반 화면 설계, 유저 플로우 도출 및 정보 구조화 설계");
        setSkillDesign2Name("미리캔버스");
        setSkillDesign2Level(95);
        setSkillDesign2Desc("SNS 배너, 상세페이지 템플릿의 고속 기획 및 레이아웃 배치");
        setSkillDesign3Name("Photoshop");
        setSkillDesign3Level(80);
        setSkillDesign3Desc("시각 디자인 보정, 썸네일 합성 및 키비주얼 그래픽 리터칭");
        
        setSkillMarketing1Name("Google Analytics (GA4)");
        setSkillMarketing1Level(85);
        setSkillMarketing1Desc("디지털 채널 정량 수치 모니터링 및 퍼널 전환 로그 분석");
        setSkillMarketing2Name("Excel");
        setSkillMarketing2Level(90);
        setSkillMarketing2Desc("피벗 테이블 설계, 다차원 통계 자료 가공 및 대시보드 구조화");
        
        setSkillPlanning1Name("PPT 기획");
        setSkillPlanning1Level(95);
        setSkillPlanning1Desc("프레젠테이션 스토리라인 설계, 논리적 제안서 및 기획 문서 작성");
        setSkillPlanning2Name("ChatGPT Prompting");
        setSkillPlanning2Level(90);
        setSkillPlanning2Desc("맞춤형 페르소나 설정 및 시장 트렌드 마이닝 최적화 프롬프트 설계");
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Panel Intro Header */}
      <div className="bg-[#131418] border border-zinc-800 p-5 rounded-xl">
        <h4 className="text-white text-xs font-bold flex items-center gap-1.5">
          <User className="w-4 h-4 text-[#8b5cf6]" />
          포트폴리오 프로필 &amp; 사이트 기본 정보 설정 (CMS Manager)
        </h4>
        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
          메인 화면의 머리글 브랜드명, 꼬리글, 연락채널, 그리고 소개글을 직접 커스터마이징하고 변경할 수 있습니다. 저장된 내용은 즉각 반영됩니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dynamic visual alerts */}
        {isSaved && (
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>설정이 실시간 저장되었습니다! 이제 홈페이지에서 바로 확인하실 수 있습니다.</span>
          </div>
        )}

        <div className="bg-[#1a1b22] border border-[#272735] rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Owner Name field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#8b5cf6]" />
                기획자 / 브랜드 대표명 *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full bg-[#121316] border border-[#272735] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
                placeholder="예: 홍길동"
              />
            </div>

            {/* Owner Headline field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#8b5cf6]" />
                히어로 타이틀 키라인 서브 슬로건 *
              </label>
              <input
                type="text"
                value={formHeroHeadline}
                onChange={(e) => setFormHeroHeadline(e.target.value)}
                required
                className="w-full bg-[#121316] border border-[#272735] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
                placeholder="검색 페이지 하단 슬로건 멘트 메인 문구"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email contact field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#8b5cf6]" />
                대표 연락채널 공식 이메일 *
              </label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                className="w-full bg-[#121316] border border-[#272735] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6] font-mono"
                placeholder="예: contact@domain.com"
              />
            </div>

            {/* Phone contact field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#8b5cf6]" />
                실시간 핫라인 전화번호 *
              </label>
              <input
                type="text"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                required
                className="w-full bg-[#121316] border border-[#272735] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6] font-mono"
                placeholder="예: 010-XXXX-XXXX"
              />
            </div>
          </div>

          {/* Introduce Summary Textbox */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#8b5cf6]" />
              자기소개 메인 서술 요약글 (Footer &amp; Profile 노출 텍스트) *
            </label>
            <textarea
              value={formSummary}
              onChange={(e) => setFormSummary(e.target.value)}
              required
              rows={4}
              className="w-full bg-[#121316] border border-[#272735] rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-[#8b5cf6] leading-relaxed resize-none font-normal"
              placeholder="본인의 대외 활동 경력 기획 혹은 OOH 역량 정보 등을 포괄적으로 기재하세요."
            />
          </div>
        </div>

        {/* EDUCATION & EXPERIENCE EDIT SECTION */}
        <div className="bg-[#1a1b22] border border-[#272735] rounded-xl p-5 space-y-4">
          <h5 className="text-white text-xs font-bold border-b border-zinc-800 pb-2.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-[#8b5cf6] rounded-sm" />
            주요 학력 및 대외활동/인턴 경험 설정
          </h5>

          {/* Education */}
          <div className="space-y-4 p-4 rounded-lg bg-[#121316]/40 border border-[#272735]/40">
            <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wide">Category: 학력 (Education)</p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">학교 / 기관</label>
                <input type="text" value={eduYear} onChange={e=>setEduYear(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">전공 및 기간</label>
                <input type="text" value={eduTitle} onChange={e=>setEduTitle(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-6">
                <label className="block text-[10px] text-zinc-500 mb-0.5">세부 설명</label>
                <textarea rows={2} value={eduSubtitle} onChange={e=>setEduSubtitle(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300 resize-none" />
              </div>
            </div>
          </div>

          {/* Intern 1 */}
          <div className="space-y-4 p-4 rounded-lg bg-[#121316]/40 border border-[#272735]/40">
            <p className="text-[10px] text-sky-400 font-extrabold uppercase tracking-wide">Category: 인턴 1 (Experience 1)</p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">소속 / 기관명</label>
                <input type="text" value={internYear} onChange={e=>setInternYear(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역할 및 기간</label>
                <input type="text" value={internTitle} onChange={e=>setInternTitle(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-6">
                <label className="block text-[10px] text-zinc-500 mb-0.5">세부 설명</label>
                <textarea rows={2} value={internSubtitle} onChange={e=>setInternSubtitle(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300 resize-none" />
              </div>
            </div>
          </div>

          {/* Intern 2 */}
          <div className="space-y-4 p-4 rounded-lg bg-[#121316]/40 border border-[#272735]/40">
            <p className="text-[10px] text-sky-400 font-extrabold uppercase tracking-wide">Category: 인턴 2 (Experience 2)</p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">소속 / 기관명</label>
                <input type="text" value={intern2Year} onChange={e=>setIntern2Year(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역할 및 기간</label>
                <input type="text" value={intern2Title} onChange={e=>setIntern2Title(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-6">
                <label className="block text-[10px] text-zinc-500 mb-0.5">세부 설명</label>
                <textarea rows={2} value={intern2Subtitle} onChange={e=>setIntern2Subtitle(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300 resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE SKILLSET EDIT SECTION */}
        <div className="bg-[#1a1b22] border border-[#272735] rounded-xl p-5 space-y-4">
          <h5 className="text-white text-xs font-bold border-b border-zinc-800 pb-2.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-[#8b5cf6] rounded-sm" />
            핵심 스킬 레벨 &amp; 상세 설명 설정 (Design, Marketing, Planning)
          </h5>

          {/* 1. 디자인 영역 */}
          <div className="space-y-4 p-4 rounded-lg bg-[#121316]/40 border border-[#272735]/40">
            <p className="text-[10px] text-pink-400 font-extrabold uppercase tracking-wide">Category: Design (Figma, 미리캔버스, Photoshop)</p>
            
            {/* Design Skill 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3 border-b border-[#272735]/40">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillDesign1Name} onChange={e=>setSkillDesign1Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillDesign1Level} onChange={e=>setSkillDesign1Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillDesign1Desc} onChange={e=>setSkillDesign1Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

            {/* Design Skill 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3 border-b border-[#272735]/40">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillDesign2Name} onChange={e=>setSkillDesign2Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillDesign2Level} onChange={e=>setSkillDesign2Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillDesign2Desc} onChange={e=>setSkillDesign2Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

            {/* Design Skill 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillDesign3Name} onChange={e=>setSkillDesign3Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillDesign3Level} onChange={e=>setSkillDesign3Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillDesign3Desc} onChange={e=>setSkillDesign3Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

          </div>

          {/* 2. 마케팅 & 데이터 영역 */}
          <div className="space-y-4 p-4 rounded-lg bg-[#121316]/40 border border-[#272735]/40">
            <p className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wide">Category: Data &amp; Marketing (GA, Excel)</p>
            
            {/* Marketing Skill 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3 border-b border-[#272735]/40">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillMarketing1Name} onChange={e=>setSkillMarketing1Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillMarketing1Level} onChange={e=>setSkillMarketing1Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillMarketing1Desc} onChange={e=>setSkillMarketing1Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

            {/* Marketing Skill 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillMarketing2Name} onChange={e=>setSkillMarketing2Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillMarketing2Level} onChange={e=>setSkillMarketing2Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillMarketing2Desc} onChange={e=>setSkillMarketing2Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

          </div>

          {/* 3. 제안 및 기획 영역 */}
          <div className="space-y-4 p-4 rounded-lg bg-[#121316]/40 border border-[#272735]/40">
            <p className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wide">Category: Planning (PPT 기획, ChatGPT 프롬프팅)</p>
            
            {/* Planning Skill 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pb-3 border-b border-[#272735]/40">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillPlanning1Name} onChange={e=>setSkillPlanning1Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillPlanning1Level} onChange={e=>setSkillPlanning1Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillPlanning1Desc} onChange={e=>setSkillPlanning1Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

            {/* Planning Skill 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-3">
                <label className="block text-[10px] text-zinc-500 mb-0.5">스킬 이름</label>
                <input type="text" value={skillPlanning2Name} onChange={e=>setSkillPlanning2Name(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-0.5">역량치 (%)</label>
                <input type="number" min="0" max="100" value={skillPlanning2Level} onChange={e=>setSkillPlanning2Level(Number(e.target.value))} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-white" />
              </div>
              <div className="md:col-span-7">
                <label className="block text-[10px] text-zinc-500 mb-0.5">상세 설명</label>
                <input type="text" value={skillPlanning2Desc} onChange={e=>setSkillPlanning2Desc(e.target.value)} className="w-full bg-[#1a1b22] border border-[#272735] rounded p-1.5 text-xs text-zinc-300" />
              </div>
            </div>

          </div>

        </div>

        {/* Action controllers */}
        <div className="flex justify-between items-center bg-[#131418] p-3 rounded-lg border border-[#272735]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-red-500/20 text-[10px] font-bold text-zinc-400 hover:text-red-400 rounded cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-500/60" />
            초기 기본 프로필로 복원
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#8b5cf6]/10 text-[#a78bfa] font-extrabold text-xs rounded-lg">
              <CheckCircle className="w-3.5 h-3.5 animate-pulse" />
              자동 저장됨
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              수동 저장
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
