import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

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

    orderRankField({ type: "training" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "title", subtitle: "organizer" },
  },
});
