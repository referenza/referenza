import {Article} from "./Article";
import {ArticleType} from "./ArticleType";
import {ReferenceArticleSignature} from "./ReferenceArticleSignature";
import {ReferenceArticleParameter} from "./ReferenceArticleParameter";
import {ReferenceArticleReturn} from "./ReferenceArticleReturn";

export class ReferenceArticle extends Article {
  description?: string | undefined = undefined;
  signatures: Array<ReferenceArticleSignature> = [];
  parameters: Array<ReferenceArticleParameter> = [];
  returns: Array<ReferenceArticleReturn> = [];

  constructor () {
    super(ArticleType.ARTICLE_TYPE_REFERENCE);
  }

  addSignature (signature: ReferenceArticleSignature): void {
    this.signatures.push(signature);
  }

  addParameter (parameter: ReferenceArticleParameter): void {
    this.parameters.push(parameter);
  }

  addReturn (ret: ReferenceArticleReturn): void {
    this.returns.push(ret);
  }
}
