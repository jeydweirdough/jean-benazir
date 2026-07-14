import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "tool",
  title: "Tools",
  type: "document",
  icon: () => createElement(Icon, { symbol: "desktop" }),

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    orderRankField({ type: "tool" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "name", subtitle: "description", media: "logo" },
  },
});
