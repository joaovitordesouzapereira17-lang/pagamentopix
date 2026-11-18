import { useState } from "react";
import type { Tier, VideotecaItem } from "../data/videoteca";
import { withBase } from "../utils/paths";

type RowKey = Tier | "unranked";

const ROWS: { key: RowKey; label: string; mood: string }[] = [
  { key: "S", label: "S", mood: "Perfeito" },
  { key: "A", label: "A", mood: "Ótimo" },
  { key: "B", label: "B", mood: "Bom" },
  { key: "C", label: "C", mood: "Ok" },
  { key: "D", label: "D", mood: "Fraco" },
  { key: "unranked", label: "—", mood: "Não avaliados" },
];

function buildInitial(items: VideotecaItem[]): Record<RowKey, VideotecaItem[]> {
  const rows: Record<RowKey, VideotecaItem[]> = { S: [], A: [], B: [], C: [], D: [], unranked: [] };
  items.forEach((item) => rows[item.tier ?? "unranked"].push(item));
  return rows;
}

interface DragPayload {
  title: string;
  from: RowKey;
}

export function TierList({ items }: { items: VideotecaItem[] }) {
  const [rows, setRows] = useState<Record<RowKey, VideotecaItem[]>>(() => buildInitial(items));
  const [picked, setPicked] = useState<DragPayload | null>(null);

  if (items.length === 0) return null;

  function moveItem(title: string, from: RowKey, to: RowKey) {
    if (from === to) return;
    setRows((prev) => {
      const item = prev[from].find((f) => f.title === title);
      if (!item) return prev;
      return { ...prev, [from]: prev[from].filter((f) => f.title !== title), [to]: [...prev[to], item] };
    });
  }

  function handlePosterClick(e: React.MouseEvent, title: string, from: RowKey) {
    e.stopPropagation();
    setPicked((p) => (p && p.title === title ? null : { title, from }));
  }

  function handleRowClick(to: RowKey) {
    if (!picked) return;
    moveItem(picked.title, picked.from, to);
    setPicked(null);
  }

  function handleDragStart(e: React.DragEvent, title: string, from: RowKey) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ title, from }));
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(e: React.DragEvent, to: RowKey) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const payload = JSON.parse(raw) as DragPayload;
      moveItem(payload.title, payload.from, to);
    } catch {
      /* payload inválido — ignora o drop */
    }
  }

  return (
    <div className="tier-list" aria-label="Tier list dos filmes favoritos, arraste ou clique pra reorganizar">
      {ROWS.map((row) => (
        <div
          key={row.key}
          className={`tier-row tier-row-${row.key}${picked ? " is-droppable" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, row.key)}
          onClick={() => handleRowClick(row.key)}
        >
          <div className="tier-row-label">
            <span className="tier-row-letter mono">{row.label}</span>
            <span className="tier-row-mood mono">{row.mood}</span>
          </div>
          <div className="tier-row-items">
            {rows[row.key].map((item) => (
              <img
                key={item.title}
                src={withBase(item.image)}
                alt={item.title}
                title={item.title}
                draggable
                className={`tier-poster${picked?.title === item.title ? " is-picked" : ""}`}
                onDragStart={(e) => handleDragStart(e, item.title, row.key)}
                onClick={(e) => handlePosterClick(e, item.title, row.key)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
