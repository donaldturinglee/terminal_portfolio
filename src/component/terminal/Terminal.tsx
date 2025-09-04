import {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import TerminalWelcomeMessage from "./TerminalWelcomeMessage";
import {terminal} from "../../config/terminal";
import {profile} from "../../config/profile";
import {IFILE} from "../../config/file";
import {navigation} from "../../config/navigation";
import "./terminal.scss";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<any[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const [typedText, setTypedText] = useState("");

    // Maximum output items to prevent memory issues
    const MAX_OUTPUT_ITEMS = 500;

    // Auto-focus input on component mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Maintain focus when output changes
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [output]);

    // Command aliases
    const commandAliases: { [key: string]: string } = {
        'll': 'ls -la',
        'cls': 'clear',
        'h': 'help',
        'q': 'exit',
        'quit': 'exit',
        '?': 'help',
        'find': 'search',
    };

    // Helper function to format file permissions
    const formatPermissions = (file: IFILE): string => {
        const typeChar = file.type === "directory" ? "d" : file.type === "symlink" ? "l" : "-";
        return `${typeChar}${file.permissions}`;
    };

    // Helper function to format file size
    const formatSize = (size: number): string => {
        return size.toString().padStart(4, ' ');
    };

    // Helper function to format date
    const formatDate = (date: Date): string => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate().toString().padStart(2, ' ');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${month} ${day} ${hours}:${minutes}`;
    };

    // Helper function to get directories from navigation
    const getDirectoriesFromNavigation = (): IFILE[] => {
        const dirs = navigation.links
            .filter(link => link.path !== "/")
            .map(link => ({
                name: link.name.toLowerCase() + "/",
                type: "directory" as const,
                permissions: "rwxr-xr-x",
                size: 4096,
                group: "user",
                owner: "user",
                links: 2,
                modifiedAt: new Date("Jan  1 12:00")
            }));

        return dirs;
    };

    // Helper function to get special directories (. and ..)
    const getSpecialDirectories = (): IFILE[] => {
        const subdirCount = getDirectoriesFromNavigation().length;

        return [
            {
                name: ".",
                type: "directory" as const,
                permissions: "rwxr-xr-x",
                size: 4096,
                group: "user",
                owner: "user",
                links: 2 + subdirCount,
                modifiedAt: new Date("Jan  1 12:00")
            },
            {
                name: "..",
                type: "directory" as const,
                permissions: "rwxr-xr-x",
                size: 4096,
                group: "root",
                owner: "root",
                links: 3,
                modifiedAt: new Date("Jan  1 11:30")
            }
        ];
    };

    // Command Implement
    const handleCommand = (command: string) => {

        const prompts = `${terminal.username}@${terminal.hostname}:~$ ${command}`;

        // Create command entry with both prompt and output
        const commandEntry = {
            type: "command_entry",
            prompt: prompts,
            command,
            output: null as any
        };

        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        const params = args.slice(1);

        // Check for command aliases
        if (commandAliases[cmd]) {
            const aliasCommand = commandAliases[cmd];
            commandEntry.output = {
                type: "command",
                command: cmd,
                text: [`Alias '${cmd}' expanded to '${aliasCommand}'`, `Executing: ${aliasCommand}`]
            };
            handleOutput(commandEntry);
            setTimeout(() => handleCommand(aliasCommand), 1000);
            return;
        }

        // Check for custom commands first
        if (terminal.customCommands && terminal.customCommands[cmd]) {
            const customCmd = terminal.customCommands[cmd];
            const output = typeof customCmd.output === 'function' ? customCmd.output() : customCmd.output;
            commandEntry.output = {
                type: "command",
                command: cmd,
                text: output
            };
            handleOutput(commandEntry);

            // Handle actions
            if (customCmd.action === 'navigate' && customCmd.target) {
                setTimeout(() => navigate(customCmd.target!), 1000);
            } else if (customCmd.action === 'external' && customCmd.target) {
                setTimeout(() => window.open(customCmd.target!, '_blank'), 1000);
            }
            return;
        }

        // Check if command is in enabled commands list
        if (!terminal.commands.includes(cmd)) {
            commandEntry.output = {
                type: "command",
                command: cmd,
                text: [
                    `${cmd}: command not found`
                ]
            };
            handleOutput(commandEntry);
            return;
        }

        switch (cmd) {
            case "help":
                commandEntry.output = {
                    type: "command",
                    command: cmd,
                    text: [
                        "The commands are defined internally.   Type 'help' to see this list.\n",
                        "Type 'help <command>' to find out more about the command.\n",
                        "Use 'info <command>' to find out more about the command in general.\n",
                        "Use 'man -k' or 'info' to find out more about commands not in this list.\n",
                        "A star (*) next to a name means that the command is unavailable\n\n",
                        "╭─ SYSTEM & INFORMATION ────────────────────┬─ NAVIGATION & FILES ───────────────────╮",
                        "│                                           │                                        │",
                        "│  neofetch     System overview w/ ASCII    │  cd [dir]     Change directory         │",
                        "│  * whoami     Current user details        │  ls [OPTION] List directory            │",
                        "│  * about      Developer biography         │  pwd          Current path             │",
                        "│                                           │  * tree       Directory tree view      │",
                        "│                                           │  * grep [pattern] Search in files      │",
                        "│                                           │                                        │",
                        "└───────────────────────────────────────────┴────────────────────────────────────────┘",
                        "",
                        "╭─ UTILITIES & PRODUCTIVITY ──────────────────────────────────────────────────────────╮",
                        "│                                                                                     │",
                        "│  * calc [expr]    Smart calculator       │  * weather      Current weather info     │",
                        "│  * skills         Technical skill tree   │  * analytics    Site visitor stats       │",
                        "│  history          Command history view   │  date           Current date & time      │",
                        "│  * shortcuts      Keyboard hotkeys       │  * theme        Terminal themes          │",
                        "│                                                                                     │",
                        "└─────────────────────────────────────────────────────────────────────────────────────┘",
                        "",
                        "╭─ POWER USER ZONE ───────────────────────────────────────────────────────────────────╮",
                        "│                                                                                     │",
                        "│  Command Aliases:                                                                   │",
                        "│     ll → ls -la      h → help       q → quit      exit → logout     ? → help        │",
                        "│     esc → exit       cls → clear                                                    │",
                        "│                                                                                     │",
                        "│  Keyboard Shortcuts:                                                                │",
                        "│     Ctrl+L → clear   Ctrl+H → home     Ctrl+C → cancel   Tab → complete             │",
                        "│     ↑/↓ → history    Ctrl+U → clear    Ctrl+R → refresh  Enter → execute            │",
                        "│                                                                                     │",
                        "└─────────────────────────────────────────────────────────────────────────────────────┘",
                    ]
                };
                break;

            case "neofetch":
                const asciiArt = terminal.systemInfo.ascii || [
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
                ];

                const neofetchOutput = [
                    `${asciiArt[0]}${terminal.username}@${terminal.hostname}`,
                    `${asciiArt[1]}─────────────────`,
                    `${asciiArt[2]}OS: ${terminal.systemInfo.os}`,
                    `${asciiArt[3]}Host: ${terminal.systemInfo.host}`,
                    `${asciiArt[4]}Kernel: ${terminal.systemInfo.kernel}`,
                    `${asciiArt[5]}Uptime: ${terminal.systemInfo.uptime}`,
                    `${asciiArt[6]}Packages: ${terminal.systemInfo.packages}`,
                    `${asciiArt[7]}Shell: ${terminal.systemInfo.shell}`,
                    `${asciiArt[8]}Resolution: ${terminal.systemInfo.resolution}`,
                    `${asciiArt[9]}DE: ${terminal.systemInfo.de}`,
                    `${asciiArt[10]}WM: ${terminal.systemInfo.wm}`,
                    `${asciiArt[11]}CPU: ${terminal.systemInfo.cpu}`,
                    `${asciiArt[12]}GPU: ${terminal.systemInfo.gpu}`,
                    `${asciiArt[13]}Memory: ${terminal.systemInfo.memory}`,
                    ...asciiArt.slice(14)
                ];

                commandEntry.output = {
                    type: "neofetch",
                    command: cmd,
                    text: neofetchOutput
                };
                break;

            case "clear":
                setOutput([]);
                return;

            case "ls":
                const flags = params.filter(p => p.startsWith('-'));
                const longFormat = flags.includes('-l') || flags.includes('-la') || flags.includes('-al');
                const showAll = flags.includes('-a') || flags.includes('-la') || flags.includes('-al');

                // Get only directories from navigation
                const directories = getDirectoriesFromNavigation();
                let allFiles = [...directories];

                // Add special directories if -a flag is used
                if (showAll) {
                    const specialDirs = getSpecialDirectories();
                    allFiles = [...specialDirs, ...allFiles];
                }

                // Calculate total size for long format (in 1K blocks)
                const totalSize = allFiles.reduce((sum, file) => sum + Math.ceil(file.size / 1024), 0);

                if (longFormat) {
                    const fileLines = allFiles.map(file => {
                        const permissions = formatPermissions(file);
                        const links = file.links.toString().padStart(3, ' ');
                        const owner = file.owner.padEnd(8, ' ');
                        const group = file.group.padEnd(8, ' ');
                        const size = file.size.toString().padStart(8, ' ');
                        const date = formatDate(file.modifiedAt);

                        // Format filename based on type
                        let displayName = file.name;
                        if (file.type === "directory" && !file.name.endsWith('/')) {
                            displayName = file.name;
                        } else if (file.type === "symlink") {
                            displayName = `${file.name}@`;
                        } else if (file.type === "file" && file.permissions.includes('x')) {
                            displayName = `${file.name}*`;
                        }

                        return `${permissions} ${links} ${owner} ${group} ${size} ${date} ${displayName}`;
                    });

                    const outputText = [
                        `total ${totalSize}`,
                        ...fileLines
                    ];

                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: outputText
                    };
                } else {
                    // Simple format - show files in columns like real ls
                    const fileNames = allFiles.map(file => {
                        if (file.type === "directory") {
                            return file.name.endsWith('/') ? file.name : file.name + '/';
                        }
                        if (file.type === "symlink") return `${file.name}@`;
                        if (file.type === "file" && file.permissions.includes('x')) return `${file.name}*`;
                        return file.name;
                    });

                    // Group files in rows (simulate column output)
                    const outputLines = [];
                    const itemsPerLine = 4;
                    for (let i = 0; i < fileNames.length; i += itemsPerLine) {
                        const lineItems = fileNames.slice(i, i + itemsPerLine);
                        outputLines.push(lineItems.map(item => item.padEnd(20)).join(''));
                    }

                    const outputText = outputLines;

                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: outputText
                    };
                }
                break;

            case "cd":
                const dir = params[0] || "~";
                if (dir === "profile" || dir === "/profile") {
                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: [
                            "Navigating to profile ...",
                            "Loading profile information ..."
                        ]
                    };
                    handleOutput(commandEntry);
                    setTimeout(() => navigate("/profile"), 1000);
                } else if (dir === "projects" || dir === "/projects") {
                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: [
                            "Navigating to projects ...",
                            "Loading GitHub repositories ..."
                        ]
                    };
                    handleOutput(commandEntry);
                    setTimeout(() => navigate("/projects"), 1000);
                } else if (dir === "services" || dir === "/services") {
                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: [
                            "Navigating to services ...",
                            "Loading my services ..."
                        ]
                    };
                    handleOutput(commandEntry);
                    setTimeout(() => navigate("/services"), 1000);
                } else if (dir === ".." || dir === "~" || dir === "/") {
                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: ["Changed directory to: " + (dir === ".." ? "parent directory" : "home")]
                    };
                    handleOutput(commandEntry);
                } else {
                    commandEntry.output = {
                        type: "command",
                        command: cmd,
                        text: [`cd: ${dir}: No such file or directory`]
                    };
                    handleOutput(commandEntry);
                }
                return;

            case "pwd":
                commandEntry.output = {
                    type: "command",
                    command: cmd,
                    text: [`/home/${profile.username}`]
                };
                break;

            case "date":
                const now = new Date();
                const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                // 12-hour format
                let hours = now.getHours();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'

                // Get timezone abbreviation
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const timeZoneAbbr = new Intl.DateTimeFormat('en', {
                    timeZoneName: 'short'
                }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || 'UTC';

                // Format: "Wed Sep  3 01:50:50 AM/PM PDT 2025"
                const formattedDate = [
                    weekdays[now.getDay()],
                    months[now.getMonth()],
                    now.getDate().toString().padStart(2, ' '),
                    hours.toString().padStart(2, '0') + ':' +
                    now.getMinutes().toString().padStart(2, '0') + ':' +
                    now.getSeconds().toString().padStart(2, '0'),
                    ampm,
                    timeZoneAbbr,
                    now.getFullYear()
                ].join(' ');

                commandEntry.output = {
                    type: "command",
                    command: cmd,
                    text: [formattedDate]
                };
                break;

            default:
                commandEntry.output = {
                    type: "command",
                    command: cmd,
                    text: [
                        `${cmd}: command not found`,
                        "",
                        "Did you mean:",
                        "   • help    - Show available commands",
                        "   • ls      - List files and directories",
                        "   • clear   - Clear terminal",
                        "   • about   - Learn about me"
                    ]
                };
                break;
        }

        handleOutput(commandEntry);
    };

    const handleInputChange = (e: any) => {
        setInput(e.target.value);
        setHistoryIndex(-1);
    };

    const handleOutput = (item: any) => {
        setOutput(prev => [item, ...prev.slice(0, MAX_OUTPUT_ITEMS - 1)]); // Limit to MAX_OUTPUT_ITEMS
        // Scroll to input after adding output
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.scrollIntoView({behavior: "smooth", block: "end"});
            }
        }, 100);
    };

    const handleKeyDown = (e: any) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            setOutput([]);
            setInput("");
            return;
        }

        if (e.key === "Enter") {
            if (e.target.value.trim() === "") {
                const emptyCommandEntry = {
                    type: "command_entry",
                    prompt: `${terminal.username}@${terminal.hostname}:~$ `,
                    command: "",
                    output: null
                };
                handleOutput(emptyCommandEntry);
            } else {
                const command = e.target.value.trim();
                setCommandHistory(prev => [command, ...prev.slice(0, 99)]); // Keep last 100 commands
                handleCommand(command);
                setInput("");
            }
            setHistoryIndex(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] || "");
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            // Use dynamic commands from configuration
            const commands = terminal.commands;
            const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
            if (matches.length === 1) {
                setInput(matches[0]);
            } else if (matches.length > 1) {
                const completionEntry = {
                    type: "command_entry",
                    prompt: `${terminal.username}@${terminal.hostname}:~$ ${input}`,
                    command: input,
                    output: {
                        type: "completion",
                        command: input,
                        text: [`Tab completion: ${matches.join(", ")}`]
                    }
                };
                handleOutput(completionEntry);
            }
        }
    };

    return (
        <div
            ref={terminalRef}
            className="pt-0 font-mono space-y-1 h-[calc(100vh-160px)] max-w-screen-xl mx-auto p-2 sm:p-4 terminal-container"
            style={{
                backgroundColor: 'var(--theme-background)',
                color: 'var(--theme-text)',
                fontFamily: 'var(--theme-fontFamily)'
            }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Welcome message */}
            {output.length === 0 && (
                <TerminalWelcomeMessage/>
            )}

            {/* Output */}
            <div className="space-y-1">
                {output.slice().reverse().map((item, index) => (
                    <div key={index}>
                        {item.type === "command_entry" && (
                            <>
                                {/*  */}
                                <div className="text-sm sm:text-base" style={{color: 'var(--theme-commandText)'}}>
                                    <div className="break-all">{item.prompt}</div>
                                </div>

                                {/*  */}
                                {item.output && (
                                    <div className="ml-0">
                                        {item.output.type === "command" && (
                                            <div className="text-sm sm:text-base"
                                                 style={{color: 'var(--theme-outputText)'}}>
                                                {item.output.text.map((line: string, i: number) => (
                                                    <div key={i} className={`break-words`}
                                                         style={{
                                                             color: line.startsWith("❌") ? 'var(--theme-error)' :
                                                                 line.startsWith("✨") || line.startsWith("📁") ? 'var(--theme-info)' :
                                                                     line.startsWith("💡") ? 'var(--theme-warning)' :
                                                                         line.startsWith("│") || line.startsWith("┌") || line.startsWith("╰") || line.startsWith("├") ? 'var(--theme-outputText)' :
                                                                             'var(--theme-outputText)'
                                                         }}>
                                                        <pre>{line}</pre>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {item.output.type === "neofetch" && (
                                            <div className="font-mono text-xs sm:text-sm overflow-x-auto"
                                                 style={{color: 'var(--theme-info)'}}>
                                                {item.output.text.map((line: string, i: number) => (
                                                    <div key={i} className="whitespace-nowrap">
                                                        <pre>{line}</pre>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {item.output.type === "profile" && (
                                            <div className="font-mono text-xs sm:text-sm overflow-x-auto"
                                                 style={{color: 'var(--theme-accent)'}}>
                                                {item.output.text.map((line: string, i: number) => (
                                                    <div key={i} className="whitespace-nowrap"
                                                         style={{
                                                             color: line.includes("🎓") || line.includes("🚀") || line.includes("🐧") || line.includes("🤖") || line.includes("⚡") || line.includes("🔧") ? 'var(--theme-primary)' :
                                                                 line.includes("📊") || line.includes("💼") || line.includes("🎯") || line.includes("📞") ? 'var(--theme-warning)' :
                                                                     line.includes("🌟") || line.includes("📈") || line.includes("🔥") || line.includes("💼") ? 'var(--theme-info)' :
                                                                         line.includes("🏆") || line.includes("🥇") || line.includes("🎯") || line.includes("🌐") || line.includes("🔧") ? 'var(--theme-secondary)' :
                                                                             line.includes("🐍") || line.includes("🌐") || line.includes("🔧") || line.includes("🛠️") || line.includes("📊") ? 'var(--theme-accent)' :
                                                                                 line.includes("💡") || line.includes("🔍") ? 'var(--theme-warning)' :
                                                                                     line.includes("╭") || line.includes("├") || line.includes("╰") || line.includes("│") ? 'var(--theme-accent)' :
                                                                                         'var(--theme-outputText)'
                                                         }}>
                                                        {line}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {item.output.type === "completion" && (
                                            <div className="text-sm sm:text-base"
                                                 style={{color: 'var(--theme-warning)'}}>
                                                {item.output.text.map((line: string, i: number) => (
                                                    <div key={i} className="break-words">
                                                        <pre>{line}</pre>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Input line */}
            <div className="flex items-center pt-2 text-sm sm:text-base" style={{color: 'var(--theme-commandText)'}}>
                <span className="hidden sm:inline"
                      style={{color: 'var(--theme-promptUser)'}}>{terminal.username}@{terminal.hostname}</span>
                <span className="hidden sm:inline" style={{color: 'var(--theme-text)'}}>:</span>
                <span className="hidden sm:inline" style={{color: 'var(--theme-promptPath)'}}>~</span>
                <span style={{color: 'var(--theme-promptSymbol)'}}>$&nbsp;</span>
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-transparent border-none outline-none flex-1 font-mono text-sm sm:text-base"
                    style={{color: 'var(--theme-text)'}}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={output.length === 0 ? typedText : ""}
                />
            </div>
        </div>
    );
}

export default Terminal;