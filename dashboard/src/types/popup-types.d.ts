import {ReactNode} from "react";

export interface PopupProps {
    placement: "right" | "left" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined,
    title?: string | ReactNode,
    action?: any,
    trigger?: any,
    content?: ReactNode,
    children: ReactNode,
}
