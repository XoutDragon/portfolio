"use client";

import { useState } from "react";
import { WindowWrapper } from "./window-wrapper";

const NOTE_CONTENT = `Hey, I'm Jason Wang.

I'm a currently a junior in university majoring in Computer Information Science.

I like problem solving and developing projects with code. 

Besides developing, I love playing video games, reading manga, watching anime and playing sports (soccer, tennis, volleyball, badminton).
`;

export const AboutWindow = ({ onClose }: { onClose: () => void }) => {
  const [noteText, setNoteText] = useState(NOTE_CONTENT);

  return (
    <WindowWrapper
      onClose={onClose}
      className="w-162.5 h-105 bg-white"
      sidebarContent={<NotesSidebarList firstLine={noteText.split("\n")[0]} />}
      mainTitleContent={<NotesToolbar />}
      mainContent={<NotesTextEditor value={noteText} onChange={setNoteText} />}
    />
  );
};

const NotesToolbar = () => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full flex items-center gap-x-4 pr-8 h-10 ml-4">
      <div className="flex items-center gap-x-3">
        <button className="text-[13px] text-[#ffbd2e] hover:opacity-80 transition-opacity font-medium">
          Aa
        </button>
        <div className="w-px h-3.5 " />
        <button className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors font-bold">
          B
        </button>
        <button className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors italic">
          I
        </button>
        <button className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors underline">
          U
        </button>
        <div className="w-px h-3.5 " />
        <button className="text-[13px] text-zinc-400 hover:text-zinc-200 transition-colors">
          ☰
        </button>
      </div>
      <div className="ml-auto text-[11px] text-zinc-500 font-medium select-none">
        {formattedDate}
      </div>
    </div>
  );
};

const NotesSidebarList = ({ firstLine }: { firstLine: string }) => {
  return (
    <div className="flex-1 overflow-y-auto p-2 border-t">
      <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500/60 px-2.5 mb-1.5 select-none">
        Notes
      </div>

      <div className="bg-[#ffbd2e]/15 ring-1 ring-inset ring-[#ffbd2e]/20 rounded-lg px-3 py-2.5 cursor-pointer shadow-sm">
        <h4 className="text-[13px] text-zinc-700 font-semibold truncate">
          About.txt
        </h4>
        <p className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-37.5">
          {firstLine || "New Note"}
        </p>
      </div>
    </div>
  );
};

const NotesTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="flex-1 w-full relative border-t flex h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full text-zinc-900 text-[14px] leading-relaxed p-6 resize-none outline-none relative z-10 placeholder:text-zinc-600"
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          caretColor: "#ffbd2e",
        }}
        spellCheck={false}
        placeholder="Start writing..."
      />
    </div>
  );
};
