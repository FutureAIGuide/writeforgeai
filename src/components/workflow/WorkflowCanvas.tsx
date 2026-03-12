"use client";
import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  BackgroundVariant,
  Panel,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WorkflowNode } from "./WorkflowNode";
import { WorkflowSidebar } from "./WorkflowSidebar";
import { Button } from "@/components/ui/button";
import { Save, Trash2, Play } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: NodeTypes = { workflowNode: WorkflowNode as any };

const initialNodes: Node[] = [
  { id: "1", type: "workflowNode", position: { x: 250, y: 50 }, data: { label: "Story Idea", nodeType: "idea", description: "Core concept" } },
  { id: "2", type: "workflowNode", position: { x: 100, y: 180 }, data: { label: "Research", nodeType: "research", description: "Gather sources" } },
  { id: "3", type: "workflowNode", position: { x: 400, y: 180 }, data: { label: "Characters", nodeType: "character", description: "Build cast" } },
  { id: "4", type: "workflowNode", position: { x: 250, y: 310 }, data: { label: "Outline", nodeType: "outline", description: "Structure chapters" } },
  { id: "5", type: "workflowNode", position: { x: 250, y: 440 }, data: { label: "First Draft", nodeType: "draft", description: "Write the story" } },
  { id: "6", type: "workflowNode", position: { x: 100, y: 570 }, data: { label: "AI Critic", nodeType: "critic", description: "Critique passes" } },
  { id: "7", type: "workflowNode", position: { x: 400, y: 570 }, data: { label: "Beta Reader", nodeType: "beta-reader", description: "Persona feedback" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", style: { stroke: "#FF6A00", strokeWidth: 1.5 } },
  { id: "e1-3", source: "1", target: "3", style: { stroke: "#FF6A00", strokeWidth: 1.5 } },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "#242424", strokeWidth: 1.5 } },
  { id: "e3-4", source: "3", target: "4", style: { stroke: "#242424", strokeWidth: 1.5 } },
  { id: "e4-5", source: "4", target: "5", style: { stroke: "#FF6A00", strokeWidth: 1.5 } },
  { id: "e5-6", source: "5", target: "6", style: { stroke: "#242424", strokeWidth: 1.5 } },
  { id: "e5-7", source: "5", target: "7", style: { stroke: "#242424", strokeWidth: 1.5 } },
];

let idCounter = 10;

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, style: { stroke: "#FF6A00", strokeWidth: 1.5 } }, eds)
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left - 70,
        y: event.clientY - bounds.top - 30,
      };

      const newNode: Node = {
        id: `node-${++idCounter}`,
        type: "workflowNode",
        position,
        data: { label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1), nodeType, description: "" },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <div className="flex h-full">
      <WorkflowSidebar />
      <div ref={reactFlowWrapper} className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: "#0B0B0B" }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#242424" />
          <Controls
            style={{ backgroundColor: "#121212", border: "1px solid #242424" }}
          />
          <MiniMap
            style={{ backgroundColor: "#121212", border: "1px solid #242424" }}
            nodeColor="#FF6A00"
            maskColor="rgba(0,0,0,0.5)"
          />
          <Panel position="top-right" className="flex gap-2">
            <Button size="sm" variant="outline">
              <Save className="h-3.5 w-3.5 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="ghost" className="text-wf-danger">
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
            <Button size="sm">
              <Play className="h-3.5 w-3.5 mr-1" />
              Run
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
