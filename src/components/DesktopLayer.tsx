import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Folder, Image, Radio as RadioIcon, Clapperboard, Mail, MessageCircle, Star, Zap, UserRound } from "lucide-react";
import { profile } from "../data/profile";

const MotionLink = motion.create(Link);

interface DesktopIcon {
  label: string;
  Icon: typeof FileText;
  to: string;
  top: string;
  side: "left" | "right";
  offset: string;
}

const ICONS: DesktopIcon[] = [
  { label: "Sobre.txt", Icon: FileText, to: "/#sobre", top: "10%", side: "right", offset: "6%" },
  { label: "Projetos", Icon: Folder, to: "/#projetos", top: "19%", side: "right", offset: "6%" },
  { label: "Mural.jpg", Icon: Image, to: "/mural", top: "28%", side: "right", offset: "6%" },
  { label: "Radio.mp3", Icon: RadioIcon, to: "/radio", top: "68%", side: "right", offset: "6%" },
  { label: "Videoteca", Icon: Clapperboard, to: "/videoteca", top: "77%", side: "right", offset: "6%" },
  { label: "Contato.eml", Icon: Mail, to: "/#contato", top: "86%", side: "right", offset: "6%" },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function DesktopLayer() {
  const now = useClock();
  const [selected, setSelected] = useState<string | null>(null);
  const boundsRef = useRef<HTMLDivElement>(null);
  const signature = profile.nickname || profile.fullName.split(" ")[0] || "Portfólio";
  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="desktop-layer" ref={boundsRef}>
      <div className="desktop-icons">
        {ICONS.map((icon) => (
          <MotionLink
            key={icon.label}
            to={icon.to}
            className={`desktop-icon${selected === icon.label ? " is-selected" : ""}`}
            style={{ top: icon.top, [icon.side]: icon.offset } as React.CSSProperties}
            onMouseDown={() => setSelected(icon.label)}
            onMouseLeave={() => setSelected(null)}
            drag
            dragConstraints={boundsRef}
            dragElastic={0.12}
            dragMomentum={false}
            whileTap={{ scale: 0.92 }}
            whileDrag={{ scale: 1.08, zIndex: 20, boxShadow: "0 10px 24px rgba(30,27,75,0.3)" }}
          >
            <span className="desktop-icon-glyph" aria-hidden="true"><icon.Icon size={20} strokeWidth={2} /></span>
            <span className="desktop-icon-label">{icon.label}</span>
          </MotionLink>
        ))}
      </div>

      <div className="desktop-stickers" aria-hidden="true">
        <motion.div
          className="sticker sticker-buddy"
          style={{ top: "11%", left: "57%" }}
          drag dragConstraints={boundsRef} dragElastic={0.15} dragMomentum={false}
          whileTap={{ scale: 0.92 }} whileDrag={{ scale: 1.1, zIndex: 20 }}
        >
          <span className="sticker-buddy-glyph"><UserRound size={20} strokeWidth={2} /></span>
          <span className="sticker-buddy-dot" />
        </motion.div>
        <motion.div
          className="sticker sticker-bubble"
          style={{ top: "9%", left: "70%" }}
          drag dragConstraints={boundsRef} dragElastic={0.15} dragMomentum={false}
          whileTap={{ scale: 0.92 }} whileDrag={{ scale: 1.1, zIndex: 20 }}
        >
          <MessageCircle size={16} strokeWidth={2} />
        </motion.div>
        <motion.div
          className="sticker sticker-burst sticker-burst-pink"
          style={{ top: "58%", left: "6%" }}
          drag dragConstraints={boundsRef} dragElastic={0.15} dragMomentum={false}
          whileTap={{ scale: 0.92 }} whileDrag={{ scale: 1.1, zIndex: 20 }}
        >
          <Zap size={22} strokeWidth={2} />
        </motion.div>
        <motion.div
          className="sticker sticker-burst sticker-burst-yellow"
          style={{ top: "12%", left: "40%" }}
          drag dragConstraints={boundsRef} dragElastic={0.15} dragMomentum={false}
          whileTap={{ scale: 0.92 }} whileDrag={{ scale: 1.1, zIndex: 20 }}
        >
          <Star size={18} strokeWidth={2} />
        </motion.div>
      </div>

      <div className="desktop-taskbar">
        <a href="#topo" className="desktop-start mono">
          <span className="desktop-start-mark" aria-hidden="true">◆</span>
          {signature}
        </a>
        <span className="mono desktop-clock">
          {date} — {time}
        </span>
      </div>
    </div>
  );
}
