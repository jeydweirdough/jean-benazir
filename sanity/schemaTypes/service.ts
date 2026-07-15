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
      title: "Service Name",
      description: "e.g. \"Solar PV Design\" or \"Site Assessment & Audit\".",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      description: "1-2 sentences explaining what this service covers.",
      type: "text",
    }),

    defineField({
      name: "icon",
      title: "Card Icon",
      description: "The small picture shown on this service's card. Pick whichever one feels closest — it's purely decorative, so there's no wrong answer. Choose \"General / Other\" if nothing quite fits.",
      type: "string",
      initialValue: "general",
      options: {
        list: [
          { title: "🔆 Solar array — solar panel / PV design work", value: "solar-array" },
          { title: "🔀 Wiring diagram — electrical planning / schematics", value: "sld" },
          { title: "📋 Clipboard — audits, inspections, assessments", value: "audit" },
          { title: "📄 Document — policy, compliance, paperwork-related", value: "policy" },
          { title: "🛠️ Wrench — hands-on / supervision / general services", value: "tools" },
          { title: "💼 General / Other — anything that doesn't fit above", value: "general" },
        ],
      },
    }),

    orderRankField({ type: "service" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
