import { createElement } from "react";
import type { StructureResolver } from "sanity/structure";
import { Icon, type IconSymbol } from "@sanity/icons";

const SINGLETON_TYPES = ["profile"];

const icon = (symbol: IconSymbol) => () => createElement(Icon, { symbol });

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Profile")
        .icon(icon("user"))
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile")),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() ?? "")
      ),
    ]);

export { SINGLETON_TYPES };
