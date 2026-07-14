import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "journeyEntry",
  title: "Journey",
  type: "document",
  icon: () => createElement(Icon, { symbol: "timeline" }),

  fields: [
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),

    defineField({
      name: "dateRange",
      title: "Date Range",
      type: "string",
      description: "e.g. \"Nov 2025 – Present\"",
    }),

    defineField({
      name: "body",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "scope",
      title: "Scope of Work",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon key used to render the milestone marker (e.g. sun, government, solar-grid, hardhat, building, cabling, award)",
      options: {
        list: [
          "sun",
          "government",
          "solar-grid",
          "hardhat",
          "building",
          "cabling",
          "award",
        ],
      },
    }),

    defineField({
      name: "milestone",
      title: "Milestone",
      type: "boolean",
      description: "Highlight this entry as a career milestone (gold styling)",
      initialValue: false,
    }),

    orderRankField({ type: "journeyEntry" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
