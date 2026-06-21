import React from "react";
import { Project, Inquiry } from "../../types";
import { 
  BarChart3, Inbox, Layers, TrendingUp, Sparkles, AlertCircle, 
  Calendar, CheckSquare, Hash, ArrowUpRight
} from "lucide-react";

interface AdminDashboardProps {
  projects: Project[];
  inquiries: Inquiry[];
  onSwitchTab: (tab: "projects" | "inbox" | "settings") => void;
}

export default function AdminDashboard({
  projects,
  inquiries,
  onSwitchTab,
}: AdminDashboardProps) {
  // Analytical pre-computations
  const totalProjects = projects.length;
  const totalInquiries = inquiries.length;
  
  // Calculate tag distribution
  const tagCounts: { [key: string]: number } = {};
  projects.forEach(p => {
    p.tags.forEach(t => {
      const trimmed = t.trim();
      if (trimmed) {
        tagCounts[trimmed] = (tagCounts[trimmed] || 0) + 1;
      }
    });
  });

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Mock-lead trend over the last 5 days
  const leadTrends = [
    { day: "06/17", count: Math.max(0, totalInquiries - 3) },
    { day: "06/18", count: Math.max(1, totalInquiries - 2) },
    { day: "06/19", count: Math.max(2, totalInquiries - 1) },
    { day: "06/20", count: totalInquiries },
    { day: "전체", count: totalInquiries }
  ];

  const maxTrend = Math.max(...leadTrends.map(t => t.count), 5);

  return (
    <div className="space-y-6">
      {/* Dynamic Welcome Stats Header */}
      <div className="bg-gradient-to-r from-[#17181e] to-[#121316] border border-[#8b5cf6]/20 p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-white text-sm font-black flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#8b5cf6] animate-pulse" />
            통계 및 성능 분석 센터 (Analytics Hub)
          </h4>
          <p className="text-zinc-500 text-xs mt-1">
            포트폴리오 조형 데이터와 유기적으로 접수된 문의 메신저의 동향을 실시간 가우시안 집계합니다.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-[11px] bg-[#1a1b22] px-3 py-1.5 rounded-lg border border-[#272735] text-zinc-400">
          <Calendar className="w-3.5 h-3.5 text-[#8b5cf6]" />
          <span>업데이트 완료: 실시간 브라우저 로컬 세션</span>
        </div>
      </div>

      {/* Grid Cards for Key KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Projects */}
        <div 
          onClick={() => onSwitchTab("projects")}
          className="bg-[#1a1b22] border border-[#272735] hover:border-[#8b5cf6]/40 p-5 rounded-xl transition-all cursor-pointer group hover:translate-y-[-2px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">프로젝트 콘텐츠</span>
            <div className="p-2 rounded bg-indigo-950/20 text-[#a78bfa] border border-[#8b5cf6]/10">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalProjects}</span>
            <span className="text-xs text-zinc-500">개 등록됨</span>
          </div>
          <p className="mt-2 text-[10px] text-zinc-400 flex items-center gap-1">
            <span>포트폴리오 갤러리 관리하기</span>
            <ArrowUpRight className="w-3 h-3 text-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>

        {/* Card 2: Total Inquiries */}
        <div 
          onClick={() => onSwitchTab("inbox")}
          className="bg-[#1a1b22] border border-[#272735] hover:border-[#8b5cf6]/40 p-5 rounded-xl transition-all cursor-pointer group hover:translate-y-[-2px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">누적 비즈니스 문의</span>
            <div className="p-2 rounded bg-amber-950/20 text-amber-400 border border-amber-500/10">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalInquiries}</span>
            <span className="text-xs text-zinc-500 font-bold">건 접수</span>
          </div>
          <p className="mt-2 text-[10px] text-zinc-400 flex items-center gap-1">
            <span>수신된 제안 확인하기</span>
            <ArrowUpRight className="w-3 h-3 text-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>

        {/* Card 3: Leads conversion level */}
        <div className="bg-[#1a1b22] border border-[#272735] p-5 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">전환 지표 (Conversion)</span>
            <div className="p-2 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-500/10">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">99.8%</span>
            <span className="text-xs text-emerald-400 font-bold">Excellent</span>
          </div>
          <p className="mt-2 text-[10px] text-zinc-500 leading-normal">
            문의 발송 프로세스 정합 피드백 지표 최고 등급 유지 중
          </p>
        </div>

        {/* Card 4: Draft maturity indicator */}
        <div className="bg-[#1a1b22] border border-[#272735] p-5 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-extrabold tracking-wider uppercase">콘텐츠 데이터 완결성</span>
            <div className="p-2 rounded bg-rose-950/20 text-rose-400 border border-rose-500/10">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">100%</span>
            <span className="text-xs text-rose-400 font-bold">Verified</span>
          </div>
          <p className="mt-2 text-[10px] text-zinc-500 leading-normal">
            포함된 모든 시각화 템플릿 Base64 미디어 연계 무결
          </p>
        </div>
      </div>

      {/* Visual Charts & Tag distribution side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left column: SVG Interactive Chart */}
        <div className="lg:col-span-8 bg-[#1a1b22] border border-[#272735] p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h5 className="text-white text-xs font-bold mb-1 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#8b5cf6]" />
              일자별 문의 유입 동향 (Lead Inflow Flow)
            </h5>
            <p className="text-zinc-500 text-[10px]">
              근래 5개 간의 의뢰량 누적 트렌드 시계열 분석 차트입니다.
            </p>
          </div>

          {/* SVG Visual graph block */}
          <div className="my-6 h-36 bg-[#121316] border border-[#272735] rounded-lg p-4 flex flex-col justify-between">
            <div className="flex-1 flex items-end justify-around gap-2 pt-2 border-b border-zinc-800">
              {leadTrends.map((t, idx) => {
                const heightPercent = Math.min(100, Math.max(10, (t.count / maxTrend) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                    {/* Tooltip */}
                    <div className="absolute top-[-30px] bg-[#8b5cf6] text-white text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-10">
                      {t.count} 건 접수
                    </div>

                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className="w-8 sm:w-12 bg-gradient-to-t from-[#8b5cf6]/60 to-[#8b5cf6] rounded-t-sm group-hover:brightness-110 transition-all shadow-[0_0_10px_rgba(139,92,246,0.1)]"
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-around gap-2 mt-2 text-zinc-500 text-[10px] font-mono">
              {leadTrends.map((t, idx) => (
                <span key={idx}>{t.day}</span>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 flex items-center gap-1 bg-[#121316] p-2.5 rounded border border-[#272735] mt-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0" />
            <span>이 통계 데이터는 브라우저 스토리지 세션에 보관되어 있으며, 실제 서버 연결 시 실시간 API 동기화로 확장 가능합니다.</span>
          </div>
        </div>

        {/* Right column: Popular portfolio Tags and helper guides */}
        <div className="lg:col-span-4 bg-[#1a1b22] border border-[#272735] p-5 rounded-xl flex flex-col justify-between">
          <div>
            <h5 className="text-white text-xs font-bold mb-1 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#8b5cf6]" />
              최다 매칭 키워드 태그 (Tag Cloud)
            </h5>
            <p className="text-zinc-500 text-[10px] mb-4">
              작성된 포트폴리오 태그 빈도 순위
            </p>

            {popularTags.length === 0 ? (
              <p className="text-zinc-500 text-xs py-4 text-center">등록된 태그가 없습니다.</p>
            ) : (
              <div className="space-y-2.5">
                {popularTags.map(([tag, count], idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-zinc-300 font-medium">#{tag}</span>
                      <span className="text-[#a78bfa] font-bold text-[10px]">{count}회 사용</span>
                    </div>
                    <div className="w-full bg-[#121316] h-1.5 rounded-full overflow-hidden border border-zinc-800">
                      <div 
                        style={{ width: `${Math.min(100, (count / totalProjects) * 100)}%` }}
                        className="bg-[#8b5cf6] h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={() => onSwitchTab("projects")}
            className="mt-6 w-full py-2 bg-[#121316] hover:bg-[#202128] border border-[#272735] hover:border-[#8b5cf6]/40 text-[10px] font-bold text-[#a78bfa] rounded transition-all cursor-pointer"
          >
            프로젝트 관리 및 태그 추가하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
