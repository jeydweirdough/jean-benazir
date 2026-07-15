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
      title: "Training / Seminar Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "organizer",
      title: "Organizer",
      description: "Who ran the training, e.g. \"Solar Philippines\".",
      type: "string",
    }),

    defineField({
      name: "date",
      title: "Date",
      description: "Written however you like, e.g. \"February 2024\" or \"Aug 2020 · Sep 2017\".",
      type: "string",
    }),

    orderRankField({ type: "training" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "title", subtitle: "organizer" },
  },
});
