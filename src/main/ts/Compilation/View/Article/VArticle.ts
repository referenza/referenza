import {View} from "../View";
import {VArticleNavigator} from "./VArticleNavigator";
import {VArticleFooter} from "./VArticleFooter";
import {VArticleHeader} from "./VArticleHeader";

export interface VArticleProps {
  header: VArticleHeader;
  footer: VArticleFooter;
}

export abstract class VArticle extends View {
  protected constructor () {
    super();
  }
}
