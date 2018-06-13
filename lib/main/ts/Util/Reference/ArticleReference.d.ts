import { CategoryReference } from "./CategoryReference";
export interface ArticleReference extends CategoryReference {
    article: string;
}
