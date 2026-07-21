# Jean Benazir Teopebuaya — Portfolio Website

A personal portfolio website for **Ms. Jean Benazir Teopebuaya**, showcasing professional experience, solar and electrical engineering projects, services, education, achievements, and training background.

**Live site:** https://jeanbenazirteopebuaya.vercel.app/

## About This Site

This site presents Jean's professional profile as a solar and electrical engineer, including:

- **Hero Introduction** — name, title, and a quick call-to-action to view projects
- **Career Snapshot / Stats** — key numbers at a glance
- **Professional Journey** — a timeline of career milestones and roles
- **Project Logbook** — a filterable showcase of solar and electrical engineering projects, with details like location, client, capacity/yield, inverter rating, design drawings, and standards/codes followed
- **Services** — the engineering services offered
- **Tools** — the tools and software used in day-to-day work
- **Education** — academic background
- **Achievements** — awards and recognitions
- **Trainings & Seminars** — professional development history
- **Contact** — a way for visitors to get in touch

## Managing Content

All of the content shown on the site (profile info, projects, services, tools, education, trainings, etc.) is managed through a built-in content editor rather than by editing code directly.

- The content editor is available at **`/admin`** on the deployed site.
- Updates made there (adding a new project, editing a bio, uploading a new photo, etc.) will reflect on the live site without needing a code change or a new deployment.

This means day-to-day updates — new projects, updated achievements, fresh photos — can be made directly by the client without developer involvement.

## Project Structure (High Level)

```
public/          → images and static assets used across the site
src/pages/       → the main portfolio page
src/components/  → shared UI pieces (navbar, footer, etc.)
src/admin/       → the content editor (accessible at /admin)
sanity/          → content structure definitions used by the editor
scripts/         → one-time script used to seed initial content
```

## Running the Project Locally

For developers who need to run this project on their own machine:

```bash
npm install
npm run dev
```

This starts a local development server. Open the URL shown in the terminal to view the site.

To build a production-ready version of the site:

```bash
npm run build
```

## Deployment

The site is deployed and hosted on **Vercel**, and updates to the codebase are automatically published when changes are pushed.

## Ownership

This project was developed as a custom portfolio site for the client, **Jean Benazir Teopebuaya**.

## License

This project is proprietary. All rights reserved — no copying, reuse, or distribution is permitted without written permission. See [LICENSE](./LICENSE) for details.
