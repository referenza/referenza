import {MArticle} from "../MArticle";
import {MArticleType} from "../MArticle";
import {MReferenceArticleSignature} from "./MReferenceArticleSignature";
import {MReferenceArticleParameter} from "./MReferenceArticleParameter";
import {MReferenceArticleReturn} from "./MReferenceArticleReturn";

export class MReferenceArticle extends MArticle {
  description: string;
  signatures: Array<MReferenceArticleSignature> = [];
  parameters: Array<MReferenceArticleParameter> = [];
  returns: Array<MReferenceArticleReturn> = [];

  constructor (name: string, category: string, description: string) {
    super(MArticleType.ARTICLE_TYPE_REFERENCE, name, category);
    this.description = description;
  }

  addSignature (signature: MReferenceArticleSignature): void {
    this.signatures.push(signature);
  }

  addParameter (parameter: MReferenceArticleParameter): void {
    this.parameters.push(parameter);
  }

  addReturn (ret: MReferenceArticleReturn): void {
    this.returns.push(ret);
  }
}
