import {defineType, defineField, defineArrayMember} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Product Name',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
    }),
    // Switch description to blockContent for richer text
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Description',
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Product Image',
      options: {
        hotspot: true,
      },
    }),
    // If you want to group products by categories/tags
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    // SEO fields
    defineField({
      name: 'seo',
      type: 'seo', // from seoObject
      title: 'SEO Fields',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
