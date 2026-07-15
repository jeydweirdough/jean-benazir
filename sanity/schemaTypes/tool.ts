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
      title: "Tool / Software Name",
      description: "e.g. \"AutoCAD\" or \"PVSyst\".",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      description: "1-2 sentences explaining what this tool is used for.",
      type: "text",
    }),

    defineField({
      name: "logo",
      title: "Logo (optional)",
      description: "The tool's logo image. If left blank, a generic icon is shown instead — nothing breaks either way.",
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
