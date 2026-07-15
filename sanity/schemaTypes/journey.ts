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
      title: "Job Title",
      description: "Your position at the time, e.g. \"Senior Solar Design Engineer\".",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "company",
      title: "Company / Organization",
      description: "Who you worked for. Leave blank for a personal milestone (like passing an exam) that isn't tied to an employer.",
      type: "string",
    }),

    defineField({
      name: "dateRange",
      title: "Dates",
      description: "Free text, written however you like — e.g. \"Nov 2025 – Present\" or \"2019 Milestone\".",
      type: "string",
    }),

    defineField({
      name: "body",
      title: "Summary",
      description: "A short paragraph describing what you did in this role.",
      type: "text",
    }),

    defineField({
      name: "scope",
      title: "Key Responsibilities (optional)",
      description: "A bullet list of specific tasks or achievements. Click \"Add item\" for each new bullet point. Fine to leave empty.",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "icon",
      title: "Marker Icon",
      description: "The small picture shown next to this entry on the timeline. Just pick whichever one feels closest — it's purely decorative, so there's no wrong answer. Choose \"General / Other\" if nothing quite fits.",
      type: "string",
      initialValue: "general",
      options: {
        list: [
          { title: "☀️ Sun — solar / renewable energy company", value: "sun" },
          { title: "🏛️ Government building — public sector / agency role", value: "government" },
          { title: "🔲 Solar panel grid — solar installation / design company", value: "solar-grid" },
          { title: "⛑️ Hard hat — construction / on-site engineering", value: "hardhat" },
          { title: "🏢 Office building — corporate / real estate developer", value: "building" },
          { title: "🔌 Cabling — electrical / structured cabling contractor", value: "cabling" },
          { title: "🏆 Award ribbon — certification, exam pass, or achievement", value: "award" },
          { title: "💼 General / Other — anything that doesn't fit above", value: "general" },
        ],
      },
    }),

    defineField({
      name: "milestone",
      title: "Highlight as Milestone?",
      description: "Turn this on to make the entry stand out in gold, for major career moments (like a license exam or promotion).",
      type: "boolean",
      initialValue: false,
    }),

    orderRankField({ type: "journeyEntry" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
