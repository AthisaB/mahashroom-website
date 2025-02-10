import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {productType} from './productType'
import {recipeType} from './recipeType'
import {researchArticleType} from './researchArticleType'
import {seoObject} from './seoObject'
export const schema = {
  types: [
    seoObject,
    blockContentType,
    categoryType,
    postType,
    productType,
    recipeType,
    researchArticleType,
  ],
}
