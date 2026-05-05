
export declare function Log(
    stack: "frontend" | "backend",
    level: "debug" | "info" | "warn" | "error" | "fatal",
    pkg: "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils" | "handler" | "db",
    message: string
): Promise<void>;