import { createElement } from "react";
import type { StructureResolver } from "sanity/structure";
import { Icon, type IconSymbol } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const SINGLETON_TYPES = ["profile"];

// Document types whose list order is managed by native drag-and-drop
// (via @sanity/orderable-document-list) instead of a manual number field.
const ORDERABLE_TYPES = ["journeyEntry", "project", "service", "tool", "training"];

const icon = (symbol: IconSymbol) => () => createElement(Icon, { symbol });

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Profile")
        .icon(icon("user"))
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),

      S.divider(),

      orderableDocumentListDeskItem({ type: "journeyEntry", title: "Journey", icon: icon("timeline"), S, context }),
      orderableDocumentListDeskItem({ type: "project", title: "Projects", icon: icon("case"), S, context }),
      orderableDocumentListDeskItem({ type: "service", title: "Services", icon: icon("wrench"), S, context }),
      orderableDocumentListDeskItem({ type: "tool", title: "Tools", icon: icon("desktop"), S, context }),
      orderableDocumentListDeskItem({ type: "training", title: "Trainings & Seminars", icon: icon("book"), S, context }),

      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() ?? "") && !ORDERABLE_TYPES.includes(item.getId() ?? "")
      ),
    ]);

export { SINGLETON_TYPES };
