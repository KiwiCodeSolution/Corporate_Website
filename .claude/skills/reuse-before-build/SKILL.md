---
name: reuse-before-build
description: Before writing any new code for a task (especially a new section, page or component), audit what already exists — components in src/components (sections, ui, forms), hooks, utils, icons, design tokens in globals.css, translations — and reuse it. Only build something new after confirming nothing existing already covers it. Use at the start of every task that touches src/, before writing the first line of new code.
allowed-tools: Read, Grep, Glob, Bash
---

# Перевіряй наявне, перш ніж писати нове

**Правило:** на старті будь-якого завдання спочатку перевіряємо, що вже є в проєкті, і лише
після цього вирішуємо, чи справді потрібен новий код. Спільні компоненти не дублюються.

Типові зриви в цьому проєкті:
- ще одна модалка чи ще один хук блокування скролу — їх уже було три версії; є
  `src/components/ui/modal/*`, `src/components/ui/ModalOverlay.tsx`, `src/hooks/useScrollBlockV2.ts`;
- нова кнопка/посилання замість `src/components/ui/buttons/*` (`PillButton`, `IconButton`,
  `LoadMoreButton`) чи `src/components/ui/links/*` (`LearnMoreAnchorLink`, `NavLink`, `IconLink`);
- новий заголовок секції замість `src/components/Title.tsx`;
- нова іконка замість наявних у `src/assets/icons/icons.tsx`;
- `fetch('/locales/…json')` замість `useTranslations`/`getTranslations`;
- сирий hex з Figma замість токена з `src/styles/globals.css`.

## Що перевіряти на старті завдання

1. **Компоненти** — `src/components/sections` (секції сторінок), `src/components/ui`
   (кнопки, посилання, модалки, Portal, overlay), `src/components/forms` (`TextInput`,
   `CheckBox`), картки й каруселі в `src/components`.
2. **Хуки** — `src/hooks` (`useEscapeClose`, `usePopStateClose`, `useScrollBlockV2`,
   `useWindowWidth`).
3. **Утиліти й дані** — `src/utils` (`api.ts` — `getNews`/`getCase`, `helpers.ts`,
   `schemas/`), `src/data/*.json`, `src/configs/animationConfig.ts`.
4. **i18n** — `src/i18n/navigation.ts` (`Link`, `useRouter`, `usePathname`), ключі в
   `public/locales/ua.json` / `en.json` (grep по значенню, перш ніж додавати новий ключ).
5. **Токени** — `src/styles/globals.css` (`:root`, `.dark`, `@theme inline`): grep по
   **всьому** файлу на точне значення кольору/радіуса/тіні. Немає — спитати користувачку.

## Порядок дій

1. Grep/Glob по перелічених місцях за ключовими словами завдання.
2. Знайшлося — використати (за потреби розширити пропсом), а не писати аналог поруч.
3. Нічого підходящого — тільки тоді нове, і одразу в правильному місці (`ui/` для
   примітивів, `sections/` для секцій сторінки).
4. У поясненні користувачці прямо вказати, що перевірено і чому підійшло або ні.
