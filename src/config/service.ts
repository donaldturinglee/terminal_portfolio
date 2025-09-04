export interface IService {
    id: number;
    name: string;
    description: string;
    category: string;
    price?: string;
    duration?: string;
    features: string[];
    technologies?: string[];
    status: ("available" | "popular" | "coming-soon")[];
}

export const services: IService[] = [
    {
        id: 1,
        name: "Web Development",
        description: "Full-stack web application development with modern technologies",
        category: "Development",
        price: "Starting from $2000",
        duration: "8-12 weeks",
        features: [
            "Responsive Design",
            "Modern UI/UX",
            "Database Integration",
            "API Development",
            "SEO Optimization"
        ],
        technologies: ["FastAPI", "Node.js", "TypeScript", "PostgreSQL","MongoDB", "Valkey", "RabbitMQ"],
        status: ["popular", "available"]
    },
    {
        id: 2,
        name: "Mobile App Development",
        description: "Cross-platform mobile applications for iOS and Android",
        category: "Development",
        price: "Starting from $3000",
        duration: "12-24 weeks",
        features: [
            "Cross-platform compatibility",
            "Native performance",
            "Push notifications",
            "Offline functionality",
            "App store deployment"
        ],
        technologies: ["React Native", "Flutter", "TypeScript"],
        status: ["available"]
    },
    {
        id: 3,
        name: "UI/UX Design",
        description: "User interface and experience design for web and mobile",
        category: "Design",
        price: "Starting from $800",
        duration: "2-4 weeks",
        features: [
            "User research",
            "Wireframing",
            "Prototyping",
            "Design systems",
            "Usability testing"
        ],
        technologies: ["Figma", "Adobe XD", "Sketch"],
        status: ["popular"]
    },
    {
        id: 4,
        name: "DevOps & Deployment",
        description: "Cloud infrastructure setup and deployment automation",
        category: "Infrastructure",
        price: "Starting from $1200",
        duration: "1-3 weeks",
        features: [
            "CI/CD pipelines",
            "Cloud infrastructure",
            "Monitoring & logging",
            "Security best practices",
            "Performance optimization"
        ],
        technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions"],
        status: ["available"]
    },
    {
        id: 5,
        name: "AI Integration",
        description: "Artificial intelligence and machine learning solutions",
        category: "AI/ML",
        price: "Contact for pricing",
        duration: "Varies",
        features: [
            "Custom AI models",
            "API integration",
            "Data analysis",
            "Natural language processing",
            "Computer vision"
        ],
        technologies: ["Python", "TensorFlow", "OpenAI API", "PyTorch"],
        status: ["coming-soon"]
    },
    {
        id: 6,
        name: "Technical Consulting",
        description: "Expert advice on technology decisions and architecture",
        category: "Consulting",
        price: "$100/hour",
        duration: "Flexible",
        features: [
            "Technology assessment",
            "Architecture review",
            "Code review",
            "Performance optimization",
            "Best practices guidance"
        ],
        technologies: ["Various"],
        status: ["popular", "available"]
    }
];