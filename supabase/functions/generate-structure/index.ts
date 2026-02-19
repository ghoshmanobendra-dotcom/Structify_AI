// import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ProjectRequest {
  description: string;
}

function analyzeProjectDescription(description: string) {
  const lowerDesc = description.toLowerCase();

  let techStack = [];
  let architecture = "Monolithic MVC";
  let database = "PostgreSQL";
  let tools = [];
  let deployment = "Vercel/Netlify for frontend, Railway/Render for backend";
  let modules = [];
  let folderStructure = {};

  if (lowerDesc.includes("react") || lowerDesc.includes("vue") || lowerDesc.includes("angular") || lowerDesc.includes("frontend")) {
    techStack.push(
      { category: "Frontend", technology: "React", purpose: "UI framework for building interactive interfaces" },
      { category: "State Management", technology: "Zustand/Redux", purpose: "Global state management" },
      { category: "Styling", technology: "Tailwind CSS", purpose: "Utility-first CSS framework" }
    );
  }

  if (lowerDesc.includes("node") || lowerDesc.includes("express") || lowerDesc.includes("backend") || lowerDesc.includes("api")) {
    techStack.push(
      { category: "Backend", technology: "Node.js + Express", purpose: "Server-side runtime and REST API framework" },
      { category: "Validation", technology: "Zod/Joi", purpose: "Request validation and schema definition" }
    );
  }

  if (lowerDesc.includes("typescript") || lowerDesc.includes("ts")) {
    techStack.push(
      { category: "Language", technology: "TypeScript", purpose: "Type-safe JavaScript with enhanced developer experience" }
    );
  }

  if (lowerDesc.includes("auth") || lowerDesc.includes("login") || lowerDesc.includes("user")) {
    techStack.push(
      { category: "Authentication", technology: "JWT + bcrypt", purpose: "Secure user authentication and password hashing" }
    );
    tools.push("Passport.js", "Auth0 (optional)");
    modules.push({
      name: "Authentication Module",
      purpose: "Handle user registration, login, and session management",
      files: ["auth.controller.ts", "auth.service.ts", "auth.middleware.ts"]
    });
  }

  if (lowerDesc.includes("real-time") || lowerDesc.includes("chat") || lowerDesc.includes("websocket")) {
    techStack.push(
      { category: "Real-time", technology: "Socket.io", purpose: "WebSocket library for real-time bidirectional communication" }
    );
    tools.push("Redis", "WebSockets");
    modules.push({
      name: "Real-time Module",
      purpose: "WebSocket connections and real-time event handling",
      files: ["socket.handler.ts", "chat.service.ts"]
    });
  }

  if (lowerDesc.includes("database") || lowerDesc.includes("data") || lowerDesc.includes("storage")) {
    if (lowerDesc.includes("mongodb") || lowerDesc.includes("mongo")) {
      database = "MongoDB";
      techStack.push(
        { category: "Database", technology: "MongoDB", purpose: "NoSQL document database" },
        { category: "ODM", technology: "Mongoose", purpose: "MongoDB object modeling" }
      );
    } else if (lowerDesc.includes("mysql")) {
      database = "MySQL";
      techStack.push(
        { category: "Database", technology: "MySQL", purpose: "Relational database" },
        { category: "ORM", technology: "Sequelize", purpose: "SQL ORM for Node.js" }
      );
    } else {
      database = "PostgreSQL";
      techStack.push(
        { category: "Database", technology: "PostgreSQL", purpose: "Advanced open-source relational database" },
        { category: "ORM", technology: "Prisma", purpose: "Next-generation ORM for type-safe database access" }
      );
    }
  }

  if (lowerDesc.includes("microservice")) {
    architecture = "Microservices Architecture";
    deployment = "Docker + Kubernetes on AWS/GCP";
    tools.push("Docker", "Kubernetes", "API Gateway", "Service Mesh");
  } else if (lowerDesc.includes("serverless")) {
    architecture = "Serverless Architecture";
    deployment = "AWS Lambda + API Gateway or Vercel Functions";
    tools.push("Serverless Framework", "AWS Lambda", "API Gateway");
  }

  if (lowerDesc.includes("social") || lowerDesc.includes("post") || lowerDesc.includes("comment")) {
    modules.push(
      {
        name: "Posts Module",
        purpose: "Create, read, update, and delete posts",
        files: ["posts.controller.ts", "posts.service.ts", "posts.model.ts"]
      },
      {
        name: "Comments Module",
        purpose: "Handle comments on posts",
        files: ["comments.controller.ts", "comments.service.ts", "comments.model.ts"]
      }
    );
  }

  if (lowerDesc.includes("payment") || lowerDesc.includes("checkout") || lowerDesc.includes("stripe")) {
    techStack.push(
      { category: "Payments", technology: "Stripe", purpose: "Payment processing and subscription management" }
    );
    tools.push("Stripe SDK", "Webhooks");
    modules.push({
      name: "Payment Module",
      purpose: "Handle payment processing and subscription management",
      files: ["payment.controller.ts", "payment.service.ts", "stripe.webhook.ts"]
    });
  }

  if (lowerDesc.includes("email") || lowerDesc.includes("notification")) {
    tools.push("SendGrid/Nodemailer", "Email Templates");
    modules.push({
      name: "Notification Module",
      purpose: "Send emails and notifications",
      files: ["email.service.ts", "notification.controller.ts"]
    });
  }

  tools.push("ESLint", "Prettier", "Jest/Vitest", "GitHub Actions");

  if (techStack.length === 0) {
    techStack = [
      { category: "Frontend", technology: "React + TypeScript", purpose: "Modern UI development" },
      { category: "Backend", technology: "Node.js + Express", purpose: "RESTful API server" },
      { category: "Database", technology: "PostgreSQL", purpose: "Relational data storage" },
      { category: "Styling", technology: "Tailwind CSS", purpose: "Rapid UI styling" }
    ];
  }

  if (modules.length === 0) {
    modules = [
      {
        name: "Core Module",
        purpose: "Main application logic and routing",
        files: ["app.ts", "routes.ts", "middleware.ts"]
      }
    ];
  }

  folderStructure = {
    name: "project-root",
    type: "folder",
    children: [
      {
        name: "frontend",
        type: "folder",
        description: "Frontend Client Application",
        children: [
          {
            name: "src",
            type: "folder",
            children: [
              { name: "components", type: "folder", description: "Reusable UI components" },
              { name: "pages", type: "folder", description: "Page-level components" },
              { name: "hooks", type: "folder", description: "Custom React hooks" },
              { name: "utils", type: "folder", description: "Utility functions" },
              { name: "services", type: "folder", description: "API service calls" },
              { name: "types", type: "folder", description: "TypeScript type definitions" },
              { name: "App.tsx", type: "file" },
              { name: "main.tsx", type: "file" }
            ]
          },
          { name: "public", type: "folder", description: "Static assets" },
          { name: "package.json", type: "file" },
          { name: "tsconfig.json", type: "file" },
          { name: "vite.config.ts", type: "file" }
        ]
      },
      {
        name: "backend",
        type: "folder",
        description: "Backend Server Application",
        children: [
          {
            name: "src",
            type: "folder",
            children: [
              { name: "controllers", type: "folder", description: "Request handlers" },
              { name: "services", type: "folder", description: "Business logic" },
              { name: "models", type: "folder", description: "Data models" },
              { name: "middleware", type: "folder", description: "Express middleware" },
              { name: "routes", type: "folder", description: "API routes" },
              { name: "utils", type: "folder", description: "Helper functions" },
              { name: "config", type: "folder", description: "Configuration files" },
              { name: "app.ts", type: "file" },
              { name: "server.ts", type: "file" }
            ]
          },
          { name: "package.json", type: "file" },
          { name: "tsconfig.json", type: "file" }
        ]
      },
      {
        name: "database",
        type: "folder",
        description: "Database Configuration and Migrations",
        children: [
          { name: "migrations", type: "folder", description: "Database migration files" },
          { name: "seeds", type: "folder", description: "Database seed data" },
          { name: "schema.prisma", type: "file", description: "Prisma schema definition" },
          { name: "init.sql", type: "file", description: "SQL initialization script" }
        ]
      },
      {
        name: "deployment",
        type: "folder",
        description: "Deployment Configuration (Docker, Kubernetes, CI/CD)",
        children: [
          {
            name: "docker", type: "folder", children: [
              { name: "frontend.Dockerfile", type: "file" },
              { name: "backend.Dockerfile", type: "file" }
            ]
          },
          { name: "k8s", type: "folder", description: "Kubernetes manifests" },
          { name: "docker-compose.yml", type: "file", description: "Docker composition" },
          {
            name: ".github", type: "folder", children: [
              {
                name: "workflows", type: "folder", children: [
                  { name: "ci.yml", type: "file" },
                  { name: "cd.yml", type: "file" }
                ]
              }
            ]
          }
        ]
      },
      { name: ".env.example", type: "file", description: "Example environment variables" },
      { name: ".gitignore", type: "file" },
      { name: "README.md", type: "file" }
    ]
  };

  return {
    project_description: description,
    tech_stack: techStack,
    folder_structure: folderStructure,
    architecture_type: architecture,
    database_suggestion: database,
    tools_integrations: tools,
    deployment_recommendations: deployment,
    module_breakdown: modules
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { description }: ProjectRequest = await req.json();

    if (!description || description.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Project description is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const result = analyzeProjectDescription(description);

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate project structure" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
