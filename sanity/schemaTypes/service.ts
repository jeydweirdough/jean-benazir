import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "service",
  title: "Services",
  type: "document",
  icon: () => createElement(Icon, { symbol: "wrench" }),

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon key used to render the service icon (e.g. solar-array, sld, audit, policy, tools)",
      options: {
        list: ["solar-array", "sld", "audit", "policy", "tools"],
      },
    }),

    orderRankField({ type: "service" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
