import React, { useState, useEffect } from "react";
import { Project } from "./types";
import { DEFAULT_PROJECTS } from "./data/defaultProjects";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import CoreCompetencies from "./components/CoreCompetencies";
import Process from "./components/Process";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import { ProfileConfig } from "./components/admin/AdminSiteSettings";
import { Lock, Unlock, ShieldAlert, CheckCircle, Smartphone, Mail, Settings, ArrowUp, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export default function App() {
  // Global projects state
  const [projects, setProjects] = useState<Project[]>([]);

  // CMS Profile states
  const [profile, setProfile] = useState<ProfileConfig>({
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
  });

  // Navigation page views state
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [navigationMode, setNavigationMode] = useState<"onepage" | "independent">("onepage");

  // Admin access control states
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize and load projects & profile from Firestore
  useEffect(() => {
    let isProjectMigrated = false;
    let isProfileMigrated = false;

    // Listen to projects
    const unsubProjects = onSnapshot(doc(db, "appData", "projects"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        setProjects(docSnap.data().items);
      } else {
        // Fallback to local storage migration once
        const storedProjects = localStorage.getItem("shin_yoonseop_projects_v3");
        if (storedProjects) {
          try {
            const parsed = JSON.parse(storedProjects) as Project[];
            if (parsed.length > 0) {
              setProjects(parsed);
              if (!isProjectMigrated) {
                isProjectMigrated = true;
                setDoc(doc(db, "appData", "projects"), { items: parsed }).catch(console.error);
              }
            } else {
              setProjects(DEFAULT_PROJECTS);
            }
          } catch(e) {
            setProjects(DEFAULT_PROJECTS);
          }
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      }
    });

    // Listen to profile
    const unsubProfile = onSnapshot(doc(db, "appData", "profile"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().config) {
        setProfile(docSnap.data().config);
      } else {
        const storedProfile = localStorage.getItem("shin_yoonseop_profile");
        if (storedProfile) {
          try {
             const parsed = JSON.parse(storedProfile);
             setProfile(parsed);
             if (!isProfileMigrated) {
               isProfileMigrated = true;
               setDoc(doc(db, "appData", "profile"), { config: parsed }).catch(console.error);
             }
          } catch(e) {}
        }
      }
    });

    // Check if admin is currently active in session
    const storedAdmin = localStorage.getItem("shin_yoonseop_is_admin");
    if (storedAdmin === "true") {
      setIsAdmin(true);
    }

    // Window scroll listener for "Back to top" button
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubProjects();
      unsubProfile();
    };
  }, []);

  // Scroll Spy to highlight navigation menu items on scroll
  useEffect(() => {
    if (navigationMode !== "onepage") return;

    const handleScrollSpy = () => {
      const homeEl = document.querySelector("main");
      const portfolioEl = document.getElementById("portfolio");
      const competenciesEl = document.getElementById("competencies");
      const profileEl = document.getElementById("profile");
      const contactEl = document.getElementById("contact");

      const sections = [
        { id: "home", element: homeEl },
        { id: "portfolio", element: portfolioEl },
        { id: "competencies", element: competenciesEl },
        { id: "profile", element: profileEl },
        { id: "contact", element: contactEl },
      ];

      // Find which section is currently active based on viewport scroll position
      let activeSectionId = "home";
      
      // Check from bottom to top so that we match the lowest visible section first when scrolling down
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.element) {
          const rect = sec.element.getBoundingClientRect();
          // If the top of the section is above 40% of the viewport height, it qualifies as active
          if (rect.top <= window.innerHeight * 0.4) {
            activeSectionId = sec.id;
            break;
          }
        }
      }

      // Special fallback: Check if user has scrolled to the absolute bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        activeSectionId = "contact";
      }

      setCurrentSection((prev) => {
        if (prev !== activeSectionId) {
          return activeSectionId;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    // Execute immediately to set correct initial highlight
    handleScrollSpy();

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [navigationMode, projects]);

  // Update projects list
  const handleUpdateProjects = async (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    try {
      const sanitized = JSON.parse(JSON.stringify(updatedProjects));
      await setDoc(doc(db, "appData", "projects"), { items: sanitized });
    } catch (e: any) {
      console.error("Storage error:", e);
      alert("데이터를 클라우드에 저장하는 중 오류가 발생했습니다.");
    }
  };

  // Reset to default original portfolios
  const handleResetProjects = async () => {
    setProjects(DEFAULT_PROJECTS);
    try {
      const sanitized = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
      await setDoc(doc(db, "appData", "projects"), { items: sanitized });
    } catch (err) {
      console.warn("Could not handle reset projects", err);
    }
  };

  // Update profile config
  const handleUpdateProfile = async (updatedProfile: ProfileConfig) => {
    setProfile(updatedProfile);
    try {
      const sanitized = JSON.parse(JSON.stringify(updatedProfile));
      await setDoc(doc(db, "appData", "profile"), { config: sanitized });
    } catch (e: any) {
      console.error("Storage error:", e);
      alert("데이터를 클라우드에 저장하는 중 오류가 발생했습니다.");
    }
  };

  // Reset profile back to original default
  const handleResetProfile = async () => {
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
    setProfile(defaultProfile);
    try {
      await setDoc(doc(db, "appData", "profile"), { config: defaultProfile });
    } catch (err) {
      console.warn("Could not handle reset profile", err);
    }
  };

  // Perform administrative passcode check
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Accept both user specifications: 1592 or 1111
    if (passwordInput === "1592" || passwordInput === "1111") {
      setIsAdmin(true);
      localStorage.setItem("shin_yoonseop_is_admin", "true");
      setIsLoginOpen(false);
      setPasswordInput("");
      
      // Instantly open the dashboard panel for frictionless UX
      setIsAdminPanelOpen(true);
    } else {
      setLoginError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("shin_yoonseop_is_admin");
    setIsAdminPanelOpen(false);
    alert("로그아웃 되었습니다.");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#121316] min-h-screen text-zinc-100 selection:bg-[#8b5cf6] selection:text-white relative">
      
      {/* Floating glassy header wrapper */}
      <Header
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        navigationMode={navigationMode}
        onNavigationModeChange={setNavigationMode}
        profileName={profile.name}
      />

      {/* Main Container switching state depending on navigation mode */}
      <main>
        {navigationMode === "onepage" ? (
          <div>
            <Hero onSectionChange={setCurrentSection} navigationMode={navigationMode} heroHeadline={profile.heroHeadline} />
            <Portfolio projects={projects} />
            <CoreCompetencies />
            <Profile profile={profile} />
            <Process />
            <Contact profile={profile} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {currentSection === "home" && (
                <Hero onSectionChange={setCurrentSection} navigationMode={navigationMode} heroHeadline={profile.heroHeadline} />
              )}
              {currentSection === "portfolio" && (
                <Portfolio 
                  projects={projects} 
                  isStandalone={true} 
                  onBackToHome={() => setCurrentSection("home")} 
                />
              )}
              {currentSection === "competencies" && (
                <CoreCompetencies 
                  isStandalone={true} 
                  onBackToHome={() => setCurrentSection("home")} 
                />
              )}
              {currentSection === "profile" && (
                <Profile 
                  isStandalone={true} 
                  onBackToHome={() => setCurrentSection("home")} 
                  profile={profile}
                />
              )}
              {currentSection === "process" && (
                <Process 
                  isStandalone={true} 
                  onBackToHome={() => setCurrentSection("home")} 
                />
              )}
              {currentSection === "contact" && (
                <Contact 
                  isStandalone={true} 
                  onBackToHome={() => setCurrentSection("home")} 
                  profile={profile}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Custom visual footer with Luxury branding */}
      <footer className="bg-[#0b0c0e] border-t border-[#272735] py-12 px-4 sm:px-6 lg:px-8 text-center text-zinc-500 text-xs font-normal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="text-sm font-extrabold text-zinc-300">{profile.name} 포트폴리오</p>
            <p className="mt-1.5 text-zinc-500 leading-relaxed max-w-sm">
              {profile.summary}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 hover:text-[#a78bfa] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#8b5cf6]" />
              {profile.email}
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#a78bfa] transition-colors">
              <Smartphone className="w-3.5 h-3.5 text-[#8b5cf6]" />
              {profile.phone}
            </span>
            <button
              onClick={() => {
                if (isAdmin) {
                  setIsAdminPanelOpen(true);
                } else {
                  setIsLoginOpen(true);
                }
              }}
              className="flex items-center gap-1 text-[#a78bfa] hover:text-[#c4b5fd] font-bold cursor-pointer transition-colors mt-2 sm:mt-0"
            >
              <Settings className="w-3.5 h-3.5" />
              {isAdmin ? "관리자 콘솔 실행" : "관리자 기능 실행"}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1c1d24] flex flex-col sm:flex-row items-center justify-between text-zinc-600">
          <p>© {new Date().getFullYear()} Shin Yoon-seop. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Pretendard Typeface • Premium Charcoal Theme</p>
        </div>
      </footer>

      {/* Login Challenge Modal portal */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Verification Form window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-[#1a1b22] border border-[#8b5cf6]/30 rounded-2xl w-full max-w-sm p-6 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center rounded-full mx-auto mb-3">
                  <Lock className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <h4 className="text-white font-extrabold text-base">관리자 권한 인증</h4>
                <p className="text-zinc-500 text-xs mt-1">수정 및 파일 첨부를 위해 암호를 입력하시오.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-2.5 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded flex items-center gap-1.5 font-semibold">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                    {loginError}
                  </div>
                )}

                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="패스워드 입력"
                    autoFocus
                    className="w-full bg-[#121316] border border-[#272735] rounded-lg px-3 py-2.5 text-center text-sm font-semibold tracking-widest text-[#a78bfa] focus:outline-none focus:border-[#8b5cf6] placeholder-zinc-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-black rounded-lg transition-colors cursor-pointer"
                >
                  로그인 및 관리자콘솔 진입
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full panel manager modal portal */}
      <AnimatePresence>
        {isAdmin && isAdminPanelOpen && (
          <AdminPanel
            projects={projects}
            onUpdateProjects={handleUpdateProjects}
            onResetProjects={handleResetProjects}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onResetProfile={handleResetProfile}
            onClose={() => setIsAdminPanelOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Smooth Back To Top Floating Action Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white p-3 rounded-full hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] transition-all cursor-pointer"
            title="맨 앞으로 이동"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
