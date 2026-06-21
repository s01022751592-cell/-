import React, { useState, useEffect } from "react";
import { Project } from "../../types";
import { 
  Plus, Trash2, Edit, Save, CheckCircle, Search, Filter, 
  ArrowRight, Image as ImageIcon, Eye, Grid, Video,
  ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X as XIcon, Zap
} from "lucide-react";

interface AdminProjectsProps {
  projects: Project[];
  onUpdateProjects: (updated: Project[]) => void;
  onResetProjects: () => void;
}

export default function AdminProjects({
  projects,
  onUpdateProjects,
  onResetProjects,
}: AdminProjectsProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTagFilter, setSelectedTagFilter] = useState("all");

  // Project item edit states
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Form Field States
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPeriod, setFormPeriod] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formExtraImages, setFormExtraImages] = useState<string[]>([]);
  const [formVideoUrl, setFormVideoUrl] = useState("");

  // Video trimming & compression processing states
  const [videoProcessingProgress, setVideoProcessingProgress] = useState<number | null>(null);
  const [videoProcessingStatus, setVideoProcessingStatus] = useState<string>("");

  // Compress a single base64 string to 1920x1920 maximum, JPEG quality 0.9 for high fidelity
  const compressBase64Image = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      if (!base64Str || !base64Str.startsWith("data:image/")) {
        resolve(base64Str);
        return;
      }
      
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;
        let width = img.width;
        let height = img.height;

        // If it's already compact enough, just keep it to save CPU cycles
        if (width <= MAX_WIDTH && height <= MAX_HEIGHT && base64Str.length < 250000) {
          resolve(base64Str);
          return;
        }

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressed = canvas.toDataURL("image/jpeg", 0.9);
        resolve(compressed);
      };
      
      img.onerror = () => {
        resolve(base64Str);
      };
    });
  };

  // Optimize all portfolio images on-demand to free up LocalStorage space
  const handleOptimizeAllImages = async () => {
    setIsOptimizing(true);
    try {
      const optimizedProjects = await Promise.all(
        projects.map(async (p) => {
          const optimizedImageUrl = await compressBase64Image(p.imageUrl);
          const optimizedExtraImages = p.extraImages 
            ? await Promise.all(p.extraImages.map(img => compressBase64Image(img)))
            : [];
          
          return {
            ...p,
            imageUrl: optimizedImageUrl,
            extraImages: optimizedExtraImages
          };
        })
      );
      
      onUpdateProjects(optimizedProjects);
      alert("전체 이미지 용량이 대폭 압축 및 최적화 되었습니다! 브라우저 로컬 저장공간(LocalStorage)의 여유를 확보하여 이제 안전하게 저장할 수 있습니다.");
    } catch (err) {
      console.error("Optimization failed:", err);
      alert("최적화 과정에서 오류가 발생했습니다. 일부 파일 포맷을 확인해 주세요.");
    } finally {
      setIsOptimizing(false);
    }
  };

  // Collect all unique tags for filter option
  const allTagsSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => allTagsSet.add(t.trim())));
  const allTagsList = Array.from(allTagsSet);

  // Auto-Save Effect for Edit Mode
  useEffect(() => {
    if (!editingProjectId) return;
    
    const timer = setTimeout(() => {
      const currProject = projects.find(p => p.id === editingProjectId);
      if (!currProject) return;

      const newTags = formTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
      
      const isChanged = 
        currProject.title !== formTitle ||
        currProject.description !== formDescription ||
        currProject.period !== formPeriod ||
        currProject.details !== formDetails ||
        currProject.imageUrl !== formImage ||
        currProject.videoUrl !== (formVideoUrl.trim() || undefined) ||
        JSON.stringify(currProject.extraImages || []) !== JSON.stringify(formExtraImages) ||
        currProject.tags.join(",") !== newTags.join(",");

      if (isChanged) {
        const updated = projects.map((p) => {
          if (p.id === editingProjectId) {
            return {
              ...p,
              title: formTitle,
              description: formDescription,
              period: formPeriod,
              tags: newTags,
              details: formDetails,
              imageUrl: formImage,
              extraImages: formExtraImages,
              videoUrl: formVideoUrl.trim() || undefined,
            };
          }
          return p;
        });
        onUpdateProjects(updated);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formTitle, formDescription, formPeriod, formTags, formDetails, formImage, formExtraImages, formVideoUrl, editingProjectId, projects, onUpdateProjects]);

  // Handle Multi-image/thumbnail conversion to Base64
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      if (isMain) {
        const file = files[0];
        if (file.size > 10 * 1024 * 1024) {
          alert("이미지 파일이 너무 큽니다. 10MB 이하의 이미지를 업로드해 주세요.");
          return;
        }
        const base64 = await convertFileToBase64(file);
        setFormImage(base64);
      } else {
        const convertedList: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > 10 * 1024 * 1024) {
            alert(`"${file.name}" 파일이 너무 큽니다. 10MB 이하의 이미지를 업로드해 주세요.`);
            continue;
          }
          const base64 = await convertFileToBase64(file);
          convertedList.push(base64);
        }
        setFormExtraImages((prev) => [...prev, ...convertedList]);
      }
    } catch (err) {
      console.warn("Image conversion failed:", err);
    }
  };

  const processAndCompressVideo = async (file: File) => {
    setVideoProcessingProgress(0);
    setVideoProcessingStatus("비디오 메타데이터 로드 중...");
    
    try {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("webkit-playsinline", "true");
      
      // Load video metadata
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = (e) => reject(new Error("비디오 메타데이터를 로드하는 데 실패했습니다. 올바른 포맷의 영상 파일인지 확인해 주세요."));
        setTimeout(() => reject(new Error("비디오 로드 시간 초과 (10초)")), 10000);
      });

      const maxDuration = Math.min(30, video.duration || 30);
      setVideoProcessingStatus(`총 ${Math.floor(video.duration || 0)}초 영상 중 첫 30초 추출 및 초고압축 인코딩 시작...`);

      // 400x224 - high storage efficiency resolution
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 224;
      const ctx = canvas.getContext("2d");

      let stream: MediaStream;
      if (typeof canvas.captureStream === "function") {
        stream = canvas.captureStream(12); // Record at smooth 12fps
      } else if (typeof (canvas as any).mozCaptureStream === "function") {
        stream = (canvas as any).mozCaptureStream(12);
      } else {
        throw new Error("브라우저가 HTML5 Canvas Stream 캡처 기능을 지원하지 않습니다.");
      }

      // Check supported MIME type for MediaRecorder
      let mimeType = "video/webm;codecs=vp8";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported("video/mp4")) {
          mimeType = "video/mp4";
        } else if (MediaRecorder.isTypeSupported("video/webm")) {
          mimeType = "video/webm";
        } else {
          mimeType = ""; // Let default handle it
        }
      }

      // 100kbps (extremely compact - yields ~375KB for a full 30s video)
      const options: MediaRecorderOptions = {
        videoBitsPerSecond: 100000 
      };
      if (mimeType) {
        options.mimeType = mimeType;
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      let recordFinishedResolve: () => void;
      const recordFinishedPromise = new Promise<void>((res) => {
        recordFinishedResolve = res;
      });

      mediaRecorder.onstop = () => {
        recordFinishedResolve();
      };

      mediaRecorder.start();
      await video.play();

      let animationFrameId: number;
      const drawFrame = () => {
        if (video.paused || video.ended) return;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const currentSeconds = video.currentTime;
        const progressPercent = Math.min(100, Math.floor((currentSeconds / maxDuration) * 100));
        setVideoProcessingProgress(progressPercent);
        setVideoProcessingStatus(`30초 최적화 영상 제작 중... (${Math.floor(currentSeconds)}초 / ${Math.floor(maxDuration)}초)`);

        if (currentSeconds >= maxDuration) {
          mediaRecorder.stop();
          video.pause();
          return;
        }
        
        animationFrameId = requestAnimationFrame(drawFrame);
      };

      video.addEventListener("play", drawFrame);

      video.onended = () => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      };

      await recordFinishedPromise;
      
      URL.revokeObjectURL(url);
      cancelAnimationFrame(animationFrameId);

      const finalBlob = new Blob(chunks, { type: mimeType || "video/webm" });
      
      setVideoProcessingStatus("최적화 비디오 바이트 로딩 중...");
      const reader = new FileReader();
      const base64Data = await new Promise<string>((res, rej) => {
        reader.onload = () => res(reader.result as string);
        reader.onerror = (e) => rej(e);
        reader.readAsDataURL(finalBlob);
      });

      setFormVideoUrl(base64Data);
      setVideoProcessingProgress(null);
      setVideoProcessingStatus("");
      alert("성공: 고압축 30초 동영상 최적화 파일이 완벽히 인코딩되어 적용되었습니다!");
    } catch (err: any) {
      console.warn("Video compression error:", err);
      setVideoProcessingProgress(null);
      setVideoProcessingStatus("");
      alert(`비디오 압축 인코딩 실패: ${err.message || err}`);
    }
  };

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // If file is already extremely tiny (less than 400KB), we can proceed immediately to save time.
    if (file.size <= 400 * 1024) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setFormVideoUrl(reader.result as string);
          alert("성공: 400KB 미만의 소용량 동영상이 즉각 등록되었습니다.");
        };
      } catch (err) {
        console.warn("Fast video load failed:", err);
      }
      return;
    }

    // Always offer to compress and trim high quality videos to first 30 seconds to fit into LocalStorage safely!
    const confirmCompress = window.confirm(
      `입력받은 동영상 파일(${(file.size / 1024 / 1024).toFixed(1)}MB)은 브라우저 공간을 초과할 위험이 높습니다.\n\n` +
      `브라우저 저장 오류를 원천 차단하기 위해 영상의 '첫 30초 분량'을 최적화 퀄리티 고압축 파일로 자동 인코딩 후 포트폴리오에 적용합니다. 진행할까요?`
    );

    if (confirmCompress) {
      processAndCompressVideo(file);
    }
  };

  const FormVideoUrlWithProgress = (videoUrlVal: string, setVideoUrlVal: (val: string) => void) => {
    if (videoProcessingProgress !== null) {
      return (
        <div className="mt-2 bg-[#1b1c24] border border-purple-800/40 rounded-lg p-2.5">
          <div className="flex justify-between items-center text-[10px] text-[#a78bfa] mb-1.5 font-bold">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
              {videoProcessingStatus}
            </span>
            <span>{videoProcessingProgress}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${videoProcessingProgress}%` }}
            />
          </div>
          <span className="text-[9px] text-zinc-400 block mt-1 leading-relaxed">
            * 웹캠/녹화 캡처 기법으로 첫 30초를 초고압축합니다. 완료 시 자동 저장됩니다.
          </span>
        </div>
      );
    }

    if (videoUrlVal && videoUrlVal.startsWith("data:")) {
      return (
        <div className="mt-1 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          초인코딩 고압축 30초 파트 적용 완료!
          <button 
            type="button" 
            onClick={() => setVideoUrlVal("")} 
            className="text-red-400 hover:text-red-300 ml-2 underline cursor-pointer text-[9px]"
          >
            삭제
          </button>
        </div>
      );
    }

    return null;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // If it's a video file, it should have been intercepted, but provide a fallback file size limit
      if (file.type.startsWith('video/')) {
        if (file.size > 2 * 1024 * 1024) {
          alert("동영상 파일 크기가 너무 큽니다. 자동 30초 압축 인코더 기능을 사용해 주십시오.");
          reject(new Error("Video file too large"));
          return;
        }
        
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
        return;
      }

      // If it's not an image/video, use default FileReader
      if (!file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
        return;
      }

      // Compress image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          // Max dimensions increased to 1920 for high-definition quality
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Output compressed format (jpeg, quality 0.9 for beautiful details)
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          resolve(dataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Add Project Submit
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      alert("프로젝트명과 기본 설명을 꼭 채워주세요.");
      return;
    }

    const newProj: Project = {
      id: `custom-project-${Date.now()}`,
      title: formTitle.trim(),
      description: formDescription.trim(),
      period: formPeriod.trim() || "실무 프로젝트",
      tags: formTags.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
      details: formDetails.trim() || "### 상세 기획 내용\r\n추가된 제안 및 결과 보고 사항이 아직 작성되지 않았습니다.",
      imageUrl: formImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      extraImages: formExtraImages,
      videoUrl: formVideoUrl.trim() || undefined,
      isDefault: false,
    };

    const updated = [newProj, ...projects];
    onUpdateProjects(updated);
    resetForm();
    setShowAddForm(false);
  };

  // Edit action triggers
  const handleStartEdit = (proj: Project) => {
    setEditingProjectId(proj.id);
    setFormTitle(proj.title);
    setFormDescription(proj.description || "");
    setFormPeriod(proj.period || "");
    setFormTags(proj.tags.join(", ") || "");
    setFormDetails(proj.details || "");
    setFormImage(proj.imageUrl || "");
    setFormExtraImages(proj.extraImages || []);
    setFormVideoUrl(proj.videoUrl || "");
  };

  // Close edit mode (Auto-saved)
  const handleCloseEdit = () => {
    setEditingProjectId(null);
    resetForm();
  };

  // Delete a project
  const handleDeleteProject = (id: string) => {
    if (window.confirm("이 프로젝트를 포트폴리오 갤러리에서 정말 삭제하시겠습니까?")) {
      const updated = projects.filter((p) => p.id !== id);
      onUpdateProjects(updated);
    }
  };

  const resetForm = () => {
    setFormTitle("");
    setFormDescription("");
    setFormPeriod("");
    setFormTags("");
    setFormDetails("");
    setFormImage("");
    setFormExtraImages([]);
    setFormVideoUrl("");
  };

  // Project Reordering
  const handleMoveProject = (id: string, direction: number) => {
    // Disable reordering if search or filter is active
    if (searchTerm.trim() !== "" || selectedTagFilter !== "all") {
      alert("프로젝트 순서 변경은 검색이나 필터가 해제된 상태에서만 가능합니다.");
      return;
    }

    const currentIndex = projects.findIndex((p) => p.id === id);
    if (currentIndex === -1) return;
    const targetIndex = currentIndex + direction;
    
    if (targetIndex >= 0 && targetIndex < projects.length) {
      const newProjects = [...projects];
      const temp = newProjects[currentIndex];
      newProjects[currentIndex] = newProjects[targetIndex];
      newProjects[targetIndex] = temp;
      onUpdateProjects(newProjects);
    }
  };

  const handleMoveExtraImage = (index: number, direction: number) => {
    setFormExtraImages((prev) => {
      const newArr = [...prev];
      const targetIndex = index + direction;
      if (targetIndex >= 0 && targetIndex < newArr.length) {
        const temp = newArr[index];
        newArr[index] = newArr[targetIndex];
        newArr[targetIndex] = temp;
      }
      return newArr;
    });
  };

  const handleDeleteExtraImage = (index: number) => {
    setFormExtraImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter projects by search query & selected tag
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (proj.description && proj.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = 
      selectedTagFilter === "all" || 
      proj.tags.some(t => t.trim().toLowerCase() === selectedTagFilter.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Grid */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#131418] p-4 rounded-xl border border-[#272735]">
        <div className="w-full sm:w-auto flex-1 flex items-center gap-2 bg-[#121316] border border-[#272735] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="프로젝트 이름 또는 설명으로 검색..."
            className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-zinc-600 font-normal"
          />
        </div>
        
        <div className="w-full sm:w-auto flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span>태그 필터:</span>
          </div>
          <select
            value={selectedTagFilter}
            onChange={(e) => setSelectedTagFilter(e.target.value)}
            className="bg-[#121316] border border-[#272735] text-zinc-300 text-xs rounded px-2.5 py-2 cursor-pointer focus:outline-none focus:border-[#8b5cf6]"
          >
            <option value="all">전체 태그 보기</option>
            {allTagsList.map((tag) => (
              <option key={tag} value={tag}>#{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Storage Capacity Warning and Optimizer tool */}
      <div className="bg-[#15161d] border border-purple-900/40 p-3.5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Zap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[#a78bfa] font-bold block mb-0.5">포트폴리오 미디어 일괄 압축 및 복구</span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              고해상도 이미지 데이터로 인해 브라우저 저장공간 한도(LocalStorage 5MB) 초과 에러가 발생한 경우, 
              아래 버튼을 눌러 모든 등록 대표/추가 이미지를 최적 해상도로 용량 다이어트 시킬 수 있습니다.
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={isOptimizing}
          onClick={handleOptimizeAllImages}
          className="shrink-0 w-full md:w-auto bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold text-[11px] px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow"
        >
          {isOptimizing ? (
            <>
              <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              최적화 압축 진행 중...
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
              이미지 최적화 일괄 적용하기
            </>
          )}
        </button>
      </div>

      {/* Trigger Add Form Button */}
      {!showAddForm && !editingProjectId && (
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="w-full py-4 border-2 border-dashed border-[#8b5cf6]/35 hover:border-[#8b5cf6] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#a78bfa] transition-all bg-[#1a1b22]/30 hover:bg-[#1a1b22]/60 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#8b5cf6]" />
          새로운 마케팅 / 비주얼 디자인 프로젝트 추가하기
        </button>
      )}

      {/* Add Form Portal */}
      {showAddForm && (
        <form
          onSubmit={handleAddProject}
          className="bg-[#1a1b22] border border-[#8b5cf6]/30 p-5 rounded-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#272735] pb-3 mb-2">
            <span className="text-white text-xs font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
              신규 마케팅 보드 추가 양식
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-zinc-500 hover:text-[#a78bfa] text-xs font-semibold cursor-pointer"
            >
              생성 닫기
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                프로젝트명 / 대시보드 타이틀 *
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="예: [카카오 비즈니스 제안서]"
                className="w-full bg-[#121316] border border-[#272735] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                기획 연도 및 소유 (예: 2026.04 기획)
              </label>
              <input
                type="text"
                value={formPeriod}
                onChange={(e) => setFormPeriod(e.target.value)}
                placeholder="예: 2026.01 - 2026.03 (인턴 기획물)"
                className="w-full bg-[#121316] border border-[#272735] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1">
              핵심 키워드 태그 (쉼표로 구분하여 등록)
            </label>
            <input
              type="text"
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              placeholder="예: SNS 마케팅, 데이터 분석, Figma, 성과분석"
              className="w-full bg-[#121316] border border-[#272735] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1">
              메인 홈페이지 썸네일 표시 단골 설명 (짧은 헤드카피) *
            </label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows={2}
              placeholder="포트폴리오 카드 컴포넌트에 즉시 렌더링될 줄거리 텍스트를 기입해 주세요."
              className="w-full bg-[#121316] border border-[#272735] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6] resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 mb-1">
              상세 모달 보고서 기획 상세 내용 (Markdown 지원)
            </label>
            <textarea
              value={formDetails}
              onChange={(e) => setFormDetails(e.target.value)}
              rows={4}
              placeholder="### 📌 상세 성과 지표&#10;1. 주요 도달률 140% 목표 초과성과&#10;2. 세련된 비주얼 연출로 참여자 만족 증대"
              className="w-full bg-[#121316] border border-[#272735] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6] font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                대표 썸네일 이미지 업로드 (최대 5MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageFileChange(e, true)}
                className="w-full bg-[#121316] border border-[#272735] rounded p-1 text-[11px] text-zinc-500 focus:outline-none"
              />
              {formImage && (
                <div className="mt-1 text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  대표 미디어 Base64 빌드 완료
                </div>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                기획 보고 첨부자료 업로드 (멀티 선택 가능)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageFileChange(e, false)}
                className="w-full bg-[#121316] border border-[#272735] rounded p-1 text-[11px] text-zinc-500 focus:outline-none"
              />
              {formExtraImages.length > 0 && (
                <div className="mt-1">
                  <div className="text-[10px] text-[#a78bfa] flex items-center gap-1 font-semibold animate-pulse mb-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {formExtraImages.length}개의 관련 시각자료가 추가 등록됨
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {formExtraImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded overflow-hidden border border-[#272735] aspect-video">
                        <img src={img} alt={`Extra ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                          <button type="button" onClick={() => handleMoveExtraImage(idx, -1)} disabled={idx === 0} className="text-white hover:text-[#a78bfa] disabled:opacity-30 cursor-pointer p-1">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => handleDeleteExtraImage(idx)} className="text-red-400 hover:text-red-300 mx-1 cursor-pointer p-1 bg-red-900/30 rounded-full">
                            <XIcon className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" onClick={() => handleMoveExtraImage(idx, 1)} disabled={idx === formExtraImages.length - 1} className="text-white hover:text-[#a78bfa] disabled:opacity-30 cursor-pointer p-1">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                동영상 파일 직접 업로드 (익스플로러 업로드 / MP4, WebM 등)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                disabled={videoProcessingProgress !== null}
                className="w-full bg-[#121316] border border-[#272735] rounded p-1 text-[11px] text-zinc-500 focus:outline-none disabled:opacity-40"
              />
              {FormVideoUrlWithProgress(formVideoUrl, setFormVideoUrl)}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 mb-1">
                또는 외부 동영상 스트리밍 주소 / 유튜브 주소
              </label>
              <input
                type="text"
                value={formVideoUrl.startsWith("data:video/") ? "" : formVideoUrl}
                onChange={(e) => setFormVideoUrl(e.target.value)}
                disabled={formVideoUrl.startsWith("data:video/")}
                placeholder="예: https://example.com/video.mp4 혹은 유튜브 소스 링크"
                className="w-full bg-[#121316] border border-[#272735] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#8b5cf6] disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#272735]">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowAddForm(false);
              }}
              className="px-4 py-2 bg-zinc-800 text-zinc-400 hover:text-white rounded text-xs transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-extrabold rounded text-xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              즉시 포트폴리오 게시
            </button>
          </div>
        </form>
      )}

      {/* Projects listing */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs bg-[#1a1b22] border border-[#272735] rounded-xl">
            해당 조건의 검색된 프로젝트 자료가 존재하지 않습니다.
          </div>
        ) : (
          filteredProjects.map((proj, pIdx) => {
            const isEditing = editingProjectId === proj.id;
            const isFilterActive = searchTerm.trim() !== "" || selectedTagFilter !== "all";

            return (
              <div
                key={proj.id}
                className="bg-[#1a1b22] border border-[#272735] rounded-xl p-5 hover:border-[#8b5cf6]/35 transition-all"
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#272735]">
                      <span className="text-[#a78bfa] text-xs font-bold flex items-center gap-1">
                        <Edit className="w-4 h-4 text-[#8b5cf6]" />
                        기존 자료 편집 에디터 ({proj.title})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-bold mb-1">제목 *</label>
                        <input
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          className="w-full bg-[#121316] border border-[#272735] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-bold mb-1">기획 시점</label>
                        <input
                          type="text"
                          value={formPeriod}
                          onChange={(e) => setFormPeriod(e.target.value)}
                          className="w-full bg-[#121316] border border-[#272735] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">태그 (쉼표로 구분)</label>
                      <input
                        type="text"
                        value={formTags}
                        onChange={(e) => setFormTags(e.target.value)}
                        className="w-full bg-[#121316] border border-[#272735] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">단 카피 설명</label>
                      <textarea
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        rows={2}
                        className="w-full bg-[#121316] border border-[#272735] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">상세 보고서</label>
                      <textarea
                        value={formDetails}
                        onChange={(e) => setFormDetails(e.target.value)}
                        rows={4}
                        className="w-full bg-[#121316] border border-[#272735] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-bold mb-1">
                          썸네일 이미지 파일 교체
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, true)}
                          className="w-full bg-[#121316] border border-[#272735] rounded p-1 text-[11px] text-zinc-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-bold mb-1">
                          서브 카테고리 미디어 교체
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, false)}
                          className="w-full bg-[#121316] border border-[#272735] rounded p-1 text-[11px] text-zinc-500 focus:outline-none"
                        />
                        {formExtraImages.length > 0 && (
                          <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {formExtraImages.map((img, idx) => (
                              <div key={idx} className="relative group rounded overflow-hidden border border-[#272735] aspect-video">
                                <img src={img} alt={`Extra ${idx}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                                  <button type="button" onClick={() => handleMoveExtraImage(idx, -1)} disabled={idx === 0} className="text-white hover:text-[#a78bfa] disabled:opacity-30 cursor-pointer p-1">
                                    <ChevronLeft className="w-4 h-4" />
                                  </button>
                                  <button type="button" onClick={() => handleDeleteExtraImage(idx)} className="text-red-400 hover:text-red-300 mx-1 cursor-pointer p-1 bg-red-900/30 rounded-full">
                                    <XIcon className="w-3.5 h-3.5" />
                                  </button>
                                  <button type="button" onClick={() => handleMoveExtraImage(idx, 1)} disabled={idx === formExtraImages.length - 1} className="text-white hover:text-[#a78bfa] disabled:opacity-30 cursor-pointer p-1">
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-bold mb-1">
                          동영상 파일 직접 업로드 교체
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoFileChange}
                          disabled={videoProcessingProgress !== null}
                          className="w-full bg-[#121316] border border-[#272735] rounded p-1 text-[11px] text-zinc-500 focus:outline-none disabled:opacity-40"
                        />
                        {FormVideoUrlWithProgress(formVideoUrl, setFormVideoUrl)}
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-500 font-bold mb-1">
                          또는 외부 동영상 스트리밍 주소 수정
                        </label>
                        <input
                          type="text"
                          value={formVideoUrl.startsWith("data:video/") ? "" : formVideoUrl}
                          onChange={(e) => setFormVideoUrl(e.target.value)}
                          disabled={formVideoUrl.startsWith("data:video/")}
                          placeholder="예: https://example.com/video.mp4 혹은 유튜브 소스 링크"
                          className="w-full bg-[#121316] border border-[#272735] rounded p-2 text-xs text-white focus:outline-none focus:border-[#8b5cf6] disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-[#272735]">
                      <div className="text-emerald-400 text-xs font-bold flex items-center pr-2 gap-1.5 animate-pulse">
                        <CheckCircle className="w-3.5 h-3.5" /> 자동 저장 중
                      </div>
                      <button
                        type="button"
                        onClick={handleCloseEdit}
                        className="px-4 py-2 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded text-xs font-extrabold transition-colors cursor-pointer"
                      >
                        수정 닫기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {/* Thumbnail frame */}
                      <div className="w-16 h-12 bg-[#121316] border border-zinc-700/50 rounded overflow-hidden shrink-0 select-none flex items-center justify-center">
                        {proj.imageUrl ? (
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-zinc-600" />
                        )}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-white text-xs sm:text-sm font-bold truncate tracking-tight">{proj.title}</h4>
                          {proj.isDefault && (
                            <span className="text-[9px] bg-indigo-950/40 text-[#a78bfa] border border-[#8b5cf6]/30 px-1.5 py-0.2 rounded font-extrabold uppercase">
                              기본제공
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-[10px] text-zinc-500 font-medium">{proj.period || "기간 표시전"}</span>
                          <span className="text-zinc-600 text-[10px]">•</span>
                          <div className="flex gap-1 flex-wrap">
                            {proj.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-zinc-400 text-[9px] font-semibold bg-[#121316] px-1.5 py-0.2 rounded">
                                #{tag}
                              </span>
                            ))}
                            {proj.tags.length > 3 && (
                              <span className="text-zinc-500 text-[9px] font-semibold">+{proj.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <div className="flex items-center mr-2 bg-[#121316] border border-[#272735] rounded overflow-hidden">
                        <button
                          onClick={() => handleMoveProject(proj.id, -1)}
                          disabled={isFilterActive || pIdx === 0}
                          className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:bg-[#121316] disabled:cursor-not-allowed transition-colors cursor-pointer"
                          title="위로 이동"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-[1px] h-4 bg-[#272735]" />
                        <button
                          onClick={() => handleMoveProject(proj.id, 1)}
                          disabled={isFilterActive || pIdx === filteredProjects.length - 1}
                          className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:bg-[#121316] disabled:cursor-not-allowed transition-colors cursor-pointer"
                          title="아래로 이동"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleStartEdit(proj)}
                        className="p-1.5 bg-[#121316] hover:bg-zinc-800 text-zinc-300 hover:text-[#a78bfa] rounded transition-colors cursor-pointer text-xs flex items-center gap-1 border border-[#272735]"
                        title="자료 수용수정"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#8b5cf6]" />
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 bg-red-950/20 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-900/30 rounded transition-colors cursor-pointer text-xs flex items-center gap-1"
                        title="영구 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
