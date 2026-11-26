import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "../components/AIChat/ChatHeader";
import Sidebar from "../components/AIChat/Sidebar";
import ChatMessages from "../components/AIChat/ChatMessages";
import ChatInput from "../components/AIChat/ChatInput";
import SettingsModal from "../components/AIChat/SettingsModal";
import { TANYA_SAMPLE_RESPONSES } from "../../data/demoData";
import { useAuth } from "../../context/authStore";
import { IconInfo } from "../../lib/icons";

function pickSampleResponse(questionText) {
  const lower = questionText.toLowerCase();
  if (lower.includes("nuzulul") || lower.includes("17")) {
    return TANYA_SAMPLE_RESPONSES["q-nuzulul"];
  }
  if (lower.includes("buka") || lower.includes("doa")) {
    return TANYA_SAMPLE_RESPONSES["q-doa-buka"];
  }
  if (lower.includes("lailatul") || lower.includes("malam terakhir")) {
    return TANYA_SAMPLE_RESPONSES["q-lailatul"];
  }
  if (
    lower.includes("tadarus") ||
    lower.includes("adab") ||
    lower.includes("baca")
  ) {
    return TANYA_SAMPLE_RESPONSES["q-tadarus"];
  }
  return TANYA_SAMPLE_RESPONSES["q-air"];
}

export default function AIChat() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const replyTimerRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  // Riwayat percakapan selalu tertutup saat halaman Tanya dibuka (web maupun mobile);
  // sidebar navigasi utama tetap terbuka di desktop.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [input, setInput] = useState("");
  // Mulai langsung dengan percakapan baru (New Conversation)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    setIsTyping(false);
    setMessages([]);
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const handleHome = () => {
    if (currentUser?.role === "guru") navigate("/guru");
    else if (currentUser?.role === "orang-tua") navigate("/orang-tua");
    else navigate("/");
  };

  const handleSelectChat = (item) => {
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    setIsTyping(false);
    const sample =
      TANYA_SAMPLE_RESPONSES[item.id] || pickSampleResponse(item.text);

    setMessages([
      {
        id: `u-${Date.now()}`,
        role: "user",
        content: item.text,
      },
      {
        id: `a-${Date.now() + 1}`,
        role: "assistant",
        sample,
      },
    ]);

    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const handleSend = (attachments = []) => {
    const userText = input.trim();
    if (!userText && attachments.length === 0) return;

    let displayContent = userText;
    if (attachments.length > 0) {
      const attachSummary = attachments.map((a) => a.name).join(", ");
      displayContent = userText
        ? `${userText}\n\n[Lampiran: ${attachSummary}]`
        : `[Lampiran: ${attachSummary}]`;
    }

    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        role: "user",
        content: displayContent,
      },
    ]);

    setIsTyping(true);
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);

    replyTimerRef.current = setTimeout(() => {
      const sample = pickSampleResponse(userText || "air");
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          sample,
        },
      ]);
      replyTimerRef.current = null;
    }, 750);
  };

  return (
    <div className="w-full h-screen flex bg-bg-base overflow-hidden">
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Panel / Drawer Riwayat Tanya (tertutup secara default, buka-tutup via header) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onSelectChat={handleSelectChat}
        isDesktop={isDesktop}
        hideFooterProfile={isDesktop}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Tanya Viewport */}
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-bg-base relative">
        <ChatHeader
          onToggleSidebar={handleToggleSidebar}
          onNewChat={handleNewChat}
          onHome={handleHome}
        />

        <div className="w-full bg-accent-50 border-b border-accent-200 px-4 md:px-6 py-2.5 shrink-0">
          <div className="max-w-[820px] mx-auto flex items-start sm:items-center gap-2 text-xs text-accent-800">
            <IconInfo
              className="text-base text-accent-600 shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
            />
            <p className="leading-snug">
              Jawaban di halaman <strong>Tanya</strong> dapat keliru. Untuk
              persoalan hukum agama, tanyakan langsung kepada guru atau orang
              tua.
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col w-full max-w-[820px] mx-auto overflow-hidden">
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            onQuickPrompt={(item) => handleSelectChat(item)}
          />

          <ChatInput input={input} setInput={setInput} onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}
