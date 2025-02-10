import {DocumentTextIcon} from '@sanity/icons'
import {defineType, defineField, defineArrayMember} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
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
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    // Add categories if you like:
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    // Remove publishedAt if you don't need it
    // defineField({
    //   name: 'publishedAt',
    //   type: 'datetime',
    //   title: 'Published At',
    // }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
    // SEO fields
    defineField({
      name: 'seo',
      type: 'seo', // from seoObject.js
      title: 'SEO Fields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
