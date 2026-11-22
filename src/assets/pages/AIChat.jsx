import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "../components/AIChat/ChatHeader";
import Sidebar from "../components/AIChat/Sidebar";
import ChatMessages from "../components/AIChat/ChatMessages";
import ChatInput from "../components/AIChat/ChatInput";
import SettingsModal from "../components/AIChat/SettingsModal";

const SAMPLE_AI_RESPONSE = `Wudhu menggunakan air kopi adalah **tidak sah**.

Menurut mazhab fikih yang umum dianut (seperti Mazhab Syafi'i), syarat air yang sah digunakan untuk bersuci (wudhu atau mandi wajib) adalah air yang mutlak, yaitu air suci dan menyucikan (*suci lagi mensucikan*).

Kopi dikategorikan sebagai **air musta'mal** (air yang sudah tercampur dengan benda suci lain seperti biji kopi, sehingga mengalami perubahan warna, bau, atau rasa) atau disebut juga air muqoyyad (air terikat). Meskipun kopi itu halal dan suci untuk diminum, zat-zat pada kopi telah mengubah sifat air mutlak tersebut, sehingga kehilangan kemampuannya untuk mengangkat hadas dan najis.

Agar wudhu sah, air yang digunakan haruslah air mutlak seperti air sumur, air hujan, air sungai, air mata air, atau air ledeng yang sifat aslinya (warna, rasa, dan bau) tetap terjaga dan tidak tercampur oleh bahan-bahan lain.`;

export default function AIChat() {
  const navigate = useNavigate();

  // Settings modal visibility state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Ensure dark class and theme storage are removed
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("al-hikmah-theme");
    }
  }, []);

  // Detect desktop breakpoint (>= 1024px)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  // On desktop, chat history sidebar is docked open by default, can be toggled via hamburger
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "user",
      content: "Apa hukumnya wudhu pakai air kopi",
    },
    {
      role: "assistant",
      content: SAMPLE_AI_RESPONSE,
    },
  ]);

  // Handle responsive window resize
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleSelectChat = (questionText) => {
    setMessages([
      {
        role: "user",
        content: questionText,
      },
      {
        role: "assistant",
        content: SAMPLE_AI_RESPONSE,
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
      displayContent = userText ? `${userText}\n\n[Lampiran: ${attachSummary}]` : `[Lampiran: ${attachSummary}]`;
    }

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: displayContent,
      },
      {
        role: "assistant",
        content: SAMPLE_AI_RESPONSE,
      },
    ]);
  };

  return (
    <div className="w-full h-screen flex bg-bg-base overflow-hidden">
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Chat History Sidebar (Standalone in AIChat without DesktopSidebar) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onSelectChat={handleSelectChat}
        isDesktop={isDesktop}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-bg-surface relative">
        {/* Header */}
        <ChatHeader
          onToggleSidebar={handleToggleSidebar}
          onNewChat={handleNewChat}
          onHome={handleHome}
        />

        {/* Centered Reading Column */}
        <div className="flex-1 flex flex-col w-full max-w-3xl lg:max-w-4xl mx-auto overflow-hidden">
          <ChatMessages messages={messages} />

          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handleSend}
          />
        </div>
      </main>
    </div>
  );
}
