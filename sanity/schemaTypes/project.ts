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
      title: "Project Name",
      type: "string",
    }),

    defineField({
      name: "category",
      title: "Category",
      description: "Which filter button this project appears under on the Projects page.",
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
      title: "Summary",
      description: "A short paragraph describing the project.",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Project Photo",
      description: "The main photo for this project's card. If left blank, a placeholder is shown instead.",
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
      title: "Your Role",
      description: "Your title/role on this specific project, e.g. \"Lead Design Engineer\".",
      type: "string",
    }),

    defineField({
      name: "scope",
      title: "Scope of Work (optional)",
      description: "A bullet list of what you did on this project. Click \"Add item\" for each bullet point.",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "inverterRating",
      title: "Inverter Rating",
      description: "Optional technical spec shown in the project details grid. Leave blank if not applicable.",
      type: "string",
    }),

    defineField({
      name: "designDrawings",
      title: "Design Drawings",
      description: "Optional list of drawing types produced, e.g. \"PV Layout, Cable Routing, SLD\". Leave blank if not applicable.",
      type: "string",
    }),

    defineField({
      name: "capacityYield",
      title: "Capacity / Yield",
      description: "Optional size/output spec, e.g. \"528kWp DC / 400kWac AC\". Leave blank if not applicable.",
      type: "string",
    }),

    defineField({
      name: "standardsCode",
      title: "Standards / Code",
      description: "Optional — which code or standard the project follows. Leave blank if not applicable.",
      type: "string",
    }),

    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),

    defineField({
      name: "result",
      title: "Outcome (optional)",
      description: "The end result or impact of the project, e.g. \"Reduced losses by 2.4%...\".",
      type: "text",
    }),

    orderRankField({ type: "project" }),
  ],

  orderings: [orderRankOrdering],

  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
