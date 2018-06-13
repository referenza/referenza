declare const _default: {
    options: ({
        alias: string;
        name: string;
        type: StringConstructor;
        typeLabel: string;
        description: string;
    } | {
        alias: string;
        name: string;
        type: NumberConstructor;
        typeLabel: string;
        description: string;
    })[];
    action: (args: any) => void;
    help: {
        header: string;
    }[];
};
export = _default;
