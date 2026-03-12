"use client";
import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/shared/GlowCard";
import { Users, MapPin, BookOpen, Zap, Plus } from "lucide-react";

interface CodexNode {
  id: string;
  label: string;
  type: "character" | "location" | "lore" | "plot";
  description?: string;
  connections?: string[];
}

interface StoryCodexProps {
  nodes?: CodexNode[];
  onNodeSelect?: (node: CodexNode) => void;
}

const nodeTypeConfig = {
  character: { bg: "#FF6A00", text: "white", icon: Users, size: 60 },
  location: { bg: "#1E3A5F", text: "#60A5FA", icon: MapPin, size: 48 },
  lore: { bg: "#2D1B4E", text: "#A78BFA", icon: BookOpen, size: 44 },
  plot: { bg: "#1A3A2A", text: "#34D399", icon: Zap, size: 44 },
};

const DEFAULT_NODES: CodexNode[] = [
  { id: "kaelen", label: "Kaelen", type: "character", description: "The protagonist. A half-fae cartographer with a fractured memory." },
  { id: "lyra", label: "Lyra", type: "character", description: "Kaelen's ally. A hedge-witch who speaks to dead stars." },
  { id: "aethel", label: "Aethel", type: "character", description: "The Hollow King. Ruler of the Wraith Courts." },
  { id: "sector7", label: "Sector 7", type: "location", description: "The forbidden district beneath the city." },
  { id: "sector5", label: "Sector 5", type: "location", description: "The merchant quarter where stories begin." },
  { id: "wirthels", label: "The Wirthels", type: "location", description: "Ancient forest outside the city walls." },
  { id: "theplot", label: "The Plot", type: "plot", description: "The central conspiracy driving the narrative." },
  { id: "kaellen", label: "Kaellen", type: "character", description: "Kaelen's twin — believed dead." },
  { id: "onevict", label: "One Victim", type: "plot", description: "The murder that starts everything." },
  { id: "followmany", label: "Follow Many Amidst", type: "lore", description: "Ancient prophecy fragment." },
  { id: "aenels", label: "Aenels", type: "lore", description: "The old language of the fae courts." },
  { id: "amro", label: "Amro", type: "character", description: "Information broker. Morally ambiguous." },
  { id: "renouren", label: "Renouren", type: "location", description: "The ghost city at the edge of the map." },
];

const DEFAULT_EDGES = [
  { from: "kaelen", to: "lyra", label: "ally" },
  { from: "kaelen", to: "aethel", label: "antagonist" },
  { from: "kaelen", to: "sector7", label: "investigates" },
  { from: "kaelen", to: "kaellen", label: "twin" },
  { from: "kaelen", to: "theplot", label: "entangled in" },
  { from: "lyra", to: "aethel", label: "fears" },
  { from: "lyra", to: "wirthels", label: "origin" },
  { from: "aethel", to: "onevict", label: "responsible for" },
  { from: "kaelen", to: "amro", label: "contacts" },
  { from: "amro", to: "sector5", label: "operates in" },
  { from: "kaelen", to: "aenels", label: "studies" },
  { from: "lyra", to: "followmany", label: "knows" },
  { from: "theplot", to: "onevict", label: "begins with" },
  { from: "renouren", to: "aethel", label: "origin" },
];

function buildFlowNodes(codexNodes: CodexNode[]): Node[] {
  const positions: Record<string, { x: number; y: number }> = {
    kaelen: { x: 350, y: 300 },
    lyra: { x: 550, y: 150 },
    aethel: { x: 700, y: 280 },
    sector7: { x: 200, y: 180 },
    sector5: { x: 80, y: 420 },
    wirthels: { x: 250, y: 80 },
    theplot: { x: 600, y: 420 },
    kaellen: { x: 500, y: 360 },
    onevict: { x: 750, y: 450 },
    followmany: { x: 370, y: 520 },
    aenels: { x: 150, y: 520 },
    amro: { x: 120, y: 300 },
    renouren: { x: 680, y: 100 },
  };

  return codexNodes.map((n) => {
    const config = nodeTypeConfig[n.type];
    const pos = positions[n.id] ?? { x: Math.random() * 600 + 100, y: Math.random() * 400 + 100 };
    return {
      id: n.id,
      position: pos,
      data: { label: n.label, type: n.type, description: n.description },
      style: {
        background: config.bg,
        color: config.text,
        border: "1px solid rgba(255,106,0,0.3)",
        borderRadius: "8px",
        padding: "8px 14px",
        fontSize: "12px",
        fontWeight: 600,
        boxShadow: n.type === "character" ? "0 0 16px rgba(255,106,0,0.4)" : "0 0 8px rgba(0,0,0,0.4)",
        minWidth: 80,
        textAlign: "center",
      },
    };
  });
}

function buildFlowEdges(edgeDefs: typeof DEFAULT_EDGES): Edge[] {
  return edgeDefs.map((e, i) => ({
    id: `e${i}`,
    source: e.from,
    target: e.to,
    label: e.label,
    style: { stroke: "rgba(255,106,0,0.4)", strokeWidth: 1.5 },
    labelStyle: { fontSize: 9, fill: "#9CA3AF" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(255,106,0,0.5)" },
    animated: false,
  }));
}

export function StoryCodex({ nodes: propNodes, onNodeSelect }: StoryCodexProps) {
  const codexNodes = propNodes ?? DEFAULT_NODES;
  const [selectedNode, setSelectedNode] = useState<CodexNode | null>(null);

  const initialNodes = useMemo(() => buildFlowNodes(codexNodes), [codexNodes]);
  const initialEdges = useMemo(() => buildFlowEdges(DEFAULT_EDGES), []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const found = codexNodes.find((n) => n.id === node.id);
    if (found) { setSelectedNode(found); onNodeSelect?.(found); }
  }, [codexNodes, onNodeSelect]);

  const typeLabels = { character: "Characters", location: "Locations", lore: "Lore", plot: "Plot Points" };

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        style={{ background: "#0B0B0B" }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255,106,0,0.05)" gap={30} size={1} />
        <Controls style={{ background: "#121212", border: "1px solid #242424", borderRadius: 8 }} />
        <MiniMap
          style={{ background: "#121212", border: "1px solid #242424" }}
          nodeColor={(n) => nodeTypeConfig[(n.data as { type: string }).type as keyof typeof nodeTypeConfig]?.bg ?? "#242424"}
          maskColor="rgba(11,11,11,0.8)"
        />
        <Panel position="top-left">
          <div className="flex gap-2">
            {Object.entries(typeLabels).map(([type, label]) => (
              <Badge key={type} className="text-[10px] border border-wf-border bg-wf-panel text-wf-text-muted">
                <span className="mr-1" style={{ color: nodeTypeConfig[type as keyof typeof nodeTypeConfig]?.bg }}>●</span>
                {label}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel position="top-right">
          <Button size="sm" className="bg-wf-accent hover:bg-wf-accent-soft text-white text-xs h-7">
            <Plus className="h-3 w-3 mr-1" /> Add Node
          </Button>
        </Panel>
      </ReactFlow>

      {selectedNode && (
        <div className="absolute bottom-4 right-4 w-64 rounded-xl border border-wf-border bg-wf-panel-elevated p-4 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-wf-text">{selectedNode.label}</span>
            <Badge className="text-[10px] capitalize" style={{ background: nodeTypeConfig[selectedNode.type].bg + "22", color: nodeTypeConfig[selectedNode.type].bg }}>{selectedNode.type}</Badge>
          </div>
          {selectedNode.description && <p className="text-[11px] text-wf-text-muted leading-relaxed">{selectedNode.description}</p>}
          <Button variant="ghost" size="sm" className="mt-2 w-full text-[10px] text-wf-text-muted hover:text-wf-accent h-6" onClick={() => setSelectedNode(null)}>
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
}
