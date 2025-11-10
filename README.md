# Public Accountability Platform (PAP) - Nepal

A civic tech platform built by Let's Build Nepal (LBN) and NewNepal.org to promote transparency and accountability in Nepali governance by documenting corruption cases and holding public entities accountable.

## Features Implemented

### Public-Facing Features
- **Landing Page** (`/`) - Hero section, statistics, featured cases, and mission statement
- **Cases Directory** (`/cases`) - Searchable and filterable list of all corruption cases
- **Case Details** (`/case/:id`) - Detailed view of individual cases with timeline, allegations, evidence, audit trail
- **Entity Profiles** (`/entity/:id`) - Individual profiles for politicians, bureaucrats, and organizations showing all related allegations
- **About Page** (`/about`) - Mission, values, partners, and platform information

### Contributor Features
- **Report Allegation** (`/report`) - Form for citizens to submit new allegations
  - Anonymous or named submissions
  - File upload support for evidence
  - Source documentation
  - Allegation categorization

### Entity Features
- **Entity Response** (`/entity-response/:id`) - Interface for entities to respond to allegations
  - Identity verification workflow
  - Side-by-side display with allegations
  - Supporting document upload

### Admin/Moderation Features
- **Moderation Dashboard** (`/moderation`) - Review and approve submissions
  - Pending submissions queue
  - Review workflow
  - Status management
  - Internal notes and verification

### Platform Features
- **Feedback System** (`/feedback`) - Platform improvement suggestions and bug reports
- **Bilingual Support** - Language toggle for English/Nepali (UI component ready)
- **Audit Trail** - Complete history of case modifications with timestamps and users
- **Responsive Design** - Mobile, tablet, and desktop optimized

## Design System

The platform uses a professional design system with semantic tokens:
- **Primary Colors**: Navy blue for trust and authority
- **Accent Colors**: Amber for warnings, emerald for success
- **Typography**: Clear hierarchy with proper contrast
- **Components**: Fully themed shadcn components

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/fd2bdb14-ea08-45f5-97f8-092e1643b481

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fd2bdb14-ea08-45f5-97f8-092e1643b481) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fd2bdb14-ea08-45f5-97f8-092e1643b481) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
