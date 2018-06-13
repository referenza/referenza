declare const _default: {
    options: ({
        alias: string;
        name: string;
        type: StringConstructor;
        typeLabel: string;
        description: string;
        multiple?: undefined;
        defaultOption?: undefined;
    } | {
        alias: string;
        name: string;
        type: StringConstructor;
        multiple: boolean;
        defaultOption: boolean;
        typeLabel: string;
        description: string;
    })[];
    action: (args: any) => Promise<void>;
    help: {
        header: string;
    }[];
};
export = _default;
