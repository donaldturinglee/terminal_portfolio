export interface ITheme {
    name: string;
    displayName: string;
    colors: {
        background: string;
        text: string;
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        primary: string;
        secondary: string;
        accent: string;
        success: string;
        warning: string;
        error: string;
        info: string;
        muted: string;
        border: string;
        promptUser: string;
        promptHost: string;
        promptPath: string;
        promptSymbol: string;
        commandText: string;
        outputText: string;
    };
    styles: {
        fontFamily: string;
        terminalGlow?: boolean;
        cursorBlink?: boolean;
        borderStyle?: string;
        backgroundPattern?: string;
    };
}

export const themes: Record<string, ITheme> = {
    dark: {
        name: "dark",
        displayName: "Dark theme",
        colors: {
            background: "#000000",
            text: "#ffffff",
            h1: "#22c55e",
            h2: "#3b82f6",
            h3: "#eab308",
            h4: "#10b981",
            h5: "#f59e0b",
            h6: "#ef4444",
            primary: "#22c55e",
            secondary: "#3b82f6",
            accent: "#eab308",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
            info: "#06b6d4",
            muted: "#6b7280",
            border: "#374151",
            promptUser: "#3b82f6",
            promptHost: "#3b82f6",
            promptPath: "#1d4ed8",
            promptSymbol: "#ffffff",
            commandText: "#22c55e",
            outputText: "#d1d5db",
        },
        styles: {
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
            terminalGlow: false,
            cursorBlink: true,
            borderStyle: "solid",
        },
    },

    light: {
        name: "light",
        displayName: "Light theme",
        colors: {
            background: "#ffffff",
            text: "#1a1a1a",
            h1: "#2563eb",
            h2: "#4f46e5",
            h3: "#7c3aed",
            h4: "#059669",
            h5: "#d97706",
            h6: "#dc2626",
            primary: "#2563eb",
            secondary: "#4f46e5",
            accent: "#7c3aed",
            success: "#059669",
            warning: "#d97706",
            error: "#dc2626",
            info: "#0891b2",
            muted: "#6b7280",
            border: "#d1d5db",
            promptUser: "#2563eb",
            promptHost: "#4f46e5",
            promptPath: "#7c3aed",
            promptSymbol: "#1a1a1a",
            commandText: "#059669",
            outputText: "#374151",
        },
        styles: {
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Liberation Mono', Menlo, monospace",
            terminalGlow: false,
            cursorBlink: true,
            borderStyle: "solid",
        },
    }

};

export const getTheme = (themeName: string): ITheme => {
    return themes[themeName] || themes.dark;
};

export const getAvailableThemes = (): string[] => {
    return Object.keys(themes);
};

export const getThemeDisplayNames = (): Record<string, string> => {
    return Object.fromEntries(
        Object.entries(themes).map(([key, theme]) => [key, theme.displayName])
    );
};