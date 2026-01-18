export type CategoryId = "form-inputs" | "layout" | "data-display" | "feedback" | "navigation";
export interface PropInfo {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description: string;
}
export interface ExampleInfo {
    title: string;
    description?: string;
    code: string;
}
export interface ComponentInfo {
    id: string;
    name: string;
    description: string;
    category: CategoryId;
    importStatement: string;
    props: PropInfo[];
    subComponents?: string[];
    examples: ExampleInfo[];
    notes?: string[];
}
export declare const components: ComponentInfo[];
export declare function getComponentById(id: string): ComponentInfo | undefined;
export declare function getComponentsByCategory(categoryId: CategoryId): ComponentInfo[];
export declare function searchComponents(query: string): ComponentInfo[];
//# sourceMappingURL=components.d.ts.map