import React, { useState } from "react";
import { Inquiry } from "../../types";
import { 
  Trash, Copy, Check, Inbox, Search, Mail, Phone, Calendar, 
  MessageSquare, User, Terminal
} from "lucide-react";

interface AdminInboxProps {
  inquiries: Inquiry[];
  onDeleteInquiry: (id: string) => void;
}

export default function AdminInbox({
  inquiries,
  onDeleteInquiry,
}: AdminInboxProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyDetails = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const text = (inq.name + " " + inq.email + " " + inq.phone + " " + inq.content).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Search Input for CRM Messages */}
      <div className="bg-[#131418] p-4 rounded-xl border border-[#272735] flex items-center gap-2">
        <Search className="w-4 h-4 text-zinc-500 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="보낸이 이름, 이메일 주소, 내용 키워드로 의뢰 검색..."
          className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-zinc-650 font-normal"
        />
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <Inbox className="w-4 h-4 text-[#8b5cf6]" />
        <h4 className="text-white text-xs font-bold font-mono">
          의뢰고객 메시지 저장소 (전체 {inquiries.length}건 / 검색결과 {filteredInquiries.length}건)
        </h4>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="text-center py-16 text-zinc-500 text-xs bg-[#1a1b22]/50 border border-dashed border-[#272735] rounded-xl flex flex-col items-center justify-center gap-2">
          <MessageSquare className="w-8 h-8 text-zinc-600 animate-pulse" />
          <span>현재 수신되거나 검색어에 부합하는 클라이언트 제안이 존재하지 않습니다.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-[#1a1b22] border border-[#272735] hover:border-[#8b5cf6]/30 rounded-xl p-5 transition-all space-y-4"
            >
              {/* Inbox Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center border border-[#8b5cf6]/20">
                    <User className="w-3.5 h-3.5 text-[#a78bfa]" />
                  </div>
                  <div>
                    <span className="font-extrabold text-white text-xs sm:text-sm mr-2">{inq.name}</span>
                    <span className="text-[10px] text-[#a78bfa] font-mono px-1.5 py-0.2 bg-[#121316] border border-[#8b5cf6]/25 rounded">
                      Client
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    <span>
                      {new Date(inq.createdAt).toLocaleDateString()} {new Date(inq.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteInquiry(inq.id)}
                    className="p-1 px-2.5 text-red-450 hover:text-white rounded bg-red-950/20 hover:bg-red-900/60 transition-colors border border-red-900/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash className="w-3 h-3 text-red-400" />
                    제안서 폐기
                  </button>
                </div>
              </div>

              {/* Sender Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] sm:text-xs text-zinc-400 bg-[#121316] p-3.5 rounded-lg border border-[#272735] font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0" />
                  <span className="font-bold text-zinc-500 shrink-0">이메일:</span>
                  <span className="text-zinc-100 truncate">{inq.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0" />
                  <span className="font-bold text-zinc-500 shrink-0">연락처:</span>
                  <span className="text-zinc-100">{inq.phone}</span>
                </div>
              </div>

              {/* Message block */}
              <div className="bg-[#121316] rounded-lg p-4 border border-[#272735] text-xs leading-relaxed text-zinc-300">
                <p className="whitespace-pre-wrap font-normal select-text">
                  {inq.content}
                </p>
              </div>

              {/* Footer copy option */}
              <div className="flex justify-between items-center bg-[#131418] p-2.5 rounded border border-[#272735] text-[10px]">
                <div className="flex items-center gap-1.5 text-zinc-500 font-mono">
                  <Terminal className="w-3 h-3 text-[#8b5cf6]" />
                  <span>ID: {inq.id}</span>
                </div>

                <button
                  onClick={() => {
                    const str = `[의뢰접수 알림]\n이름: ${inq.name}\n이메일: ${inq.email}\n연락처: ${inq.phone}\n내용:\n${inq.content}`;
                    handleCopyDetails(str, inq.id);
                  }}
                  className="px-3 py-1.5 rounded bg-[#121316] hover:bg-[#202128] text-[10px] text-zinc-400 hover:text-white border border-[#272735] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedId === inq.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      성공적으로 복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8b5cf6]" />
                      이 내용 클립보드 복사
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
