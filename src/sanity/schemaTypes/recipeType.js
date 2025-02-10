import {defineType, defineField, defineArrayMember} from 'sanity'

export const recipeType = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Recipe Title',
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
      name: 'ingredients',
      type: 'array',
      title: 'Ingredients',
      of: [defineArrayMember({ type: 'string' })],
    }),
    // Switch to blockContent for instructions
    defineField({
      name: 'instructions',
      type: 'blockContent',
      title: 'Instructions',
    }),
    // Relationship to products (if your recipes call for specific products)
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'product' }],
        }),
      ],
    }),
    // Let’s add categories if you want to group or filter recipes:
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Recipe Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
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
      media: 'image',
    },
  },
})
