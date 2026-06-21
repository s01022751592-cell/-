import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Send, Award, Compass } from "lucide-react";

interface HeroProps {
  onSectionChange: (section: string) => void;
  navigationMode: "onepage" | "independent";
  heroHeadline?: string;
}

export default function Hero({ onSectionChange, navigationMode, heroHeadline }: HeroProps) {
  const handleNav = (value: string, selector: string) => {
    onSectionChange(value);
    if (navigationMode === "onepage") {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#121316]">
      {/* Absolute Radial design ambient glows with floating and pulsing motion */}
      <motion.div 
        animate={{ 
          x: ["-50%", "-48%", "-52%", "-50%"],
          y: ["-50%", "-52%", "-48%", "-50%"],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 left-1/2 w-[550px] h-[550px] bg-[#8b5cf6]/10 blur-[130px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-[#c4b5fd]/8 blur-[110px] rounded-full pointer-events-none" 
      />
      
      {/* Decorative tech grid pattern in dark gray */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2029_1px,transparent_1px),linear-gradient(to_bottom,#1f2029_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16">
        {/* Luxury Gold Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1b22] border border-[#8b5cf6]/20 mb-8 text-xs font-semibold text-[#a78bfa] shadow-[0_0_15px_rgba(139,92,246,0.05)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6] animate-pulse" />
          마케팅 &amp; 시각 디자인 공식 포트폴리오
        </motion.div>

        {/* Main Header Copy with gold metallic text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none mb-6"
        >
          기획력으로 증명하고, <br />
          <span className="bg-gradient-to-r from-[#ddd6fe] via-[#a78bfa] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(139,92,246,0.25)]">
            디자인으로 설득합니다.
          </span>
        </motion.h1>

        {/* Sub Copy wrapper */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {heroHeadline || (
            <>
              체계적인 지표 분석부터 실무형 기획, 시각적 커뮤니케이션까지 확실한 결과물을 만듭니다.
            </>
          )}
        </motion.p>

        {/* Action button controllers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            onClick={() => handleNav("portfolio", "#portfolio")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] hover:from-[#c4b5fd] hover:to-[#a78bfa] shadow-[0_4px_25px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.5)] cursor-pointer"
          >
            포트폴리오 보러가기
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            onClick={() => handleNav("contact", "#contact")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white bg-[#15161b] hover:bg-[#1a1c24] border border-[#2d2e38] hover:border-[#8b5cf6]/35 cursor-pointer"
          >
            프로젝트 문의하기
            <Send className="w-4 h-4 text-[#a78bfa]" />
          </motion.button>
        </motion.div>
      </div>

      {/* Ambient bottom shader */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#121316] to-transparent pointer-events-none" />
    </section>
  );
}
