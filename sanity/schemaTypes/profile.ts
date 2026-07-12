import { createElement } from "react";
import { defineField, defineType } from "sanity";
import { Icon } from "@sanity/icons";

export default defineType({
    name: "profile",
    title: "Profile",
    type: "document",
    icon: () => createElement(Icon, { symbol: "user" }),

    groups: [
        { name: "general", title: "General", default: true, icon: () => createElement(Icon, { symbol: "user" }) },
        { name: "stats", title: "Stats", icon: () => createElement(Icon, { symbol: "bar-chart" }) },
        { name: "academics", title: "Academic Background", icon: () => createElement(Icon, { symbol: "book" }) },
        { name: "achievements", title: "Achievements", icon: () => createElement(Icon, { symbol: "star" }) },
        { name: "contact", title: "Contact & Socials", icon: () => createElement(Icon, { symbol: "envelope" }) },
    ],

    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            group: "general",
        }),

        defineField({
            name: "designation",
            title: "Title",
            type: "string",
            group: "general",
        }),

        defineField({
            name: "liscence",
            title: "REE Liscence",
            type: "string",
            group: "general",
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "image",
            group: "general",
            options: {
                hotspot: true,
            },
        }),

        // ===================================================
        // STATS
        // ===================================================
        defineField({
            name: "stats",
            title: "Stats",
            type: "array",
            group: "stats",
            of: [
                {
                    type: "object",
                    name: "stat",
                    fields: [
                        defineField({ name: "value", title: "Value", type: "string" }),
                        defineField({ name: "label", title: "Label", type: "string" }),
                    ],
                    preview: {
                        select: { title: "value", subtitle: "label" },
                    },
                },
            ],
        }),

        // ===================================================
        // ACADEMIC BACKGROUND
        // ===================================================
        defineField({
            name: "academicBackground",
            title: "Academic Background",
            type: "array",
            group: "academics",
            of: [
                {
                    type: "object",
                    name: "academicEntry",
                    fields: [
                        defineField({ name: "degree", title: "Degree", type: "string" }),
                        defineField({ name: "institution", title: "Institution", type: "string" }),
                        defineField({ name: "year", title: "Year", type: "string" }),
                        defineField({ name: "badge", title: "Badge", type: "string" }),
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "displayType",
                            title: "Image Display Type",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Cover", value: "cover" },
                                    { title: "Contain", value: "contain" },
                                    { title: "None", value: "none" },
                                ],
                            },
                            initialValue: "none",
                        }),
                    ],
                    preview: {
                        select: { title: "degree", subtitle: "institution", media: "image" },
                    },
                },
            ],
        }),

        // ===================================================
        // ACHIEVEMENTS
        // ===================================================
        defineField({
            name: "achievements",
            title: "Achievements",
            type: "array",
            group: "achievements",
            of: [
                {
                    type: "object",
                    name: "achievementEntry",
                    fields: [
                        defineField({ name: "title", title: "Title", type: "string" }),
                        defineField({ name: "organization", title: "Organization", type: "string" }),
                        defineField({ name: "criteria", title: "Criteria", type: "string" }),
                        defineField({ name: "badge", title: "Badge", type: "string" }),
                        defineField({
                            name: "image",
                            title: "Image / Logo",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "displayType",
                            title: "Image Display Type",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Cover", value: "cover" },
                                    { title: "Contain", value: "contain" },
                                    { title: "None", value: "none" },
                                ],
                            },
                            initialValue: "none",
                        }),
                    ],
                    preview: {
                        select: { title: "title", subtitle: "organization", media: "image" },
                    },
                },
            ],
        }),

        // ===================================================
        // CONTACT & SOCIALS
        // ===================================================
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            group: "contact",
        }),

        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
            group: "contact",
        }),

        defineField({
            name: "address",
            title: "Address",
            type: "string",
            group: "contact",
        }),

        defineField({
            name: "socials",
            title: "Socials",
            type: "array",
            group: "contact",
            of: [
                {
                    type: "object",
                    name: "social",
                    fields: [
                        defineField({
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "LinkedIn", value: "linkedin" },
                                    { title: "Facebook", value: "facebook" },
                                    { title: "Instagram", value: "instagram" },
                                    { title: "GitHub", value: "github" },
                                    { title: "Twitter / X", value: "twitter" },
                                    { title: "Other", value: "other" },
                                ],
                            },
                        }),
                        defineField({ name: "url", title: "URL", type: "url" }),
                    ],
                    preview: {
                        select: { title: "platform", subtitle: "url" },
                    },
                },
            ],
        }),

        defineField({
            name: "references",
            title: "Professional References",
            type: "array",
            group: "contact",
            of: [
                {
                    type: "object",
                    name: "professionalReference",
                    fields: [
                        defineField({ name: "name", title: "Name", type: "string" }),
                        defineField({ name: "role", title: "Role", type: "string" }),
                        defineField({ name: "organization", title: "Organization", type: "string" }),
                        defineField({ name: "contact", title: "Contact Number", type: "string" }),
                    ],
                    preview: {
                        select: { title: "name", subtitle: "organization" },
                    },
                },
            ],
        }),
    ],
});
