// Pattern-specific use cases for all AI SDK patterns

export interface UseCase {
  title: string;
  description: string;
}

export const patternUseCases: Record<string, UseCase[]> = {
  "streaming-chat": [
    {
      title: "Customer Support Chatbots",
      description: "Build real-time customer service bots that handle inquiries, provide instant responses, and escalate to human agents when needed."
    },
    {
      title: "Educational Tutoring Platforms", 
      description: "Create interactive learning assistants that provide step-by-step explanations, answer questions, and adapt to student pace."
    },
    {
      title: "Collaborative Writing Tools",
      description: "Develop co-writing platforms where AI assists with content creation, suggestions, and real-time text generation."
    },
    {
      title: "Internal Knowledge Base Assistants",
      description: "Build company chat interfaces that help employees find information, access documents, and get instant answers."
    }
  ],
  "structured-output": [
    {
      title: "API Response Generation",
      description: "Generate consistent, validated JSON responses for APIs with predefined schemas ensuring data reliability."
    },
    {
      title: "Form Data Extraction",
      description: "Extract structured information from unstructured text like emails, invoices, or documents into organized data."
    },
    {
      title: "Configuration File Generation",
      description: "Create structured configuration files, deployment manifests, or settings files from natural language descriptions."
    },
    {
      title: "Data Validation Pipelines",
      description: "Build systems that validate and transform data into specific formats for database storage or API consumption."
    }
  ],
  "tool-calling": [
    {
      title: "Weather Information Systems",
      description: "Build weather applications that call real weather APIs, parse data, and present forecasts in natural language."
    },
    {
      title: "Financial Calculators",
      description: "Create smart financial tools that perform complex calculations, market analysis, and investment recommendations."
    },
    {
      title: "Database Query Assistants",
      description: "Develop natural language interfaces for database operations, data analysis, and report generation."
    },
    {
      title: "E-commerce Integration",
      description: "Build shopping assistants that check inventory, process orders, calculate shipping, and handle customer inquiries."
    }
  ],
  "generative-ui": [
    {
      title: "Dynamic Dashboard Builders",
      description: "Create dashboards that generate charts, widgets, and visualizations based on user queries and data analysis."
    },
    {
      title: "Report Generation Systems",
      description: "Build tools that automatically create business reports with charts, tables, and visual elements from raw data."
    },
    {
      title: "Data Visualization Platforms",
      description: "Develop applications that transform data descriptions into interactive visual components and infographics."
    },
    {
      title: "Analytics Interfaces",
      description: "Create analytics tools that adapt their UI components based on data types and user analysis needs."
    }
  ],
  "multi-step-agent": [
    {
      title: "Travel Planning Assistants",
      description: "Build agents that research destinations, compare prices, book flights, and create itineraries through multiple coordinated steps."
    },
    {
      title: "Research Assistant Systems",
      description: "Create agents that gather information from multiple sources, synthesize findings, and generate comprehensive reports."
    },
    {
      title: "Project Management Tools",
      description: "Develop agents that break down projects, assign tasks, track progress, and generate status updates automatically."
    },
    {
      title: "Complex Problem Solvers",
      description: "Build agents that tackle multi-step problems like legal research, medical diagnosis, or engineering analysis."
    }
  ],
  "web-search": [
    {
      title: "Research Assistant Platforms",
      description: "Build grounded research tools that search web, cite sources, and provide accurate, up-to-date information."
    },
    {
      title: "News Aggregation Systems",
      description: "Create applications that gather news from multiple sources, summarize events, and provide contextual analysis."
    },
    {
      title: "Academic Research Tools",
      description: "Develop platforms for literature review, citation gathering, and academic paper analysis with source attribution."
    },
    {
      title: "Market Intelligence Systems",
      description: "Build tools that monitor industry trends, competitor activities, and market changes with verified sources."
    }
  ],
  "human-in-the-loop": [
    {
      title: "Financial Transaction Approval",
      description: "Create systems that require human verification for high-value transactions, fund transfers, and sensitive financial operations."
    },
    {
      title: "Medical Diagnosis Support",
      description: "Build medical AI assistants that suggest diagnoses but require doctor confirmation before final recommendations."
    },
    {
      title: "Legal Document Review",
      description: "Develop tools that analyze legal documents and flag issues but require lawyer approval for final decisions."
    },
    {
      title: "Content Moderation Systems",
      description: "Create moderation AI that flags inappropriate content but requires human review before taking action."
    }
  ],
  "rag-pipeline": [
    {
      title: "Document Q&A Systems",
      description: "Build question-answering systems that search through company documents, legal papers, or technical manuals for accurate responses."
    },
    {
      title: "Knowledge Base Assistants",
      description: "Create support systems that retrieve relevant information from documentation, FAQs, and help articles to answer user queries."
    },
    {
      title: "Research Paper Analysis",
      description: "Develop tools that search academic papers, extract relevant passages, and provide context-aware answers to research questions."
    },
    {
      title: "Technical Documentation Helpers",
      description: "Build assistants that search API documentation, code repositories, and technical guides to provide accurate coding help."
    }
  ],
  "reasoning-display": [
    {
      title: "Educational Tutoring Systems",
      description: "Create teaching AI that shows step-by-step problem-solving, helping students understand reasoning process."
    },
    {
      title: "Medical Diagnosis Assistants",
      description: "Build tools that display diagnostic reasoning, symptom analysis, and treatment decision processes for medical professionals."
    },
    {
      title: "Legal Analysis Platforms",
      description: "Develop systems that show legal reasoning, case analysis, and conclusion processes for lawyers and paralegals."
    },
    {
      title: "Financial Advisory Tools",
      description: "Create investment advisors that display market analysis reasoning, risk assessment, and recommendation logic."
    }
  ],
  "image-generation": [
    {
      title: "Social Media Content Creation",
      description: "Generate custom images, graphics, and visual content for social media posts, stories, and campaigns."
    },
    {
      title: "Product Mockup Generation",
      description: "Create product visualizations, packaging designs, and marketing materials from text descriptions."
    },
    {
      title: "Art and Design Tools",
      description: "Build platforms for generating unique digital art, illustrations, and design assets for creative projects."
    },
    {
      title: "Marketing Visual Creation",
      description: "Develop tools that generate banners, ads, infographics, and promotional materials for marketing campaigns."
    }
  ],
  "code-artifact": [
    {
      title: "API Endpoint Generation",
      description: "Generate complete API endpoints, controllers, and server-side code from API specifications or natural language descriptions."
    },
    {
      title: "Database Schema Creation",
      description: "Build tools that generate database schemas, migration scripts, and model definitions from data requirements."
    },
    {
      title: "Component Library Development",
      description: "Create React components, UI elements, and design system code from design specifications or descriptions."
    },
    {
      title: "Testing Code Generation",
      description: "Generate unit tests, integration tests, and test suites from existing code or functionality descriptions."
    }
  ],
  "chat-with-citations": [
    {
      title: "Academic Research Assistant",
      description: "Build research tools that provide answers with proper citations to academic papers, journals, and scholarly sources."
    },
    {
      title: "Legal Research Platforms",
      description: "Create systems that answer legal questions with citations to case law, statutes, and legal precedents."
    },
    {
      title: "Medical Information Systems",
      description: "Develop healthcare assistants that provide medical information with citations to research studies and clinical guidelines."
    },
    {
      title: "Fact-checking Tools",
      description: "Build platforms that verify claims and provide evidence-backed answers with source attribution and credibility scores."
    }
  ],
  "mcp-client": [
    {
      title: "Extensible AI Assistants",
      description: "Build AI assistants that connect to any MCP-compatible tool server, gaining new capabilities without code changes."
    },
    {
      title: "Enterprise Tool Integration",
      description: "Connect AI agents to internal APIs, databases, and services exposed as MCP servers for secure, governed tool access."
    },
    {
      title: "Developer Tooling Agents",
      description: "Create coding assistants that use MCP to access file systems, Git repos, package registries, and CI/CD pipelines."
    },
    {
      title: "Dynamic Plugin Systems",
      description: "Build AI platforms where users can add new tool servers on the fly, extending the AI's capabilities without redeployment."
    }
  ],
  "text-to-sql": [
    {
      title: "Business Intelligence Dashboards",
      description: "Let non-technical users query databases in plain English, generating reports and insights without writing SQL."
    },
    {
      title: "Customer Data Exploration",
      description: "Build self-service analytics tools where product and marketing teams can explore user data conversationally."
    },
    {
      title: "Log and Metrics Analysis",
      description: "Query application logs, performance metrics, and operational data using natural language for faster incident response."
    },
    {
      title: "Inventory and Sales Reporting",
      description: "Enable warehouse and sales teams to check stock levels, sales trends, and order status by simply asking questions."
    }
  ],
  "multimodal-chat": [
    {
      title: "Visual QA and Image Analysis",
      description: "Build apps where users upload photos for identification, analysis, or description — from plant ID to architecture review."
    },
    {
      title: "Document Processing Assistants",
      description: "Create tools that read PDFs, invoices, receipts, and contracts, extracting key information through conversation."
    },
    {
      title: "Creative Design Feedback",
      description: "Build review tools where designers upload mockups and get AI feedback on layout, accessibility, and design principles."
    },
    {
      title: "Medical and Scientific Image Review",
      description: "Develop assistants that analyze medical images, lab results, or scientific diagrams with expert-level context."
    }
  ],
};

export function getPatternUseCases(patternId: string): UseCase[] {
  return patternUseCases[patternId] || [
    {
      title: "Custom Applications",
      description: "Adapt this pattern for your specific use case and requirements."
    },
    {
      title: "Learning & Prototyping", 
      description: "Use this pattern to learn AI SDK concepts and prototype new ideas."
    },
    {
      title: "Integration Projects",
      description: "Integrate AI capabilities into existing applications and workflows."
    },
    {
      title: "MVP Development",
      description: "Quickly build minimum viable products with AI-powered features."
    }
  ];
}
