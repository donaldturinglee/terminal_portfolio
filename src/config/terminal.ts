export interface ICustomCommand {
    description: string;
    output: string[] | (() => string[]);
    action?: 'navigate' | 'external' | 'function';
    target?: string;
}

export interface ISystemInfo {
    os: string;
    host: string;
    kernel: string;
    uptime: string;
    packages: string;
    shell: string;
    resolution: string;
    de?: string;
    wm?: string;
    cpu: string;
    gpu: string;
    memory: string;
    ascii?: string[];
}

export interface ITerminal {
    ascii: string[];
    username: string;
    hostname: string;
    theme: 'dark' | 'light';
    systemInfo: ISystemInfo;
    commands: string[];
    customCommands?: { [key: string]: ICustomCommand };
    prompt: string;
    usages: Array<{
        command: string;
        description: string;
    }>;
    tips: Array<{
        name: string;
        description: string;
    }>;
}

export const terminal: ITerminal = {
    ascii: [
        "██████╗  ██████╗ ███╗   ██╗ █████╗ ██╗     ██████╗     ██╗     ███████╗███████╗",
        "██╔══██╗██╔═══██╗████╗  ██║██╔══██╗██║     ██╔══██╗    ██║     ██╔════╝██╔════╝",
        "██║  ██║██║   ██║██╔██╗ ██║███████║██║     ██║  ██║    ██║     █████╗  █████╗  ",
        "██║  ██║██║   ██║██║╚██╗██║██╔══██║██║     ██║  ██║    ██║     ██╔══╝  ██╔══╝  ",
        "██████╔╝╚██████╔╝██║ ╚████║██║  ██║███████╗██████╔╝    ███████╗███████╗███████╗",
        "╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═════╝     ╚══════╝╚══════╝╚══════╝"
    ],
    username: "donaldturinglee",
    hostname: "GameCrafters",
    theme: "light",
    commands: [
        "help", "neofetch", "clear", "ls", "pwd", "history", "date", "cd", "welcome"
    ],
    customCommands: {
        // "example": {
        //     description: "An example command",
        //     output: ["This is an example output"],
        //     action: "navigate",
        //     target: "/example"
        // }
    },
    systemInfo: {
        os: "Arch Linux x86_64",
        host: "GameCrafters",
        kernel: "6.16.4-arch1-1-x86_64",
        uptime: "12 hours, 34 mins",
        packages: "1337 (pacman)",
        shell: "bash",
        resolution: "1920x1080",
        wm: "bspwm",
        cpu: "Intel i7-7700H @ 2.80GHz",
        gpu: "NVIDIA GeForce GTX 1050 Ti",
        memory: "15990MiB / 31981MiB",
        ascii: [
            "                   -`                    ",
            "                  .o+`                   ",
            "                 `ooo/                   ",
            "                `+oooo:                  ",
            "               `+oooooo:                 ",
            "               -+oooooo+:                ",
            "             `/:-:++oooo+:               ",
            "            `/++++/+++++++:              ",
            "           `/++++++++++++++:             ",
            "          `/+++ooooooooooooo/`           ",
            "         ./ooosssso++osssssso+`          ",
            "        .oossssso-````/ossssss+`         ",
            "       -osssssso.      :ssssssso.        ",
            "      :osssssss/        osssso+++.       ",
            "     /ossssssss/        +ssssooo/-       ",
            "   `/ossssso+/:-        -:/+osssso+-     ",
            "  `+sso+:-`                 `.-/+oso:    ",
            " `++:.                           `-/+/   ",
            " .`                                 `/   "
        ]
    },
    prompt: "donaldturinglee@GameCrafters:~$ ",
    usages: [
        {
            command: "help",
            description: "Display information about built-in commands"
        },
        {
            command: "neofetch",
            description: "Display system information"
        },
        {
            command: "ls",
            description: "List files and directories"
        },
        {
            command: "cd",
            description: "Change directory"
        }
    ],
    tips: [
        {
            name: "↑/↓",
            description: "Navigate through command history"
        },
        {
            name: "Tab",
            description: "Auto-complete commands"
        },
        {
            name: "Ctrl+L",
            description: "Clear the terminal"
        }
    ]
}
