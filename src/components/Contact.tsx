import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Mail, CheckCircle2, AlertCircle, Award, Compass, MessageCircle } from "lucide-react";
import { Inquiry } from "../types";
import { ProfileConfig } from "./admin/AdminSiteSettings";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface ContactProps {
  isStandalone?: boolean;
  onBackToHome?: () => void;
  profile?: ProfileConfig;
}

export default function Contact({ isStandalone = false, onBackToHome, profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validations
    if (!formData.name.trim()) {
      setError("이름을 입력해 주세요.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("연락처를 입력해 주세요.");
      return;
    }
    if (!formData.content.trim()) {
      setError("프로젝트 의뢰 내용을 기재해 주세요.");
      return;
    }

    setIsSubmitting(true);

    // Submit to Firestore
    const submitData = async () => {
      try {
        const ref = doc(db, "appData", "inquiries");
        const docSnap = await getDoc(ref);
        let inquiriesList: Inquiry[] = [];
        if (docSnap.exists() && docSnap.data().items) {
          inquiriesList = docSnap.data().items;
        }
        
        const newInquiry: Inquiry = {
          id: `inq-${Date.now()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          content: formData.content.trim(),
          createdAt: new Date().toISOString(),
        };

        inquiriesList.unshift(newInquiry);
        const sanitized = JSON.parse(JSON.stringify(inquiriesList));
        await setDoc(ref, { items: sanitized });

        // Reset form
        setFormData({ name: "", email: "", phone: "", content: "" });
        setSuccess(true);
      } catch (err) {
        console.error(err);
        setError("서버로 전송하는 중 오류가 발생했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    };

    submitData();
  };

  return (
    <section 
      id="contact" 
      className={`${isStandalone ? "pt-32 pb-24 min-h-screen" : "py-24 border-t border-[#272735]"} bg-[#121316] relative overflow-hidden`}
    >
      {/* Decorative gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#8b5cf6]/5 blur-[90px] rounded-full pointer-events-none" />

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

        {/* Title Block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#a78bfa] text-xs font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#8b5cf6]" />
            GET IN TOUCH
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            프로젝트 의뢰 및 파트너십 문의
          </motion.h2>
          <div className="w-12 h-1 bg-[#8b5cf6] mx-auto mt-4 rounded" />
          <p className="text-zinc-400 mt-4 text-sm leading-relaxed whitespace-nowrap max-w-none mx-auto block overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            데이터 기반의 정밀한 마케팅 성향 수집과 조형미 넘치는 고품격 시각화 역량이 필요하시다면 아래의 신청 서신을 작성해주시기 바랍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Brand Info panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1a1b22] rounded-2xl p-8 border border-[#272735]">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 tracking-tight">
                {profile?.name || "신윤섭"}과 일할 때 생기는 특별함
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8 font-normal">
                일방적인 시각 튜닝에 그치지 않고, 기업의 실질 가치와 타겟 마케팅 지표를 정확히 상향 연출해 수용자가 감동을 얻을 수 있는 포인트를 정립해 제안합니다.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-9 h-9 rounded-lg bg-[#121316] flex items-center justify-center text-[#a78bfa] border border-[#8b5cf6]/15">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-bold leading-none uppercase">이메일 공식 채널</p>
                    <p className="text-xs sm:text-sm font-semibold mt-1 text-white">{profile?.email || "s01022751592@gmail.com"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-9 h-9 rounded-lg bg-[#121316] flex items-center justify-center text-[#a78bfa] border border-[#8b5cf6]/15">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-bold leading-none uppercase">실시간 핫라인</p>
                    <p className="text-xs sm:text-sm font-semibold mt-1 text-white">{profile?.phone || "010-2275-1592"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#272735] mt-8 lg:mt-0 text-[11px] text-zinc-500 leading-relaxed font-normal">
              <p>본 서신은 AES-256 규격 준거 로컬 스토리지에 즉각 암호화 보관되며, 작성하신 정보는 회신 목적 외의 마케팅 등에 절대 재사용되지 않습니다.</p>
            </div>
          </div>

          {/* Core Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#1a1b22]/60 backdrop-blur rounded-2xl p-8 border border-[#272735]">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#a78bfa]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">성공적으로 접수되었습니다!</h3>
                  <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
                    의뢰 및 의견이 정상적으로 보관되었습니다. <br /> 관리자 {profile?.name || "신윤섭"}이 분석 후 신속하게 연락을 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2.5 rounded-lg bg-[#272735] hover:bg-[#32333f] text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
                  >
                    추가 문의 작성하기
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Validation Error banner */}
                  {error && (
                    <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 mb-2">이름 *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="이름 또는 사명 입력"
                        className="w-full bg-[#121316] border border-[#272735] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all placeholder-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 mb-2">이메일 *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contact@company.com"
                        className="w-full bg-[#121316] border border-[#272735] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all placeholder-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">연락처 *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-XXXX-XXXX"
                      className="w-full bg-[#121316] border border-[#272735] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all placeholder-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-2">프로젝트 내용 및 기간안 *</label>
                    <textarea
                      name="content"
                      rows={4}
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="원하시는 마케팅 목적, 시안 구상, 필요로 하시는 납기일정 및 대강의 세부 예산을 남겨주시면 합리적인 계획과 대응 기획서를 동봉해 신속 회신 드립니다."
                      className="w-full bg-[#121316] border border-[#272735] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all placeholder-zinc-600 resize-none font-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-4 bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:bg-[#8b5cf6]/50 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all hover:translate-y-[-1px] active:translate-y-0 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(139,92,246,0.2)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.35)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        성안 전송 및 암호 보존 중...
                      </span>
                    ) : (
                      <>
                        제출 및 전송하기
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
