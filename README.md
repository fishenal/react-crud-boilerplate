# React CRUD Boilerplate
This is a boilerplate(or template, or scaffold) design for a easy CRUD admin web system.It can help you quick start your project.

# Screenshot
[See screenshots](https://github.com/fishenal/react-crud-boilerplate/blob/main/screenshots/)

## Depend Techs
- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- MUI for UI component
- formik, dayjs, yup for Form
- Typescript
  
## Getting Started
```bash
yarn install
yarn run dev 
# same as npm, pnpm
```
Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

## Begin your works
- Main part in ```/src/app```, copy folder playerList for your own.
- playerList include some components(AddMoal, EditModal, etc.) used for the List, ```/api``` store require functions.
- Edit layout.tsx & page.tsx as Next.js way.
- ```/src/app/playerApi``` & ```/src/data``` used for backend CRUD demo, if you use third-party APIs, delete them.
- ```/src/common``` store common component used for this admin dashboard, extend or change them if you want.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Welcome leave issues