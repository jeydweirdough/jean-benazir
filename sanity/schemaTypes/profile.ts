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
            title: "Full Name",
            description: "Shown as the big heading on the homepage, in the browser tab, and in the footer.",
            type: "string",
            group: "general",
        }),

        defineField({
            name: "designation",
            title: "Professional Title",
            description: "Your job title/headline under your name, e.g. \"Registered Electrical Engineer\".",
            type: "string",
            group: "general",
        }),

        defineField({
            name: "liscence",
            title: "License Number",
            description: "Shown in small print under your title, e.g. \"REE License No. 0084321\". Leave blank if not applicable.",
            type: "string",
            group: "general",
        }),

        defineField({
            name: "image",
            title: "Portrait Photo",
            description: "Your photo on the homepage. A photo with a transparent or plain background works best.",
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
            title: "Quick Stats",
            description: "The highlight numbers near the top of the homepage (e.g. years of experience, projects completed). Click \"Add item\" to add one, or drag items to reorder them.",
            type: "array",
            group: "stats",
            of: [
                {
                    type: "object",
                    name: "stat",
                    fields: [
                        defineField({ name: "value", title: "Number", description: "The big number, e.g. \"10+\" or \"2019\".", type: "string" }),
                        defineField({ name: "label", title: "Caption", description: "The small text underneath, e.g. \"Utility-Scale Projects\".", type: "string" }),
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
            description: "Your school(s) and degree(s). Add one entry per degree.",
            type: "array",
            group: "academics",
            of: [
                {
                    type: "object",
                    name: "academicEntry",
                    fields: [
                        defineField({ name: "degree", title: "Degree Name", type: "string" }),
                        defineField({ name: "institution", title: "School / Institution", type: "string" }),
                        defineField({ name: "year", title: "Year", description: "e.g. \"Graduated 2019\".", type: "string" }),
                        defineField({
                            name: "badge",
                            title: "Badge Text (optional)",
                            description: "A small highlight pill shown next to the year, e.g. \"REE — Board Passer 2019\". Leave blank to hide it.",
                            type: "string",
                        }),
                        defineField({
                            name: "image",
                            title: "Background Image (optional)",
                            description: "A photo shown behind this entry's text, e.g. a photo of the school.",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "displayType",
                            title: "Image Style",
                            description: "How the image above is displayed. \"Fill Background\" covers the whole card; \"Small on the Side\" shows it smaller to the right; \"No Image\" hides it. If you didn't upload an image, choose \"No Image\".",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Fill Background", value: "cover" },
                                    { title: "Small on the Side", value: "contain" },
                                    { title: "No Image", value: "none" },
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
            description: "Awards, scholarships, and recognitions. Add one entry per achievement.",
            type: "array",
            group: "achievements",
            of: [
                {
                    type: "object",
                    name: "achievementEntry",
                    fields: [
                        defineField({ name: "title", title: "Achievement Name", type: "string" }),
                        defineField({ name: "organization", title: "Awarded By", description: "Who gave you this award/recognition.", type: "string" }),
                        defineField({ name: "criteria", title: "Reason / Category", description: "Why you received it, e.g. \"Academic Excellence\".", type: "string" }),
                        defineField({
                            name: "badge",
                            title: "Badge Text (optional)",
                            description: "A small highlight pill shown on the card, e.g. \"Scholarship Grantee\". Leave blank to hide it.",
                            type: "string",
                        }),
                        defineField({
                            name: "image",
                            title: "Image / Logo (optional)",
                            description: "A photo or logo shown on this entry's card.",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "displayType",
                            title: "Image Style",
                            description: "How the image above is displayed. \"Fill Background\" covers the whole card; \"Small on the Side\" shows it smaller to the right; \"No Image\" hides it. If you didn't upload an image, choose \"No Image\".",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Fill Background", value: "cover" },
                                    { title: "Small on the Side", value: "contain" },
                                    { title: "No Image", value: "none" },
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
            title: "Email Address",
            description: "Shown in the Contact section and site footer, and used for the \"mailto\" link.",
            type: "string",
            group: "contact",
        }),

        defineField({
            name: "phone",
            title: "Phone Number",
            description: "Shown in the Contact section.",
            type: "string",
            group: "contact",
        }),

        defineField({
            name: "address",
            title: "Address / Location",
            description: "Shown in the Contact section and site footer.",
            type: "string",
            group: "contact",
        }),

        defineField({
            name: "socials",
            title: "Social Links",
            description: "Links to your social profiles, shown as small icon buttons. Click \"Add item\" for each one.",
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
                        defineField({ name: "url", title: "Profile Link", description: "The full web address, e.g. https://linkedin.com/in/yourname", type: "url" }),
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
            description: "People who can vouch for your work, shown in the Contact section. Click \"Add item\" for each person.",
            type: "array",
            group: "contact",
            of: [
                {
                    type: "object",
                    name: "professionalReference",
                    fields: [
                        defineField({ name: "name", title: "Full Name", type: "string" }),
                        defineField({ name: "role", title: "Their Job Title", type: "string" }),
                        defineField({ name: "organization", title: "Their Company", type: "string" }),
                        defineField({ name: "contact", title: "Their Phone Number", type: "string" }),
                    ],
                    preview: {
                        select: { title: "name", subtitle: "organization" },
                    },
                },
            ],
        }),
    ],
});
