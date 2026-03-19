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
  "json-renderer": [
    {
      title: "Dashboard Data Visualization",
      description: "Create systems that transform JSON data into interactive charts, graphs, and dashboard components automatically."
    },
    {
      title: "API Response Display",
      description: "Build tools that render API responses as user-friendly interfaces, tables, and data visualization components."
    },
    {
      title: "Report Generation Systems",
      description: "Develop applications that convert structured data into formatted reports with charts, tables, and visual elements."
    },
    {
      title: "Analytics Data Presentation",
      description: "Create platforms that transform analytics data into interactive visual components and business intelligence displays."
    }
  ],
  "markdown-chat": [
    {
      title: "Technical Documentation Chat",
      description: "Build support chatbots that can display code examples, API documentation, and technical formatting in rich markdown."
    },
    {
      title: "Educational Content Platforms",
      description: "Create learning environments where AI can display formatted lessons, exercises, and educational content with proper formatting."
    },
    {
      title: "Development Assistant Chat",
      description: "Develop coding assistants that can display syntax-highlighted code, error messages, and development guidance."
    },
    {
      title: "Content Creation Tools",
      description: "Build writing assistants that format blog posts, documentation, and articles with proper markdown rendering."
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
  "text-generation": [
    {
      title: "Content Marketing Automation",
      description: "Generate blog posts, social media content, and marketing copy automatically from topic descriptions."
    },
    {
      title: "Product Description Creation",
      description: "Build tools that generate compelling product descriptions, feature lists, and marketing materials."
    },
    {
      title: "Email Template Generation",
      description: "Create personalized email templates, newsletters, and marketing communications at scale."
    },
    {
      title: "Documentation Writing Assistants",
      description: "Develop tools that generate technical documentation, API docs, and user guides from specifications."
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
  "streaming-object": [
    {
      title: "Real-time Data Processing",
      description: "Build systems that stream and process structured data in real-time, showing progress as data is being generated."
    },
    {
      title: "Live Configuration Generation",
      description: "Create tools that generate complex configuration files, settings, or data structures with real-time progress display."
    },
    {
      title: "Interactive Form Building",
      description: "Develop platforms that build forms, surveys, or data structures step-by-step with visible generation process."
    },
    {
      title: "Dynamic Report Creation",
      description: "Build systems that generate structured reports, analyses, or data visualizations with real-time field-by-field display."
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
  "routing-agent": [
    {
      title: "Customer Service Routing",
      description: "Build systems that analyze customer inquiries and route them to sales, support, billing, or technical departments."
    },
    {
      title: "Specialized Medical Triage",
      description: "Create healthcare systems that route patient symptoms to appropriate specialists like cardiologists, neurologists, or general practitioners."
    },
    {
      title: "Financial Advisory Routing",
      description: "Develop platforms that route financial questions to investment, tax, retirement, or insurance specialists based on query analysis."
    },
    {
      title: "Technical Support Classification",
      description: "Build helpdesk systems that categorize and route technical issues to hardware, software, network, or security teams."
    }
  ],
  "orchestrator-agent": [
    {
      title: "Complex Project Management",
      description: "Build systems that break down large projects into subtasks, delegate to specialized agents, and coordinate completion."
    },
    {
      title: "Research Report Generation",
      description: "Create agents that coordinate data collection, analysis, writing, and formatting to generate comprehensive research reports."
    },
    {
      title: "Business Intelligence Analysis",
      description: "Develop systems that orchestrate data gathering, analysis, visualization, and insight generation for business decision making."
    },
    {
      title: "Multi-disciplinary Problem Solving",
      description: "Build agents that coordinate legal, financial, technical, and business analysis for complex business challenges."
    }
  ],
  "evaluator-optimizer": [
    {
      title: "Content Quality Optimization",
      description: "Create systems that generate content, evaluate quality against metrics, and automatically improve until standards are met."
    },
    {
      title: "Code Quality Enhancement",
      description: "Build tools that generate code, evaluate against quality standards, and refactor until performance and maintainability goals are achieved."
    },
    {
      title: "Marketing Copy Optimization",
      description: "Develop platforms that create marketing materials, test effectiveness metrics, and optimize for conversion rates."
    },
    {
      title: "Design Iteration Systems",
      description: "Create tools that generate designs, evaluate against UX principles, and refine until usability standards are satisfied."
    }
  ],
  "sequential-workflow": [
    {
      title: "Content Pipeline Processing",
      description: "Build systems that research topics, generate content, edit for quality, and format for publication in sequential steps."
    },
    {
      title: "Data Analysis Workflows",
      description: "Create pipelines that collect data, clean it, analyze patterns, generate insights, and create visualizations in sequence."
    },
    {
      title: "Document Processing Systems",
      description: "Develop workflows that extract text, translate languages, summarize content, and format for different audiences."
    },
    {
      title: "Product Development Pipelines",
      description: "Build systems that gather requirements, design solutions, implement features, test quality, and deploy products sequentially."
    }
  ],
  "parallel-workflow": [
    {
      title: "Comprehensive Data Analysis",
      description: "Build systems that perform sentiment analysis, entity extraction, topic modeling, and summarization simultaneously on the same text."
    },
    {
      title: "Multi-channel Content Processing",
      description: "Create platforms that analyze text, extract images, generate summaries, and assess quality across different content types in parallel."
    },
    {
      title: "Market Research Automation",
      description: "Develop tools that conduct competitor analysis, market sizing, trend identification, and opportunity assessment concurrently."
    },
    {
      title: "Risk Assessment Systems",
      description: "Build platforms that evaluate financial, operational, legal, and reputational risks in parallel for comprehensive analysis."
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
  "form-generator": [
    {
      title: "Survey Creation Tools",
      description: "Build platforms that generate custom surveys, questionnaires, and feedback forms from natural language descriptions."
    },
    {
      title: "Application Form Systems",
      description: "Create tools that generate job applications, loan applications, or registration forms with proper validation."
    },
    {
      title: "Data Collection Interfaces",
      description: "Develop systems that create custom data entry forms for research, customer feedback, or operational data collection."
    },
    {
      title: "Workflow Form Builders",
      description: "Build platforms that generate multi-step forms for business processes, onboarding, or approval workflows."
    }
  ],
  "csv-editor": [
    {
      title: "Financial Data Analysis",
      description: "Build tools that clean, transform, and analyze financial spreadsheets with AI-powered insights and suggestions."
    },
    {
      title: "Sales Data Processing",
      description: "Create systems that process sales data, generate reports, identify trends, and suggest optimization strategies."
    },
    {
      title: "Research Data Management",
      description: "Develop platforms that clean experimental data, perform statistical analysis, and generate research summaries."
    },
    {
      title: "Inventory Management Tools",
      description: "Build systems that analyze inventory data, suggest reorder points, and optimize stock levels with AI assistance."
    }
  ]
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
