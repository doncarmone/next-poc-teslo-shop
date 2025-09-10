# Descripcion

Teslo Shop - POC - NEXT.JS

# Correr en Dev

- Clonar el repo
- Crear copia local del archivo `.env.example`
- Crear un seed para la el auth `openssl rand -base64 32 | pbcopy`
- Instalar dependencias `npm i`
- Correr las migraciones de Prisma `npx prisma migrate dev`
- Correr el seed `npm run seed`
- Correr proyecto `npm run dev`
