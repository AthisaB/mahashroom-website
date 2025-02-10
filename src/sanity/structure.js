export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // List out the document types you explicitly want:
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.documentTypeListItem('recipe').title('Recipes'),
      S.documentTypeListItem('researchArticle').title('Research & Innovation'),
      S.documentTypeListItem('product').title('Products'),
      S.divider(),

      // Filter out the items you’ve already listed
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'category',
            'recipe',
            'researchArticle',
            'product',
          ].includes(item.getId())
      ),
    ])
