export interface IProfile {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    description?: string;
    avatar?: string;
    socials?: Array<{
       name: string;
       url: string;
       icon?: string;
    }>;
    skills?: Array<{
        name: string;
        level?: string;
        icon?: string;
    }>;
    stats?: Array<string>;
    achievements?: Array<{
        title: string;
        platform: string;
        description: string;
        icon?: string;
        type: ("publication" | "competition" | "award" | "certification" | "hackathon");
        date?: string;
        link?: string;
    }>
    email: string;
    location?: string;
    currentFocus?: string[];
}

export const profile: IProfile = {
    title: "Software Engineer & Open Source Enthusiast",
    firstName: "Donald",
    middleName: "Turing",
    lastName: "Lee",
    username: "Donald Lee",
    description: "",
    email: "donaldturinglee@gmail.com",
    location: "",
    socials: [
        {
            name: "github",
            url: "https://github.com/donaldturinglee",
        },
        {
            name: "youtube",
            url: "https://www.youtube.com/@DonaldTuringLee",
        },
        {
            name: "linkedin",
            url: "https://www.linkedin.com/in/donaldturinglee/",
        },
        {
            name: "discord",
            url: "https://discord.gg/YsteKRjrSH",
        },
        {
            name: "twitter",
            url: "https://twitter.com/donaldturinglee",
        }
    ],
    skills: [
        { name: "C++" },
        { name: "Lua" },
        { name: "PostgreSQL"},
        { name: "TypeScript"},
        { name: "Python"},
        { name: "React"},
        { name: "Node.js"},
        { name: "Podman"},
        { name: "Arch Linux"},
        { name: "Bash"},
        { name: "LaTeX"},
        { name: "Redis"},
        { name: "MongoDB"},
        { name: "Git"},
        { name: "Tailwind CSS"},
        { name: "RabbitMQ"},
        { name: "AWS"},
        { name: "Azure"},
        { name: "GCP"}
    ],
    achievements: [
        {
            title: "Hackathon 2022",
            platform: "google",
            description: "",
            type: "competition"
        },
        {
            title: "Hackathon 2023",
            platform: "google",
            description: "",
            type: "competition"
        },
        {
            title: "Hackathon 2024",
            platform: "google",
            description: "",
            type: "competition"
        }
    ],
    currentFocus: [
        "Building Machine Learning Systems",
        "Learning Game Engine",
        "Contributing to Open Source Projects"
    ]
}