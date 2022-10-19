export declare const recursiveAnimationFrame: (frames: number, callback: () => void) => void;
export declare function setCssEndEvent(element: HTMLElement, type: "animation" | "transition", { tolerance, propertyName, }?: {
    tolerance?: number;
    propertyName?: string;
}): Promise<unknown>;
export declare function beforeCssLayout(callback: () => void): void;
export declare function beforeFutureCssLayout(frames: number, callback: () => void): void;
export declare function frameThrower(frames: number): Promise<unknown>;
export declare function onceNextCssLayout(): Promise<unknown>;
export declare function onceTransitionEnd(element: HTMLElement, options?: {}): Promise<unknown>;
export declare function onceAnimationEnd(element: HTMLElement, options?: {}): Promise<unknown>;
