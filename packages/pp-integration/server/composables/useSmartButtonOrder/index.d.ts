export declare const useSmartButtonOrder: () => {
    createOrderSmartButton: (fundingSource: string) => Promise<string>;
    loading: import("@vue/composition-api").ComputedRef<any>;
    error: import("@vue/composition-api").ComputedRef<any>;
};
