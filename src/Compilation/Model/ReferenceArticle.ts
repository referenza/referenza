import {Article} from "./Article";
import {Documentation} from "./Documentation";
import {ArticleType} from "./ArticleType";
import {ReferenceArticleSignature} from "./ReferenceArticleSignature";
import {ReferenceArticleParameter} from "./ReferenceArticleParameter";
import {ReferenceArticleReturn} from "./ReferenceArticleReturn";

export class ReferenceArticle extends Article {
  description?: string = undefined;
  signatures: Array<ReferenceArticleSignature> = [];
  parameters: Array<ReferenceArticleParameter> = [];
  returns: Array<ReferenceArticleReturn> = [];

  constructor(documentation: Documentation, category: string, name: string) {
    super(ArticleType.ARTICLE_TYPE_REFERENCE, documentation, category, name);
  }

  addSignature(signature: ReferenceArticleSignature) {
    this.signatures.push(signature);
  }

  addParameter(parameter: ReferenceArticleParameter) {
    this.parameters.push(parameter);
  }

  addReturn(ret: ReferenceArticleReturn) {
    this.returns.push(ret);
  }
}
