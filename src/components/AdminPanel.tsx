import React, { useState, useEffect } from "react";
import { Project, Inquiry } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, RefreshCw, Sparkles, LayoutDashboard, Layers, Inbox, 
  Settings, Code, LogOut 
} from "lucide-react";

// Sub-components import
import AdminDashboard from "./admin/AdminDashboard";
import AdminProjects from "./admin/AdminProjects";
import AdminInbox from "./admin/AdminInbox";
import AdminSystemExtensions from "./admin/AdminSystemExtensions";
import AdminSiteSettings, { ProfileConfig } from "./admin/AdminSiteSettings";

interface AdminPanelProps {
  projects: Project[];
  onUpdateProjects: (updated: Project[]) => void;
  onResetProjects: () => void;
  profile: ProfileConfig;
  onUpdateProfile: (updated: ProfileConfig) => void;
  onResetProfile: () => void;
  onClose: () => void;
}

export default function AdminPanel({
  projects,
  onUpdateProjects,
  onResetProjects,
  profile,
  onUpdateProfile,
  onResetProfile,
  onClose,
}: AdminPanelProps) {
  // Active Navigation Tab
  // Options: "dashboard", "projects", "inbox", "settings", "extensions"
  const [activeTab, setActiveTab] = useState<"dashboard" | "projects" | "inbox" | "settings" | "extensions">("dashboard");

  // CRM inquiries database state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load inquiries from localStorage on hook init
  useEffect(() => {
    const rawInquiries = localStorage.getItem("inquiries");
    if (rawInquiries) {
      try {
        setInquiries(JSON.parse(rawInquiries));
      } catch (err) {
        setInquiries([]);
      }
    }
  }, []);

  // Synchronize dynamic inquiries
  const saveInquiries = (updatedInq: Inquiry[]) => {
    setInquiries(updatedInq);
    localStorage.setItem("inquiries", JSON.stringify(updatedInq));
  };

  // Delete an inquiry item
  const handleDeleteInquiry = (id: string) => {
    if (window.confirm("이 문의 내역을 정말로 보관함에서 삭제하시겠습니까?")) {
      const filtered = inquiries.filter((inq) => inq.id !== id);
      saveInquiries(filtered);
    }
  };

  // Switch context tab helper
  const handleSwitchTab = (tab: "dashboard" | "projects" | "inbox" | "settings" | "extensions") => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Heavy blurring luxury dark backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#1a1b22] rounded-2xl border border-[#8b5cf6]/35 w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl z-10 flex flex-col sm:flex-row">
        
        {/* Left Side Responsive Sidebar navigation panel */}
        <div className="w-full sm:w-64 bg-[#111216] border-b sm:border-b-0 sm:border-r border-[#272735] flex flex-col justify-between shrink-0 select-none">
          <div>
            {/* Header branding in sidebar */}
            <div className="p-5 border-b border-[#272735] flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              <div>
                <h4 className="text-white text-xs font-black font-mono tracking-tight flex items-center gap-1">
                  SYS_CTRL v2.0
                  <Sparkles className="w-3 h-3 text-[#a78bfa] animate-spin-slow" />
                </h4>
                <p className="text-[10px] text-zinc-500 font-bold mt-0.5 uppercase">ADMIN PANEL SYSTEM</p>
              </div>
            </div>

            {/* Sidebar Buttons */}
            <nav className="p-3.5 space-y-1.5">
              {/* Button: Summary Dashboard */}
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-[#1a1b22]/55"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                집계 대시보드
              </button>

              {/* Button: Portfolio CRUD manager */}
              <button
                onClick={() => setActiveTab("projects")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-[#1a1b22]/55"
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                포트폴리오 갤러리 
                <span className="ml-auto text-[9px] bg-zinc-900 border border-zinc-700/60 font-mono text-zinc-400 px-1.5 py-0.2 rounded">
                  {projects.length}
                </span>
              </button>

              {/* Button: Inquiry inbox */}
              <button
                onClick={() => setActiveTab("inbox")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer relative ${
                  activeTab === "inbox"
                    ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-[#1a1b22]/55"
                }`}
              >
                <Inbox className="w-4 h-4 shrink-0" />
                수신된 의뢰 제안
                {inquiries.length > 0 && (
                  <span className="ml-auto text-[10px] bg-[#a78bfa] text-black px-2 py-0.2 font-black rounded-full animate-bounce">
                    {inquiries.length}
                  </span>
                )}
              </button>

              {/* Button: CMS Profile configurations */}
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-[#1a1b22]/55"
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                프로필 &amp; 사이트 설정
              </button>

              {/* Button: Dev extension protocol guidance */}
              <button
                onClick={() => setActiveTab("extensions")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === "extensions"
                    ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-[#1a1b22]/55"
                }`}
              >
                <Code className="w-4 h-4 shrink-0" />
                백엔드 추가 &amp; 이식
              </button>
            </nav>
          </div>

          {/* Logout and close action row */}
          <div className="p-3.5 border-t border-[#272735] space-y-1.5 hidden sm:block">
            <button
              onClick={() => {
                if (window.confirm("초기 5개 프로젝트와 기본 프로필로 전체 초기복원하시겠습니까?")) {
                  onResetProjects();
                  onResetProfile();
                  alert("초기화 완료되었습니다.");
                }
              }}
              className="w-full flex items-center gap-1.5 justify-center px-1 py-1.5 bg-zinc-950 border border-[#8b5cf6]/20 text-[10px] font-bold text-[#a78bfa] rounded hover:border-[#8b5cf6] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-[#8b5cf6] animate-spin-slow" />
              대시보드 전체 완전초기화
            </button>
          </div>
        </div>

        {/* Right side core workspace */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#121316]">
          {/* Header row */}
          <header className="p-5 border-b border-[#272735] bg-[#17181e] flex items-center justify-between select-none shrink-0">
            <div>
              <h3 className="text-sm font-extrabold text-white">
                {activeTab === "dashboard" && "실시간 성능 및 지표 허브 (Analytical Platform)"}
                {activeTab === "projects" && "포트폴리오 리스트 수용편집 보드 (Portfolio Board)"}
                {activeTab === "inbox" && "클라이언트 비즈니스 제안서 전용 수신함 (Leads Inbox)"}
                {activeTab === "settings" && "브랜드 기본 정보 변경 (Portfolio Customizer)"}
                {activeTab === "extensions" && "백엔드 통합 가이드 (Extensions Protocol)"}
              </h3>
              <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                YS_PORTFOLIO_SYSTEM • {profile.name} 관리자 세션
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white p-2 rounded-lg bg-[#121316] hover:bg-[#1a1b22] border border-[#272735] hover:border-[#8b5cf6]/30 transition-colors cursor-pointer"
              title="관리자 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* Active component dynamic layout platform */}
          <main className="flex-grow overflow-y-auto p-6 max-h-[66vh]">
            {activeTab === "dashboard" && (
              <AdminDashboard 
                projects={projects}
                inquiries={inquiries}
                onSwitchTab={(tab) => handleSwitchTab(tab as any)}
              />
            )}

            {activeTab === "projects" && (
              <AdminProjects 
                projects={projects}
                onUpdateProjects={onUpdateProjects}
                onResetProjects={onResetProjects}
              />
            )}

            {activeTab === "inbox" && (
              <AdminInbox 
                inquiries={inquiries}
                onDeleteInquiry={handleDeleteInquiry}
              />
            )}

            {activeTab === "settings" && (
              <AdminSiteSettings 
                config={profile}
                onUpdateConfig={onUpdateProfile}
                onResetConfig={onResetProfile}
              />
            )}

            {activeTab === "extensions" && (
              <AdminSystemExtensions />
            )}
          </main>

          {/* Workspace mini footer information */}
          <footer className="p-4 border-t border-[#272735] bg-[#131418] flex items-center justify-between text-[11px] text-zinc-500 select-none shrink-0">
            <span className="truncate max-w-sm">
              작동 방식: LocalStorage Sandbox API • 실제 백엔드 연장 준비 완료
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-[#272735] hover:bg-zinc-800 text-zinc-300 font-bold transition-colors cursor-pointer text-[11px]"
            >
              종료 및 메인 화면 복귀
            </button>
          </footer>
        </div>

      </div>
    </div>
  );
}
