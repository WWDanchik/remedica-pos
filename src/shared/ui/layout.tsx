import React, { ReactNode, CSSProperties } from "react";

interface FlexProps {
    children: ReactNode;
    mainAxisAlignment?:
        | "start"
        | "center"
        | "end"
        | "space-between"
        | "space-around"
        | "space-evenly";
    crossAxisAlignment?: "start" | "center" | "end" | "stretch" | "baseline";
    gap?: number;
    className?: string;
    style?: CSSProperties;
}

interface ExpandedProps {
    children: ReactNode;
    flex?: number;
    className?: string;
    style?: CSSProperties;
}

export const Row: React.FC<FlexProps> = ({
    children,
    mainAxisAlignment = "start",
    crossAxisAlignment = "center",
    gap = 0,
    className = "",
    style = {},
}) => {
    const getMainAxis = () => {
        switch (mainAxisAlignment) {
            case "start":
                return "flex-start";
            case "end":
                return "flex-end";
            default:
                return mainAxisAlignment;
        }
    };

    const getCrossAxis = () => {
        switch (crossAxisAlignment) {
            case "start":
                return "flex-start";
            case "end":
                return "flex-end";
            default:
                return crossAxisAlignment;
        }
    };

    const rowStyle: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: getMainAxis(),
        alignItems: getCrossAxis(),
        gap: `${gap}px`,
        ...style,
    };

    return (
        <div className={className} style={rowStyle}>
            {children}
        </div>
    );
};

export const Column: React.FC<FlexProps> = ({
    children,
    mainAxisAlignment = "start",
    crossAxisAlignment = "center",
    gap = 0,
    className = "",
    style = {},
}) => {
    const getMainAxis = () => {
        switch (mainAxisAlignment) {
            case "start":
                return "flex-start";
            case "end":
                return "flex-end";
            default:
                return mainAxisAlignment;
        }
    };

    const getCrossAxis = () => {
        switch (crossAxisAlignment) {
            case "start":
                return "flex-start";
            case "end":
                return "flex-end";
            default:
                return crossAxisAlignment;
        }
    };

    const columnStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: getMainAxis(),
        alignItems: getCrossAxis(),
        gap: `${gap}px`,
        ...style,
    };

    return (
        <div className={className} style={columnStyle}>
            {children}
        </div>
    );
};

export const Expanded: React.FC<ExpandedProps> = ({
    children,
    flex = 1,
    className = "",
    style = {},
}) => {
    const expandedStyle: CSSProperties = {
        flex: flex,
        ...style,
        width: "100%",
        
        overflow: "auto",
    };

    return (
        <div className={className} style={expandedStyle}>
            {children}
        </div>
    );
};
