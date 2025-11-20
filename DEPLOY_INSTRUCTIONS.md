# Инструкция по деплою

## Найденные и исправленные ошибки:

### 1. Next.js 16 - Async Params
**Проблема:** В Next.js 16 параметры маршрута (`params`) стали асинхронными и должны быть await.
**Исправление:** Изменен тип `params` на `Promise<{ fid: string }>` и добавлен `await params` в `app/api/profile/[fid]/route.ts`.

### 2. Устаревший URL в манифесте
**Проблема:** Манифест использовал старый URL `v0-test-1deb.vercel.app`.
**Исправление:** Обновлены все URL на `test-fark22.vercel.app` в `app/api/manifest/route.ts`.

### 3. Конфликт редиректов
**Проблема:** В GitHub коде был `vercel.json` с редиректом на hosted manifest, который конфликтует с `next.config.mjs`.
**Решение:** Оставлен `vercel.json` для использования hosted manifest от Farcaster (рекомендуется).

### 4. Зависимости
**Проблема:** Старая версия `vaul` (0.9.9) несовместима с React 19, TypeScript не зафиксирован.
**Исправление:** Обновлен `vaul` до 1.1.1, TypeScript зафиксирован на 5.8.3.

## Шаги для деплоя:

1. **Скопируйте исправленные файлы в ваш GitHub репозиторий:**
   - `app/api/profile/[fid]/route.ts`
   - `app/api/manifest/route.ts`
   - `package.json`
   - `vercel.json` (уже существует на GitHub)

2. **Закоммитьте и запушьте изменения:**
   \`\`\`bash
   git add .
   git commit -m "Fix Next.js 16 async params and update URLs"
   git push origin main
   \`\`\`

3. **Vercel автоматически пересоберет проект**

4. **После успешного деплоя проверьте:**
   - Главная страница: https://test-fark22.vercel.app/
   - API профиля: https://test-fark22.vercel.app/api/profile/590993
   - Манифест: https://test-fark22.vercel.app/.well-known/farcaster.json

## Environment Variables (опционально):

Добавьте в Vercel:
- `NEYNAR_API_KEY` - для production (получите на https://dev.neynar.com)
- `NEXT_PUBLIC_APP_URL` - будет установлен автоматически

## Публикация в Farcaster App Store:

После успешного деплоя ваше приложение готово для публикации в Farcaster Mini App Store.
