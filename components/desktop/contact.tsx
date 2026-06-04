"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";

import { WindowWrapper } from "./window-wrapper";

type Message = {
  id: number;
  content: string;
  author: "me" | "them";
};

type Page = "login" | "message";

const EMAIL_REGEX =
  /^(?=[a-z0-9@.!#$%&'*+/=?^_`{|}~-]{6,254}$)(?=[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const ContactWindow = ({ onClose }: { onClose: () => void }) => {
  const [page, setPage] = useState<Page>("login");
  const [email, setEmail] = useState("");

  return (
    <motion.div>
      {page === "login" ? (
        <LoginView
          email={email}
          setEmail={setEmail}
          onClose={onClose}
          setPage={setPage}
        />
      ) : (
        <MessageView email={email} onClose={onClose} />
      )}
    </motion.div>
  );
};

const MessageView = ({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageText = input.trim();
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), content: messageText, author: "them" },
    ]);
    setInput("");

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || "Anonymous",
          content: messageText,
        }),
      });

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            content: "An error occurred when sending this message.",
            author: "me",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content:
            "Message received!\nThis response is automated. I will try and respond to you by email within a few days.",
          author: "me",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: "A network error occurred when sending this message.",
          author: "me",
        },
      ]);
    }
  };
  return (
    <WindowWrapper
      onClose={onClose}
      className="bg-[#E0E0DF] backdrop-blur-2xl text-black select-none"
      sidebarContent={
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="p-3 pb-2 flex gap-2 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search"
                  disabled
                  className="w-full bg-black/5 border border-black/5 rounded-md px-2 py-1 text-[13px] outline-none placeholder:text-black/40 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              <SidebarUser
                name="Jason Wang"
                image="/xoutdragon.png"
                subtitle={
                  messages[messages.length - 1]?.content || "No messages"
                }
                active={true}
              />
            </div>
          </div>

          <div className="p-2 border-t border-black/10 bg-white/20 backdrop-blur-md shrink-0">
            <SidebarUser
              name="You"
              image="/blank_profile.jpg"
              subtitle={email}
              active={false}
              isStatic
            />
          </div>
        </div>
      }
      mainTitleContent={
        <div className="flex items-center gap-2 text-black/70 bg-[#F3F3F2] h-10 pl-4">
          <span className="text-xs ">To:</span>
          <span className="text-sm font-medium">Jason Wang</span>
        </div>
      }
      mainContent={
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2 bg-white selection:bg-[#007aff]/30 [scrollbar-width:none] [-ms-overflow-style:none]">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="p-4 bg-white flex items-end gap-2 shrink-0 border-t border-black/10"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="flex-1 bg-[#f4f4f4] border border-black/5 rounded-2xl px-3 py-1.5 flex items-end focus-within:ring-2 focus-within:ring-[#007aff]/50 transition-shadow">
              <textarea
                value={input}
                rows={1}
                placeholder="Message"
                className="flex-1 bg-transparent text-black text-[13px] outline-none placeholder:text-black/30 resize-none max-h-24 py-0.5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                    e.currentTarget.style.height = "auto";
                  }
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim()}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
                input.trim()
                  ? "bg-[#007aff] text-white hover:bg-[#0066d6]"
                  : "bg-neutral-200 text-neutral-400 cursor-default",
              )}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 2L6 10M6 2L3 5M6 2L9 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      }
    />
  );
};

const LoginView = ({
  email,
  setEmail,
  onClose,
  setPage,
}: {
  email: string;
  setEmail: (value: string) => void;
  onClose: () => void;
  setPage: (page: Page) => void;
}) => {
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email.toLowerCase())) {
      setError(true);
      return;
    }
    setError(false);
    setPage("message");
  };

  return (
    <WindowWrapper
      onClose={onClose}
      className="bg-white backdrop-blur-2xl text-black select-none"
      mainContent={
        <div className="h-full flex items-center justify-center backdrop-blur-md">
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center w-[320px] text-center gap-y-4"
          >
            <Image
              src="/imessage.png"
              alt="iMessage logo"
              width={64}
              height={64}
              priority
              className="select-none"
            />

            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Sign in with email
              </h1>
              <p className="text-black/50 text-[12px] mt-1 leading-normal px-2">
                This allows me to know who&apos;s contacting me. I promise I
                won&apos;t share your email.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-full gap-y-2"
            >
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                className={cn(
                  "rounded-lg text-[13px] bg-black/5 border-transparent focus-visible:ring-1 focus-visible:ring-[#007aff] h-8",
                  error && "border-red-500 focus-visible:ring-red-500",
                )}
              />

              {error && (
                <p className="text-red-500 text-[11px] font-medium">
                  Please enter a valid email address.
                </p>
              )}
            </form>

            <Tooltip>
              <TooltipTrigger className="text-black/40 hover:text-black/60 transition-colors">
                <span className="text-[11px]">Forgot email?</span>
              </TooltipTrigger>
              <TooltipContent
                className="bg-[#262626] text-white text-[11px] px-2 py-1 rounded border-0 shadow-md"
                side="bottom"
              >
                How did you forget your own email? 😂
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      }
    />
  );
};

const SidebarUser = ({
  name,
  image,
  subtitle,
  active,
  isStatic = false,
}: {
  name: string;
  image: string;
  subtitle?: string;
  active?: boolean;
  isStatic?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-3 px-3 h-16 rounded-lg transition-colors select-none mb-0.5",
        isStatic
          ? "bg-transparent text-black"
          : active
            ? "bg-[#007aff] text-white cursor-pointer"
            : "hover:bg-black/5 text-black cursor-pointer",
      )}
    >
      <Avatar className="h-10 w-10 border border-black/5 shrink-0">
        <AvatarImage src={image} />
      </Avatar>

      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-baseline">
          <h4 className="text-[13px] font-semibold truncate">{name}</h4>
          {!isStatic && (
            <span
              className={cn(
                "text-[11px]",
                active ? "text-white/70" : "text-black/40",
              )}
            >
              Now
            </span>
          )}
        </div>
        {subtitle && (
          <p
            className={cn(
              "text-[12px] truncate mt-0.5 max-w-37.5",
              active ? "text-white/90" : "text-black/50",
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isThem = message.author === "them";
  return (
    <div
      className={cn(
        "flex w-full mb-0.5",
        isThem ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "whitespace-pre-wrap text-[14px] leading-snug rounded-2xl px-3.5 py-1.5 max-w-[70%] tracking-normal font-normal shadow-sm",
          isThem
            ? "bg-[#007aff] text-white rounded-br-sm selection:bg-white/30"
            : "bg-[#e9e9eb] text-black rounded-bl-sm selection:bg-black/10",
        )}
      >
        {message.content}
      </div>
    </div>
  );
};
