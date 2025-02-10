import {defineType, defineField, defineArrayMember} from 'sanity'

export const seoObject = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'titleTag',
      type: 'string',
      title: 'Title Tag',
      description: 'Recommended length: ~60 characters',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'Recommended length: ~160 characters',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [
        defineArrayMember({ type: 'string' }),
      ],
      description: 'Add relevant keywords to improve SEO',
    }),
    defineField({
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
