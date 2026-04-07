# UOA Volleyball Club Website

## About

A centralized website for the University of Auckland Volleyball Club (UOAVC). The platform will handle event and social session sign-ups, member accounts, waitlists, and an admin dashboard for club executives to manage events and registrations.

## Setting Up the Project

### Prerequisites

- Node.js 22+
- pnpm
- MongoDB running locally (or a remote connection URI)

### Running the Project

Clone the repository:

```bash
git clone https://github.com/UoaWDCC/uoavc.git
cd uoavc
```

Install dependencies:

```bash
corepack enable
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload CMS admin panel.

### Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

After doing this you can edit each variable in the `.env` file with the appropriate values.

### Scripts

| Script                 | Description                  |
| ---------------------- | ---------------------------- |
| `pnpm dev`             | Start the development server |
| `pnpm build`           | Build for production         |
| `pnpm start`           | Start the production server  |
| `pnpm lint`            | Run Biome linter             |
| `pnpm lint:fix`        | Auto-fix linting issues      |
| `pnpm lint:fix:unsafe` | Auto-fix with unsafe fixes   |
| `pnpm typegen`         | Generate Payload CMS types   |

### Keeping a Clean Codebase

We use [Biome](https://biomejs.dev/) for linting and formatting. [Lefthook](https://github.com/evilmartians/lefthook) is set up to run pre-commit hooks that automatically check your code before committing. CI will also run Biome checks to ensure code quality.

To manually run Biome:

```bash
pnpm lint          # Check linting
pnpm lint:fix      # Auto-fix issues
```

### IDE Setup

#### VS Code (Recommended)

If you are using `VSCode`, extensions will be recommended to you (namely Biome's extension). You can open the extensions sidebar and install the recommended extensions. VSCode files have already been set up as part of the repository and will assist with Biome formatting.

Otherwise, you are responsible for figuring out how to configure those plugins for yourself. We encourage you to contribute any configuration files back to the repository to help others.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/              # Public website pages
│   │   ├── layout.tsx           # Main layout
│   │   └── page.tsx             # Homepage
│   ├── (payload)/               # Payload CMS admin
│   │   ├── admin/               # Admin panel
│   │   ├── api/                 # API routes
│   │   └── layout.tsx           # Admin layout
├── components/                  # Reusable components
├── lib/                         # Utility functions and helpers
├── payload/
│   ├── collections/             # Payload collections
│   └── payload-types.ts         # Generated types
├── payload.config.ts            # Payload CMS configuration
└── ...

public/                          # Static assets

package.json                     # Project metadata and scripts
next.config.mjs                  # Next.js configuration
tsconfig.json                    # TypeScript configuration
biome.json                       # Biome linter configuration
lefthook.yml                     # Git hooks configuration
```

## Tech Stack

- [Next.js](https://nextjs.org/) - Powers the frontend using the [App Router](https://nextjs.org/docs/app) architecture. You will need some understanding of [React](https://react.dev/learn) to work on this project.
- [Payload CMS](https://payloadcms.com/) - Our headless CMS that manages content and defines our data structure. Familiarise yourself with Payload's [local API](https://payloadcms.com/docs/local-api/overview).
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
- [MongoDB](https://www.mongodb.com/) - Our database, accessed through Payload's MongoDB adapter.
- [Biome](https://biomejs.dev/) - Fast formatter and linter.
- [Lefthook](https://github.com/evilmartians/lefthook) - Git hooks manager.

## Deployment

The app is deployed on [Fly.io](https://fly.io/) via Docker.

- **Region:** Sydney (`syd`)
- **Runtime:** Node.js 22, standalone Next.js output
- **Trigger:** Automatic on push to `main`, or manual via workflow dispatch

### CI/CD

GitHub Actions runs on every push to `main` and on pull requests:

1. **Lint** - Biome checks with error-on-warnings
2. **Build** - Full Next.js production build

Deployment to Fly.io triggers automatically after a successful push to `main`.

## Contributions

To contribute to this project please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## Project Team

| Name           | Role            |
| -------------- | --------------- |
| Aleck Shen     | Tech Lead       |
| Ashlee Shum    | Project Manager |
| Seolina Cho    | Designer        |
| William Huang  | Developer       |
| (Fill Ela)     | Developer       |
| Youdao Xing    | Developer       |
| Hajun Kim      | Developer       |
| (Fill Shimpei) | Developer       |
| Jason Lim      | Developer       |
| (Fill Hayden)  | Developer       |
