"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Loader2, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface HookyChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HookyChatModal({ isOpen, onClose }: HookyChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm Hooky, your HookTap assistant. I can help you with features, pricing, integrations, or any questions about HookTap. What can I do for you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const messageHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      messageHistory.push({ role: "user", content: input });

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageHistory }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response from Hooky");
      }

      const aiMessage = data.message;

      const newMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          aiMessage.content ||
          "I'm not sure how to respond to that. Please try again.",
      };
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Hooky Chat Error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Chat Container – dark glass theme */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh] overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,16,0.98) 0%, rgba(8,8,10,0.99) 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "0 40px 100px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="p-5 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <Bot className="w-5 h-5" style={{ color: "#ef4444" }} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">Hooky</h3>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                HookTap AI Assistant
              </p>
            </div>
            {/* Online indicator */}
            <div className="flex items-center gap-1.5 ml-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400/70">Online</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.08)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-5 space-y-4 overflow-x-hidden"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2.5 max-w-[85%] min-w-0 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={
                    msg.role === "user"
                      ? { background: "#ef4444", color: "#fff" }
                      : {
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "rgba(255,255,255,0.45)",
                        }
                  }
                >
                  {msg.role === "user" ? (
                    <User size={14} />
                  ) : (
                    <Bot size={14} />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className="p-3.5 rounded-2xl min-w-0 flex-1"
                  style={
                    msg.role === "user"
                      ? {
                          background: "#ef4444",
                          color: "#fff",
                          borderTopRightRadius: "4px",
                          boxShadow: "0 4px 20px rgba(239,68,68,0.25)",
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          color: "rgba(255,255,255,0.88)",
                          borderTopLeftRadius: "4px",
                        }
                  }
                >
                  <div className="text-sm leading-relaxed break-words overflow-wrap-anywhere">
                    {msg.role === "assistant" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline font-medium break-all transition-opacity hover:opacity-75"
                              style={{ color: "#f87171" }}
                            />
                          ),
                          p: ({ ...props }) => (
                            <p
                              {...props}
                              className="m-0 mb-2 last:mb-0 break-words"
                            />
                          ),
                          code: ({ ...props }) => (
                            <code
                              {...props}
                              className="rounded px-1.5 py-0.5 text-xs font-mono break-all whitespace-pre-wrap"
                              style={{
                                background: "rgba(255,255,255,0.1)",
                                color: "#fca5a5",
                              }}
                            />
                          ),
                          pre: ({ ...props }) => (
                            <pre
                              {...props}
                              className="rounded-xl p-3 overflow-x-auto max-w-full text-xs font-mono my-2 whitespace-pre-wrap"
                              style={{ background: "rgba(0,0,0,0.35)" }}
                            />
                          ),
                          strong: ({ ...props }) => (
                            <strong
                              {...props}
                              className="font-semibold"
                              style={{ color: "#fff" }}
                            />
                          ),
                          ul: ({ ...props }) => (
                            <ul {...props} className="pl-4 my-1 space-y-0.5 list-disc" />
                          ),
                          ol: ({ ...props }) => (
                            <ol {...props} className="pl-4 my-1 space-y-0.5 list-decimal" />
                          ),
                          li: ({ ...props }) => (
                            <li {...props} className="break-words" />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <p className="break-words overflow-wrap-anywhere">
                        {msg.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-2.5 max-w-[85%] min-w-0">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  <Bot size={14} />
                </div>
                <div
                  className="p-3.5 rounded-2xl flex items-center gap-2 min-w-0"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderTopLeftRadius: "4px",
                  }}
                >
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin flex-shrink-0"
                    style={{ color: "#ef4444" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Thinking...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-5 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about HookTap..."
              className="w-full pl-5 pr-14 py-3.5 rounded-2xl text-sm transition-all focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.88)",
              }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(239,68,68,0.5)")
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.10)")
              }
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:grayscale"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p
            className="text-[10px] text-center mt-2.5"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Hooky may occasionally provide inaccurate information. Contact Support for specific questions.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
