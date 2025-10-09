import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: TrolleyIcon,

  fields: [
    defineField({
      name: 'itemNumber',
      title: 'Item Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
    }),

    // 🍧 FLAVORS ARRAY
    defineField({
      name: 'flavors',
      title: 'Flavors',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'flavor',
          title: 'Flavor',
          fields: [
            defineField({
              name: 'name',
              title: 'Flavor Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Flavor Image',
              type: 'image',
              options: { hotspot: true },
            }),

            // 🍧 Variants inside flavor
            defineField({
              name: 'variants',
              title: 'Variants',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'variant',
                  title: 'Variant',
                  fields: [
                    defineField({
                      name: 'size',
                      title: 'Size',
                      type: 'string',
                      options: {
                        list: ['Small', 'Medium', 'Large', 'Extra Large'],
                        layout: 'dropdown',
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'price',
                      title: 'Price',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(0),
                    }),
                    defineField({
                      name: 'stock',
                      title: 'Stock',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(0),
                    }),
                  ],
                }),
              ],
              validation: (Rule) =>
                Rule.min(1).error(
                  'Each flavor must have at least one variant.'
                ),
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.min(1).error('You must add at least one flavor.'),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      itemNumber: 'itemNumber',
    },
    prepare({ title, media, itemNumber }) {
      return {
        title: `${title} (${itemNumber})`,
        subtitle: 'Product with Flavors and Variants',
        media,
      };
    },
  },
});
