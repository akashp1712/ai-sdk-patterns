// Ambient module stubs for packages that aren't installed in this workspace
// but are legitimate runtime deps for specific patterns (declared in compose.ts
// optionalDeps). The validator only needs their shape to be permissive so that
// pattern source using these imports type-checks.

declare module "@mastra/core" {
  export class Mastra {
    constructor(config?: any);
    getAgentById(id: string): any;
    getWorkflow(key: string): any;
  }
}
declare module "@mastra/core/agent" {
  export class Agent {
    constructor(config: any);
    id: string;
    generate(prompt: any, options?: any): Promise<any>;
    stream(prompt: any, options?: any): Promise<any>;
  }
}
declare module "@mastra/core/tools" {
  export function createTool(config: any): any;
}
declare module "@mastra/core/workflows" {
  export function createStep(config: any): any;
  export function createWorkflow(config: any): any;
  export function cloneWorkflow(wf: any, opts: any): any;
}
declare module "@modelcontextprotocol/sdk" {
  const anyExport: any;
  export = anyExport;
}
declare module "@modelcontextprotocol/sdk/*" {
  const anyExport: any;
  export = anyExport;
}
declare module "better-sqlite3" {
  const Database: any;
  export = Database;
}
