# 📊 Instagram Unfollowers Tracker

<p align="justify">
  A modern web application built with **Next.js + TypeScript** to analyze your Instagram data and identify **unfollowers**.

This app works by uploading your Instagram data export (`followers.json` and `following.json`) provided by Meta, then comparing them to find accounts that **don’t follow you back**.

</p>

---

## 🚀 Tech Stack

- **Next.js**: 14.2.3 (App Router)
- **React**: ^18
- **TypeScript**: ^5
- **Tailwind CSS**
- **shadcn/ui (Radix UI)**
- **MDX** (for changelog/content)
- **Lucide React** (icons)
- **Framer Motion** (animations)

---

## 📦 Requirements

Make sure your environment has:

- **Node.js**: >= 18.x
- **npm**: >= 9.x

Check versions:

```bash
node -v
npm -v
```

---

## ⚙️ Installation

Clone this repository:

```bash
git clone https://github.com/bimamib/instagram-unfollow-trackers
cd instagram-unfollow-trackers
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Project

Start development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🏗️ Build & Production

Build the project:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

---

## 📁 Project Structure

```
app/
 ├── changelog/
 │    ├── content.mdx        # Changelog content (MDX)
 │    └── page.tsx           # Changelog page
 │
 ├── unfollowers/
 │    └── page.tsx           # Unfollowers result page
 │
 ├── layout.tsx              # Root layout
 ├── page.tsx                # Home page (upload JSON)
 ├── globals.css             # Global styles
 ├── robots.ts               # SEO robots config
 ├── sitemap.ts              # Sitemap generator
 │
 ├── favicon.ico
 └── ig-favicon.ico
```

```
components/
 ├── changelog/
 │    └── ReleaseCard.tsx    # Release / changelog card
 │
 ├── ui/                    # shadcn UI components
 │
 ├── file-upload.tsx        # JSON upload handler
 ├── home-client.tsx        # Home page logic (client side)
 ├── instructions-card.tsx  # How-to-use instructions
 ├── footer.tsx             # Footer component
 ├── theme-provider.tsx     # Theme provider
 ├── theme-toggle.tsx       # Dark/light toggle
 │
 ├── unfollowers-client.tsx # Unfollowers logic
 └── unfollowers-table.tsx  # Result table UI
```

```
hooks/
 └── (custom hooks)
```

---

## 🔍 Features

- 📂 Upload Instagram data:
  - `followers.json`
  - `following.json`

- 🔎 Detect:
  - ❌ Users who don’t follow you back
  - ✅ Mutual followers (can be extended)

- 📊 Interactive UI:
  - Clean table display
  - Responsive design
  - Smooth animations

- 🎨 Modern UI:
  - Built with **shadcn/ui**
  - Dark / light mode support

- 📄 Changelog system:
  - Powered by **MDX**
  - Auto-generated release metadata

---

## 📥 How to Get Instagram Data

1. Go to Instagram Settings
2. Navigate to **Accounts Center**
3. Select **Your Information**
4. Download your data (JSON format)
5. Extract:
   - `followers.json`
   - `following.json`

Upload both files into the app.

---

## 🧪 Scripts

Available scripts:

```bash
npm run dev            # Start development
npm run build          # Build production
npm run start          # Run production server
npm run lint           # Lint project

npm run release        # Create release (standard-version)
npm run release:patch
npm run release:minor
npm run release:major
```

---

## 🧹 Linting

```bash
npm run lint
```

---

## 📌 Notes

- Fully client-side processing (no data sent to server)
- Privacy-friendly — your Instagram data stays local
- Uses **JSON export from Meta** as data source
- Easy to extend (mutuals, ghost followers, etc.)

---

## 👨‍💻 Author

Developed by **Bima Prasetio**
