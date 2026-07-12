import type { Image } from "sanity";

export interface Stat {
  value: string;
  label: string;
}

export interface AcademicEntry {
  _key: string;
  degree: string;
  institution: string;
  year: string;
  badge?: string;
  image?: Image;
  displayType: "cover" | "contain" | "none";
}

export interface AchievementEntry {
  _key: string;
  title: string;
  organization: string;
  criteria: string;
  badge?: string;
  image?: Image;
  displayType: "cover" | "contain" | "none";
}

export interface Social {
  platform: "linkedin" | "facebook" | "instagram" | "github" | "twitter" | "other";
  url: string;
}

export interface ProfessionalReference {
  name: string;
  role: string;
  organization: string;
  contact: string;
}

export interface Profile {
  name: string;
  designation: string;
  liscence: string;
  image?: Image;
  stats: Stat[];
  academicBackground: AcademicEntry[];
  achievements: AchievementEntry[];
  email: string;
  phone: string;
  address: string;
  socials: Social[];
  references: ProfessionalReference[];
}

export interface JourneyEntry {
  _id: string;
  role: string;
  company: string;
  dateRange: string;
  body: string;
  scope: string[];
  icon: "sun" | "government" | "solar-grid" | "hardhat" | "building" | "cabling" | "award";
  milestone: boolean;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  category: "rooftop" | "ground" | "planning";
  description: string;
  image?: Image;
  year: string;
  location: string;
  role: string;
  scope: string[];
  inverterRating: string;
  designDrawings: string;
  capacityYield: string;
  standardsCode: string;
  client: string;
  result: string;
  github?: string;
  liveDemo?: string;
  order: number;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: "solar-array" | "sld" | "audit" | "policy" | "tools";
  order: number;
}

export interface Tool {
  _id: string;
  name: string;
  description: string;
  logo?: Image;
  order: number;
}

export interface Training {
  _id: string;
  title: string;
  organizer: string;
  date: string;
  certificate?: Image;
  order: number;
}

export const PROFILE_QUERY = /* groq */ `*[_type == "profile"][0]{
  name,
  designation,
  liscence,
  image,
  stats,
  academicBackground,
  achievements,
  email,
  phone,
  address,
  socials,
  references
}`;

export const JOURNEY_QUERY = /* groq */ `*[_type == "journeyEntry"] | order(order asc){
  _id, role, company, dateRange, body, scope, icon, milestone, order
}`;

export const PROJECTS_QUERY = /* groq */ `*[_type == "project"] | order(order asc){
  _id, title, category, description, image, year, location, role, scope,
  inverterRating, designDrawings, capacityYield, standardsCode, client, result,
  github, liveDemo, order
}`;

export const SERVICES_QUERY = /* groq */ `*[_type == "service"] | order(order asc){
  _id, title, description, icon, order
}`;

export const TOOLS_QUERY = /* groq */ `*[_type == "tool"] | order(order asc){
  _id, name, description, logo, order
}`;

export const TRAININGS_QUERY = /* groq */ `*[_type == "training"] | order(order asc){
  _id, title, organizer, date, certificate, order
}`;

export interface PortfolioData {
  profile: Profile;
  journey: JourneyEntry[];
  projects: Project[];
  services: Service[];
  tools: Tool[];
  trainings: Training[];
}

export const PORTFOLIO_QUERY = /* groq */ `{
  "profile": ${PROFILE_QUERY},
  "journey": ${JOURNEY_QUERY},
  "projects": ${PROJECTS_QUERY},
  "services": ${SERVICES_QUERY},
  "tools": ${TOOLS_QUERY},
  "trainings": ${TRAININGS_QUERY}
}`;
