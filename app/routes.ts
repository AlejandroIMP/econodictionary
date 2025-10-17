import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/terms/layout.tsx", [
    route("terms", "routes/terms/terms.tsx"),
    route("terms/create", "routes/terms/create-term.tsx"),
    route("terms/:term", "routes/terms/term.tsx"),
    route("terms/:term/edit", "routes/terms/edit-term.tsx"),
    route("profile", "routes/profile/profile.tsx"),
  ]),
  layout("routes/about/layout.tsx", [
    route("about", "routes/about/about.tsx"),
    route("about/team", "routes/about/team.tsx"),
    route("about/contact", "routes/about/contact.tsx"),
    route("about/faq", "routes/about/faq.tsx"),
  ]),
  route("privacy", "routes/about/privacy.tsx"),
  route("terms-of-service", "routes/about/terms-of-service.tsx"),
  layout("routes/auth/layout.tsx", [
    route("auth/sign-in", "routes/auth/sign-in.tsx"),
    route("auth/sign-up", "routes/auth/sign-up.tsx"),
    route("auth/forgot-password", "routes/auth/forgot-password.tsx"),
    route("auth/reset-password", "routes/auth/reset-password.tsx"),
    route("auth/verify-email", "routes/auth/verify-email.tsx"),
    route("auth/sign-out", "routes/auth/sign-out.tsx"),
  ]),
  //  layout("routes/dashboard/layout.tsx", [
    //    index("routes/dashboard/home.tsx"),
    //    route("pendings-approvals", "routes/dashboard/pendings-approvals.tsx"),
    //    route("users", "routes/dashboard/users.tsx"),
    //    route("moderation-words", "routes/dashboard/moderation-words.tsx"),
    //  ]),
   route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
