"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Tree, File, Folder } from "@/components/ui/file-tree";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import type { PatternFile } from "@/lib/patterns";

interface CodeViewerProps {
  files: PatternFile[];
}

interface FolderNode {
  name: string;
  children: (FolderNode | FileNode)[];
}

interface FileNode {
  name: string;
  path: string;
}

function buildTree(files: PatternFile[]): (FolderNode | FileNode)[] {
  const root: (FolderNode | FileNode)[] = [];

  for (const file of files) {
    const parts = file.path.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        current.push({ name: part, path: file.path });
      } else {
        let folder = current.find(
          (n): n is FolderNode => "children" in n && n.name === part
        );
        if (!folder) {
          folder = { name: part, children: [] };
          current.push(folder);
        }
        current = folder.children;
      }
    }
  }

  return root;
}

function TreeNodes({
  nodes,
  onSelect,
}: {
  nodes: (FolderNode | FileNode)[];
  onSelect: (path: string) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        if ("children" in node) {
          return (
            <Folder key={node.name} value={node.name} element={node.name}>
              <TreeNodes nodes={node.children} onSelect={onSelect} />
            </Folder>
          );
        }
        return (
          <File
            key={node.path}
            value={node.path}
            onClick={() => onSelect(node.path)}
          >
            <span>{node.name}</span>
          </File>
        );
      })}
    </>
  );
}

export function CodeViewer({ files }: CodeViewerProps) {
  const [activeFile, setActiveFile] = useState(files[0]?.path ?? "");
  const [mobileFileOpen, setMobileFileOpen] = useState(false);
  const currentFile = files.find((f) => f.path === activeFile) ?? files[0];
  const tree = useMemo(() => buildTree(files), [files]);

  const initialExpanded = useMemo(() => {
    const folders = new Set<string>();
    for (const file of files) {
      const parts = file.path.split("/");
      for (let i = 0; i < parts.length - 1; i++) {
        folders.add(parts[i]);
      }
    }
    return Array.from(folders);
  }, [files]);

  return (
    <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
      {/* Mobile file selector */}
      <div className="md:hidden border-b border-border/60">
        <button
          onClick={() => setMobileFileOpen(!mobileFileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-mono text-muted-foreground"
        >
          <span className="truncate">{currentFile?.path}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 ml-2 transition-transform ${mobileFileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileFileOpen && (
          <div className="border-t border-border/60 max-h-60 overflow-y-auto bg-card">
            {files.map((file) => (
              <button
                key={file.path}
                onClick={() => {
                  setActiveFile(file.path);
                  setMobileFileOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-mono transition-colors ${
                  file.path === activeFile
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                {file.path}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex">
        {/* Desktop file tree sidebar */}
        <div className="hidden md:block w-60 shrink-0 border-r border-border/60 bg-card pt-3">
          <Tree
            initialSelectedId={activeFile}
            initialExpandedItems={initialExpanded}
            className="text-sm"
            indicator={false}
          >
            <TreeNodes nodes={tree} onSelect={setActiveFile} />
          </Tree>
        </div>

        {/* Code panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop file path header */}
          <div className="hidden md:flex items-center justify-between px-5 py-3 border-b border-border/60 bg-card">
            <span className="text-sm font-mono text-muted-foreground">
              {currentFile?.path}
            </span>
            {currentFile && (
              <CopyButton
                text={currentFile.content}
                className="text-muted-foreground"
              />
            )}
          </div>

          {/* Mobile copy button bar */}
          <div className="flex md:hidden items-center justify-end px-4 py-2 border-b border-border/60 bg-card">
            {currentFile && (
              <CopyButton
                text={currentFile.content}
                className="text-muted-foreground"
              />
            )}
          </div>

          <div className="flex-1 overflow-auto p-3 sm:p-5 bg-[#fafafa] dark:bg-[#0a0a0a] max-h-[400px] sm:max-h-[520px]">
            {currentFile && (
              <CodeBlock
                code={currentFile.content}
                lang={currentFile.lang === "tsx" ? "tsx" : "typescript"}
                hideCopyButton
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
