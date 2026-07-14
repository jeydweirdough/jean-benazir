import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: () => createElement(Icon, { symbol: "case" }),

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Rooftop Solar", value: "rooftop" },
          { title: "Ground Mounted", value: "ground" },
          { title: "MEPF & Cabling", value: "planning" },
        ],
      },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),

    defineField({
      name: "scope",
      title: "Scope of Work",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "inverterRating",
      title: "Inverter Rating",
      type: "string",
    }),

    defineField({
      name: "designDrawings",
      title: "Design Drawings",
      type: "string",
    }),

    defineField({
      name: "capacityYield",
      title: "Capacity / Yield",
      type: "string",
    }),

    defineField({
      name: "standardsCode",
      title: "Standards / Code",
      type: "string",
    }),

    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),

    defineField({
      name: "result",
      title: "Result",
      type: "text",
    }),

    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),

    defineField({
      name: "liveDemo",
      title: "Live Demo",
      type: "url",
    }),

    orderRankField({ type: "project" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
