import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";

export default defineType({
  name: "training",
  title: "Trainings & Seminars",
  type: "document",
  icon: () => createElement(Icon, { symbol: "book" }),

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "organizer",
      title: "Organizer",
      type: "string",
    }),

    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Freeform date/period, e.g. \"February 2024\" or \"Aug 2020 · Sep 2017\"",
    }),

    defineField({
      name: "certificate",
      title: "Certificate Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],

  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],

  preview: {
    select: { title: "title", subtitle: "organizer" },
  },
});
