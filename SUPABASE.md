# 📦 Supabase Integration – BizzTrack11

This document describes how Supabase is integrated into the **BizzTrack11** project for authentication, user profiles, and database operations.

---

## 🔧 Supabase Setup

We use [Supabase](https://supabase.com/) as a backend-as-a-service for:

* 🔐 Authentication (email/password)
* 🧠 Database (PostgreSQL)
* 👥 User profile management
* 🔒 Row-Level Security (RLS) to protect data per user

### 📁 Environment Variables

Stored in `.env` or `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 🛠️ Supabase Client Setup

`lib/supabaseClient.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
```

---

## 👥 Authentication

Supabase handles user authentication with email and password.

Used in:

* `hooks/useAuth.ts`
* `Sidebar.tsx` (to show user name and avatar)
* Login/Logout flows

### Key Auth Functions

```ts
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
await supabase.auth.signOut();
const { data: { user } } = await supabase.auth.getUser();
```

---

## 🡩‍💼 User Profiles

We use a `profiles` table to store full names and other info beyond basic auth.

### 🔢 Table Structure (`profiles`)

| Column       | Type | Description              |
| ------------ | ---- | ------------------------ |
| `id`         | UUID | Matches `auth.users.id`  |
| `full_name`  | Text | User's full name         |
| `avatar_url` | Text | (Optional) profile image |
| `email`      | Text | Redundant for UI use     |

### 🚀 Fetch Logic

```ts
const { data: { user } } = await supabase.auth.getUser();

const { data: profile } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .single();
```

---

## 📦 Database Tables

Your app may use these tables, one per feature area:

* `invoices`
* `clients`
* `products`
* `services`
* `expenses`
* `profiles`

Each table is queried securely using Supabase’s client.

Example:

```ts
const { data, error } = await supabase
  .from("invoices")
  .select("*")
  .eq("user_id", user.id);
```

---

## 🔐 Row-Level Security (RLS)

All user-specific data is protected via Supabase Row-Level Security policies.

### ✅ Example Policy (Invoices)

```sql
CREATE POLICY "User can view own invoices"
ON invoices
FOR SELECT
USING (user_id = auth.uid());
```

Repeat for `clients`, `products`, etc., with `user_id = auth.uid()` logic.

---

## 🧪 Folder Structure Overview

```bash
/lib
  supabaseClient.ts     # Supabase client setup

/hooks
  useAuth.ts            # Handles auth logic

/components
  Sidebar.tsx           # Displays user info and logout
```

---

## 🧬 Resources

* [Supabase Documentation](https://supabase.com/docs)
* [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
* [Row-Level Security](https://supabase.com/docs/learn/auth-deep-dive/auth-row-level-security)

```
```
