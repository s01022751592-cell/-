import React, { useState } from "react";
import { Lock, Unlock, Menu, X, Settings, ArrowRight, ToggleLeft, ToggleRight, Sparkles, Layers, Award, BarChart3, Mail, User } from "lucide-react";

interface HeaderProps {
  isAdmin: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenAdminPanel: () => void;
  currentSection: string;
  onSectionChange: (section: string) => void;
  navigationMode: "onepage" | "independent";
  onNavigationModeChange: (mode: "onepage" | "independent") => void;
  profileName?: string;
}

export default function Header({
  isAdmin,
  onLogout,
  onOpenLogin,
  onOpenAdminPanel,
  currentSection,
  onSectionChange,
  navigationMode,
  onNavigationModeChange,
  profileName,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "홈", value: "home", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: "포트폴리오", value: "portfolio", icon: <Layers className="w-3.5 h-3.5" /> },
    { label: "핵심 역량", value: "competencies", icon: <Award className="w-3.5 h-3.5" /> },
    { label: "프로필", value: "profile", icon: <User className="w-3.5 h-3.5" /> },
    { label: "문의하기", value: "contact", icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, value: string) => {
    e.preventDefault();
    onSectionChange(value);

    if (navigationMode === "onepage") {
      // In onepage mode, scroll to the corresponding section element
      const targetId = value === "home" ? "body" : `#${value}`;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121316]/90 backdrop-blur-md border-b border-[#272735] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <button onClick={(e) => handleNavClick(e, "home")} className="group flex items-center gap-2 text-left cursor-pointer">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] select-none">
                YS
              </span>
              <span className="text-white font-semibold text-base lg:text-lg tracking-tight group-hover:text-[#8b5cf6] transition-colors whitespace-nowrap">
                {profileName || "신윤섭"} <span className="hidden lg:inline-block text-[10px] bg-[#1a1b22] text-[#a78bfa] font-semibold px-2 py-0.5 rounded ml-1 border border-[#8b5cf6]/20">Official Portfolio</span>
              </span>
            </button>
          </div>

          {/* Navigation Controls Mode Toggler (Unique Feature!) */}
          <div className="hidden xl:flex items-center bg-[#1a1b22] px-3 py-1 rounded-full border border-[#272735] text-[11px] font-bold text-zinc-400 gap-2 select-none">
            <span className={`${navigationMode === "onepage" ? "text-[#a78bfa]" : "text-zinc-500"}`}>
              원페이지 스크롤
            </span>
            <button
              onClick={() => onNavigationModeChange(navigationMode === "onepage" ? "independent" : "onepage")}
              className="text-[#8b5cf6] hover:scale-105 transition-transform cursor-pointer"
              title="네비게이션 모드 변경"
            >
              {navigationMode === "onepage" ? (
                <ToggleLeft className="w-6 h-6 text-zinc-600" />
              ) : (
                <ToggleRight className="w-6 h-6 text-[#8b5cf6]" />
              )}
            </button>
            <span className={`${navigationMode === "independent" ? "text-[#a78bfa] font-bold" : "text-zinc-500"}`}>
              개별 분리 페이지 
            </span>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-4 xl:space-x-6 flex-nowrap">
            {menuItems.map((item) => {
              const isActive = currentSection === item.value;
              return (
                <button
                  key={item.value}
                  onClick={(e) => handleNavClick(e, item.value)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-[#a78bfa] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-[#1a1b22]/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Admin Tools trigger */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-3 flex-nowrap">
            {isAdmin ? (
              <div className="flex items-center gap-1.5 lg:gap-2 flex-nowrap">
                <button
                  onClick={onOpenAdminPanel}
                  className="flex items-center gap-1 lg:gap-1.5 px-2 py-1.5 rounded-lg text-[11px] lg:text-xs font-semibold bg-[#272735] text-[#a78bfa] border border-[#8b5cf6]/30 hover:border-[#8b5cf6] hover:bg-[#34344c] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Settings className="w-3 h-3 lg:w-3.5 lg:h-3.5 animate-spin-slow" />
                  관리자 콘솔
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] lg:text-xs font-medium text-zinc-400 bg-red-950/20 border border-red-900/30 hover:bg-red-900/50 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1 lg:gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] lg:text-xs font-medium text-zinc-400 hover:text-white bg-[#15161b] hover:bg-[#202126] border border-[#272735] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Lock className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#8b5cf6]" />
                관리자 로그인
              </button>
            )}
          </div>

          {/* Mobile menu action */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-[#202126] focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu panel Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#121316]/98 border-b border-[#272735] absolute top-16 left-0 right-0 py-4 px-4 shadow-xl">
          {/* Mobile Mode Switcher */}
          <div className="flex items-center justify-between bg-[#1a1b22] px-4 py-2 rounded-xl mb-4 text-xs font-semibold">
            <span className="text-zinc-400">네비게이션 모드</span>
            <button
              onClick={() => onNavigationModeChange(navigationMode === "onepage" ? "independent" : "onepage")}
              className="text-[#8b5cf6] flex items-center gap-1"
            >
              {navigationMode === "onepage" ? "원페이지 스크롤" : "독립 개별 페이지"}
              <ToggleRight className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1.5 pb-3">
            {menuItems.map((item) => {
              const isActive = currentSection === item.value;
              return (
                <button
                  key={item.value}
                  onClick={(e) => handleNavClick(e, item.value)}
                  className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-[#a78bfa] bg-[#8b5cf6]/10 border-l-2 border-[#8b5cf6]"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#272735]">
            {isAdmin ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdminPanel();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-xs font-bold bg-[#272735] text-[#a78bfa] border border-[#8b5cf6]/30"
                >
                  <Settings className="w-4 h-4" />
                  관리자 콘솔 대시보드
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-xs font-medium text-zinc-400 bg-red-950/20 border border-red-900/35"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenLogin();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-xs font-medium text-zinc-400 bg-[#1a1b22] border border-[#272735] hover:text-white"
              >
                <Lock className="w-3.5 h-3.5 text-[#8b5cf6]" />
                관리자 로그인 (PWD: 1592 / 1111)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
