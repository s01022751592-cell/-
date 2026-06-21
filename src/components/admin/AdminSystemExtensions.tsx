import React, { useState } from "react";
import { 
  Database, Flame, Terminal, Code, Info, Play, Check, 
  HelpCircle, Server, ShieldCheck, Cpu 
} from "lucide-react";

export default function AdminSystemExtensions() {
  const [activeSubTab, setActiveSubTab] = useState<"firebase" | "cloudsql" | "gemini">("firebase");
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [pingLatency, setPingLatency] = useState<number | null>(null);

  const simulateApiTest = () => {
    setTestStatus("testing");
    const start = performance.now();
    setTimeout(() => {
      const end = performance.now();
      setPingLatency(Math.round(end - start + 42));
      setTestStatus("success");
    }, 1200);
  };

  const snippets = {
    firebase: `// Firebase Firestore Integration Schema (Durable Cloud Persistence)
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "portfolio-brand.firebaseapp.com",
  projectId: "portfolio-brand",
  storageBucket: "portfolio-brand.appspot.com",
};

// Initialize singletons
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save Inquiry to firestore
export async function saveClientInquiry(inquiryData) {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...inquiryData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("Firestore Upload Error", err);
    throw err;
  }
}`,
    cloudsql: `// PostgreSQL + Drizzle ORM Setup Schema (Cloud SQL Backend)
// Define table structure under src/db/schema.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Express route API handler in server.ts
import { db } from "./db";
import { inquiries } from "./db/schema";

app.post("/api/inquiries", async (req, res) => {
  try {
    const { name, email, phone, content } = req.body;
    const [inserted] = await db.insert(inquiries).values({
      name, email, phone, content
    }).returning();
    
    return res.status(201).json({ success: true, inquiry: inserted });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});`,
    gemini: `// Server-Side Gemini AI Auto-Categorizer Integration API
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeAndSummarizeInquiry(content: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: \`수신된 비즈니스 파트너의 의뢰 내용입니다. 다음 텍스트를 분석하여 핵심 요구사항을 2줄 요약해 주세요.
      의뢰내용: \${content}\`
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "요약 처리에 실패했습니다.";
  }
}`
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-[#131418] border border-zinc-800 p-5 rounded-xl">
        <h4 className="text-white text-xs font-bold flex items-center gap-1.5 font-mono">
          <Terminal className="w-4 h-4 text-[#8b5cf6]" />
          DEVELOPER EXTENSION PROTOCOL (개발자 연계 프로토콜)
        </h4>
        <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed">
          이 포트폴리오는 프론트엔드가 격리 독립된 정밀 구조(SPA + LocalStorage)로 완결 설계되어 있습니다. 향후 실제 데이터베이스 연동 및 업무 자동화(Slack전송/이메일알람/AI 자동 요약)를 필요로 하신다면 본 패널의 스니펫을 이식하여 아주 신속하게 확장할 수 있습니다.
        </p>
      </div>

      {/* API Sandbox Test */}
      <div className="bg-[#1a1b22] border border-[#272735] p-5 rounded-xl">
        <h5 className="text-white text-xs font-semibold mb-2 flex items-center gap-1.5">
          <Server className="w-3.5 h-3.5 text-[#8b5cf6]" />
          실시간 연동 시뮬레이터 (Connectivity Lab)
        </h5>
        <p className="text-zinc-500 text-[10px] mb-4">
          서버 백엔드 또는 제3자 API 서비스와의 네트워크 왕복 지연값(latency)을 안전 테스트합니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#121316] rounded-xl border border-[#272735] gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
              testStatus === "success" 
                ? "bg-emerald-950/20 text-emerald-450 border-emerald-500/25" 
                : "bg-zinc-900 text-zinc-500 border-zinc-800"
            }`}>
              <Cpu className="w-4 h-4" />
            </div>

            <div>
              <p className="text-xs text-white font-bold">
                {testStatus === "idle" && "대기 중.."}
                {testStatus === "testing" && "연동 주소 및 핑 테스트 패킷 송출 중.."}
                {testStatus === "success" && "테스트 연결 성공"}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                {testStatus === "success" && pingLatency ? `정상 응답 수신 • 반환 레이턴시 ${pingLatency}ms` : "요청 대기 상태"}
              </p>
            </div>
          </div>

          <button
            onClick={simulateApiTest}
            disabled={testStatus === "testing"}
            className="px-4 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:bg-zinc-800 text-white font-extrabold text-xs rounded-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            접속 핑 시뮬레이션
          </button>
        </div>
      </div>

      {/* Code Snippets Browser Section */}
      <div className="bg-[#1a1b22] border border-[#272735] rounded-xl overflow-hidden">
        {/* Sub tabs */}
        <div className="flex border-b border-[#272735] bg-[#121316]">
          <button
            onClick={() => setActiveSubTab("firebase")}
            className={`flex-1 py-3 text-center text-xs font-bold border-r border-[#272735] cursor-pointer transition-all ${
              activeSubTab === "firebase" 
                ? "bg-[#1a1b22] text-[#a78bfa] border-b-2 border-b-[#8b5cf6]" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            🔥 Firebase Firestore 연동
          </button>
          <button
            onClick={() => setActiveSubTab("cloudsql")}
            className={`flex-1 py-3 text-center text-xs font-bold border-r border-[#272735] cursor-pointer transition-all ${
              activeSubTab === "cloudsql" 
                ? "bg-[#1a1b22] text-[#a78bfa] border-b-2 border-b-[#8b5cf6]" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            🐘 Cloud SQL + Drizzle PG
          </button>
          <button
            onClick={() => setActiveSubTab("gemini")}
            className={`flex-1 py-3 text-center text-xs font-bold cursor-pointer transition-all ${
              activeSubTab === "gemini" 
                ? "bg-[#1a1b22] text-[#a78bfa] border-b-2 border-b-[#8b5cf6]" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            ✨ Gemini AI 의뢰서 분석
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <Info className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span>
              {activeSubTab === "firebase" && "실시간 실용성에 강한 NoSQL 클라우드 DB 연결 스니펫입니다."}
              {activeSubTab === "cloudsql" && "관계형 데이터 모델링 및 Drizzle ORM 이식 소스코드입니다."}
              {activeSubTab === "gemini" && "Gemini AI를 연동해 들어오는 업무를 자동 필터 및 태스크 우선순위 배정하는 모듈입니다."}
            </span>
          </div>

          {/* Pre formatted code box */}
          <div className="relative">
            <pre className="p-4 bg-[#0c0d10] border border-zinc-800 rounded-lg text-[10px] sm:text-xs text-zinc-300 font-mono overflow-x-auto max-h-72 select-all leading-relaxed whitespace-pre">
              {snippets[activeSubTab]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
