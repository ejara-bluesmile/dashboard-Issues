import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import Login from "./views/Login";
import Users from "./views/Users";
import Register from "./views/Register";
import UserForm from "./views/UserForm";
import BlogOverview from "./views/BlogOverview";
import UserProfile from "./views/UserProfile";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";

import Logout from "./components/logout";

import BackLog from "./views/BackLog";
import BackLogForm from "./views/BackLogForm";
import FeaturesForm from "./views/FeaturesForm";
import IssuesForm from "./views/IssuesForm";
import Issues from "./views/Issues";
import Features from "./views/Features";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    exact: true,
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/users",
    exact: true,
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/users/:id",
    exact: true,
    layout: DefaultLayout,
    component: UserForm
  },
  {
    path: "/register",
    exact: true,
    layout: LoginLayout,
    component: Register
  },
  {
    path: "/logout",
    exact: true,
    layout: LoginLayout,
    component: Logout
  },
  {
    path: "/userprofile",
    exact: true,
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  // {
  //   path: "/add-new-post",
  //   layout: DefaultLayout,
  //   component: AddNewPost
  // },
  // {
  //   path: "/errors",
  //   layout: DefaultLayout,
  //   component: Errors
  // },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: ComponentsOverview
  // },
  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: Tables
  // },
  // {
  //   path: "/blog-posts",
  //   layout: DefaultLayout,
  //   component: BlogPosts
  // },
  {
    path: "/backLogs",
    exact: true,
    layout: DefaultLayout,
    component: BackLog
  },
  {
    path: "/backlogs/:id",
    exact: true,
    layout: DefaultLayout,
    component: BackLogForm
  },
  {
    path: "/features",
    exact: true,
    layout: DefaultLayout,
    component: Features
  },
  {
    path: "/featuresForm/:id",
    exact: true,
    layout: DefaultLayout,
    component: FeaturesForm
  },
  {
    path: "/issuesForm/:id",
    exact: true,
    layout: DefaultLayout,
    component: IssuesForm
  },
  {
    path: "/issues",
    exact: true,
    layout: DefaultLayout,
    component: Issues
  }
];
