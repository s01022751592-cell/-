import React, { useState } from "react";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, Tag, Layers, X, ExternalLink, Image as ImageIcon, 
  Sparkles, Filter, CheckCircle2, Video, ZoomIn, ChevronDown, ChevronUp 
} from "lucide-react";

const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
  }
  return url;
};

interface PortfolioProps {
  projects: Project[];
  isStandalone?: boolean;
  onBackToHome?: () => void;
}

export default function Portfolio({ projects, isStandalone = false, onBackToHome }: PortfolioProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>("전체");
  const [activeMediaTab, setActiveMediaTab] = useState<"image" | "video">("image");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const tabs = [
    { label: "전체", value: "전체" },
    { label: "전략 기획 & 데이터 분석", value: "planning" },
    { label: "시각 디자인 & 카드뉴스", value: "design" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "전체") return true;
    
    const projectTagsString = project.tags.join(" ");
    const textToMatch = (project.title + " " + project.description + " " + projectTagsString).toLowerCase();

    if (activeTab === "planning") {
      return (
        textToMatch.includes("기획") ||
        textToMatch.includes("분석") ||
        textToMatch.includes("리포트") ||
        textToMatch.includes("전략") ||
        textToMatch.includes("소통") ||
        textToMatch.includes("모니터링")
      );
    }
    if (activeTab === "design") {
      return (
        textToMatch.includes("디자인") ||
        textToMatch.includes("카드뉴스") ||
        textToMatch.includes("시각") ||
        textToMatch.includes("미리캔버스") ||
        textToMatch.includes("ooh")
      );
    }
    return true;
  });

  return (
    <section 
      id="portfolio" 
      className={`${isStandalone ? "pt-32 pb-24 min-h-screen" : "py-24 border-y border-zinc-200"} bg-[#eef1f6] transition-all`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation button if Standalone */}
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

        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#8b5cf6] text-xs font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#8b5cf6]" />
            GALLERY / PORTFOLIO PAGE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight"
          >
            포트폴리오 쇼케이스
          </motion.h2>
          <div className="w-12 h-1 bg-[#8b5cf6] mx-auto mt-4 rounded" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-600 mt-4 max-w-xl mx-auto text-sm leading-relaxed"
          >
            기획력과 데이터 시공성을 아우르는 대표 실적입니다. 각 피드를 클릭해 마케팅 실적, 타겟층 지표 분석 제안서를 투명하게 확인해보세요.
          </motion.p>
        </div>

        {/* Standalone Analytics Banner */}
        {isStandalone && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#8b5cf6]" />
              </span>
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">총 프로젝트 진행 수</div>
                <div className="text-zinc-800 text-lg font-black">{projects.length}건 완료</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
              </span>
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">평균 매출 상승 지표</div>
                <div className="text-zinc-800 text-lg font-black font-sans">평균전년대비 +178%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                <Filter className="w-5 h-5 text-[#8b5cf6]" />
              </span>
              <div>
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">기획 분기별 달성률</div>
                <div className="text-zinc-800 text-lg font-black">고객 만족 피드백 100%</div>
              </div>
            </div>
          </div>
        )}



        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 450, damping: 24 }}
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveMediaTab(project.videoUrl ? "video" : "image");
                }}
                className="group bg-white rounded-2xl border border-zinc-200/80 overflow-hidden hover:border-[#8b5cf6]/50 shadow-sm hover:shadow-[0_16px_36px_rgba(139,92,246,0.08)] transition-colors duration-200 cursor-pointer flex flex-col h-full"
                id={`project-card-${project.id}`}
              >
                {/* Product Image Stage */}
                <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden select-none">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Layer Overlay with Action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                    <span className="text-xs font-semibold text-white bg-[#8b5cf6] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                      상세 기획서 &amp; 인덱스 보기
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-xs font-semibold text-[#7c3aed] bg-[#8b5cf6]/8 px-2 py-0.5 rounded border border-[#8b5cf6]/15"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-zinc-500 px-1 py-0.5 font-medium">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-zinc-900 mb-2 tracking-tight group-hover:text-[#8b5cf6] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8b5cf6]" />
                      {project.period ? project.period.split(" (")[0] : "실무 프로젝트"}
                    </span>
                    <span className="text-zinc-500 group-hover:text-[#8b5cf6] font-bold text-xs transition-colors flex items-center gap-0.5">
                      상세 열람
                      <span className="transform translate-x-0 group-hover:translate-x-0.5 transition-transform font-mono">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500 text-sm">
              해당 분류군의 프로젝트가 존재하지 않습니다.
            </div>
          )}
        </motion.div>

        {/* Load More & Collapse Buttons */}
        {filteredProjects.length > 4 && (
          <div className="flex justify-center mt-12">
            {visibleCount < filteredProjects.length ? (
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredProjects.length))}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-[#8b5cf6]/40 rounded-xl text-xs sm:text-sm font-bold text-zinc-700 hover:text-[#8b5cf6] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group active:scale-95"
              >
                <span>더보기</span>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-[#8b5cf6] group-hover:translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setVisibleCount(4);
                  // Smoothly scroll back to the portfolio section top
                  const portfolioSection = document.getElementById("portfolio");
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1b22] hover:bg-[#202128] border border-[#272735] hover:border-red-500/50 rounded-xl text-xs sm:text-sm font-bold text-zinc-300 hover:text-red-400 shadow-lg transition-all duration-300 cursor-pointer group active:scale-95"
              >
                <span>접기</span>
                <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        )}

        {/* Detail Modal Portal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal Body Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-[#1a1b22] rounded-2xl border border-[#272735] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-5 sm:p-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-lg bg-[#202128] hover:bg-[#2d2e38] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Media Container (Image or Video toggle) */}
                <div className="mb-6 space-y-3">
                  {selectedProject.videoUrl && (
                    <div className="flex bg-[#202128] border border-[#272735] p-1 rounded-lg w-max">
                      <button
                        type="button"
                        onClick={() => setActiveMediaTab("video")}
                        className={`px-3 py-1 text-[11px] font-bold rounded flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeMediaTab === "video"
                            ? "bg-[#8b5cf6] text-white shadow-md scale-[1.02]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        🎬 영상 재생하기
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveMediaTab("image")}
                        className={`px-3 py-1 text-[11px] font-bold rounded flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeMediaTab === "image"
                            ? "bg-[#8b5cf6] text-white shadow-md scale-[1.02]"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        🖼️ 대표 이미지
                      </button>
                    </div>
                  )}

                  <div className="rounded-xl overflow-hidden aspect-video w-full bg-[#121316] relative border border-[#272735] shadow-lg flex items-center justify-center">
                    {selectedProject.videoUrl && activeMediaTab === "video" ? (
                      selectedProject.videoUrl.startsWith("data:video/") ? (
                        <video
                          src={selectedProject.videoUrl}
                          controls
                          className="w-full h-full object-contain bg-black"
                          playsInline
                        />
                      ) : (
                        selectedProject.videoUrl.includes("youtube.com") || selectedProject.videoUrl.includes("youtu.be") ? (
                          <iframe
                            src={getYoutubeEmbedUrl(selectedProject.videoUrl)}
                            title={selectedProject.title}
                            className="w-full h-full border-0 absolute inset-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={selectedProject.videoUrl}
                            controls
                            className="w-full h-full object-contain bg-black"
                            playsInline
                          />
                        )
                      )
                    ) : (
                      <div 
                        onClick={() => setLightboxImage(selectedProject.imageUrl)}
                        className="w-full h-full relative cursor-zoom-in group/img overflow-hidden"
                        title="클릭하여 원본 이미지 크게 보기"
                      >
                        <img
                          src={selectedProject.imageUrl}
                          alt={selectedProject.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                          <ZoomIn className="w-8 h-8 text-white drop-shadow-md" />
                          <span className="text-white text-xs font-bold bg-black/50 px-2.5 py-1 rounded">원본 이미지 크게 보기</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Tag badge on top of image */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold text-[#a78bfa] border border-[#8b5cf6]/30 select-none">
                      {selectedProject.period ? "실무 기획 및 성과 분석" : "실무 프로젝트"}
                    </div>
                  </div>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium text-[#a78bfa] bg-[#8b5cf6]/10 px-2.5 py-1 rounded-md border border-[#8b5cf6]/20 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3 text-[#a78bfa]/75" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-4 tracking-tight leading-snug">
                  {selectedProject.title}
                </h3>

                {/* Meta details */}
                {selectedProject.period && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-6 pb-4 border-b border-[#272735]">
                    <Calendar className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="font-semibold text-zinc-300">작업 기간: </span>
                    <span>{selectedProject.period}</span>
                  </div>
                )}

                {/* Core description card */}
                <div className="bg-[#1a1b22] rounded-xl p-5 border border-[#2d2e38]/50 mb-6">
                  <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line font-medium">
                    {selectedProject.description}
                  </div>
                </div>

                {/* Deep Analysis details */}
                {selectedProject.details && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-[#a78bfa] uppercase tracking-wider mb-3 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[#8b5cf6] animate-pulse" />
                      데이터 분석 &amp; 마케팅 기획 연계 상세
                    </h4>
                    <div className="text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-normal border-l-2 border-[#8b5cf6] pl-4 py-1">
                      {selectedProject.details.split("\n").map((line, idx) => {
                        if (line.trim().startsWith("###")) {
                          return (
                            <h5 key={idx} className="text-white font-extrabold text-sm sm:text-base mt-4 mb-2 first:mt-0">
                              {line.replace("###", "").trim()}
                            </h5>
                          );
                        }
                        if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
                          return (
                            <div key={idx} className="my-1.5 pl-2 text-zinc-300">
                              {line}
                            </div>
                          );
                        }
                        return <p key={idx} className="mb-2">{line}</p>;
                      })}
                    </div>
                  </div>
                )}

                {/* Multiple Images Sub-Carousel if present */}
                {selectedProject.extraImages && selectedProject.extraImages.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-[#272735]">
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-300 mb-4 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#8b5cf6]" />
                      관련 추가 실무 그래픽자료 ({selectedProject.extraImages.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.extraImages.map((extraImg, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setLightboxImage(extraImg)}
                          className="rounded-lg overflow-hidden border border-[#272735] aspect-video w-full bg-[#1e202a] cursor-zoom-in relative group/extra transition-transform duration-300"
                          title="클릭하여 원본 이미지 크게 보기"
                        >
                          <img
                            src={extraImg}
                            alt={`관련 시각자료 ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/extra:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/extra:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1">
                            <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                            <span className="text-white text-[10px] sm:text-xs font-bold bg-black/60 px-2 py-0.5 rounded">원본 보기</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 rounded-lg text-xs sm:text-sm bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-white hover:from-[#c4b5fd] hover:to-[#a78bfa] font-bold transition-all shadow-[0_2px_15px_rgba(139,92,246,0.3)] cursor-pointer"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Lightbox for viewing full-size original images */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(null);
                }}
                className="absolute top-4 right-4 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white transition text-zinc-300 w-10 h-10 rounded-full flex items-center justify-center border border-zinc-700/50 shadow-lg cursor-pointer"
                title="닫기 (ESC)"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-full max-h-[90vh] flex items-center justify-center pointer-events-auto"
              >
                <img
                  src={lightboxImage}
                  alt="원본 이미지 상세보기"
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl border border-zinc-800"
                />
                
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900/90 text-zinc-300 text-xs py-1.5 px-4 rounded-full border border-zinc-800 font-semibold shadow-lg flex items-center gap-2 select-none">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  클릭하거나 배경을 누르면 닫힙니다 (대표 원본 해상도)
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
