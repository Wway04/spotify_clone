import PAGES from "../pages";

const publicRoutes = [
  { path: "/", component: PAGES.home, mainLayout: true },
  { path: "/search", component: PAGES.search, mainLayout: true },
  { path: "/audio", component: PAGES.audio, mainLayout: true },
  { path: "/login", component: PAGES.login, mainLayout: false },
  { path: "/register", component: PAGES.register, mainLayout: false },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
