import {defineType, defineField, defineArrayMember} from 'sanity'

export const researchArticleType = defineType({
  name: 'researchArticle',
  title: 'Research & Innovation Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    }),
    // Use blockContent for the article body
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
    // Remove publishedAt if you don’t need it
    // defineField({
    //   name: 'publishedAt',
    //   type: 'datetime',
    //   title: 'Published At',
    // }),

    // Add categories if you want
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    // SEO fields
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO Fields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
