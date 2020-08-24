export default function() {
  return [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Users Actions",
      to: "/users",
      htmlBefore: '<i class="material-icons">perm_identity</i>',
      htmlAfter: ""
    },
    {
      title: "BackLogs",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/backlogs"
    },
    ,
    {
      title: "Features",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/features"
    },
    ,
    {
      title: "Issues",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/issues"
    },
    // {
    //   title: "Add New Post",
    //   htmlBefore: '<i class="material-icons">note_add</i>',
    //   to: "/add-new-post"
    // },
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview"
    // },
    // // {
    //   title: "Users",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables"
    // },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite"
    }
    // {
    //   title: "Errors",
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: "/errors"
    // }
  ];
}
