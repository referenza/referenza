export declare type TextOrHTML = string | HTMLValue;
export declare function prepareTextOrHTML(content: TextOrHTML): string;
export interface HTMLValue {
    HTML: string;
}
