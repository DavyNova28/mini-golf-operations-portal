/*
  Mini Golf Operations Portal - Build 1
  -------------------------------------
  This is the only file you need to edit when a destination URL changes.
  Leave url: "" to show a destination as "Not configured" instead of a broken link.
*/

window.PORTAL_CONFIG = {
  dashboards: {
    prod: "https://davynova28.github.io/mini-golf-signage/dashboard-v3.html?version=117.3",
    dev: "https://davynova28.github.io/mini-golf-signage-dev/dashboard-v3.html?version=117.3"
  },

  quickLinks: [
    { id: "prodSheet", icon: "📗", label: "PROD Google Sheets", detail: "Operational workbook", url: "" },
    { id: "devSheet", icon: "📘", label: "DEV Google Sheets", detail: "Development workbook", url: "" },
    { id: "audit", icon: "🧾", label: "Audit Logs", detail: "System activity history", url: "" },
    { id: "backups", icon: "💾", label: "Backup History", detail: "Schedule backups", url: "" }
  ],

  profiles: [
    {
      id: "regular",
      icon: "📅",
      title: "Regular Profile",
      description: "Normal weekly operating schedules.",
      groups: [
        {
          title: "Regular schedule destinations",
          links: [
            { label: "Closed Schedule", detail: "Regular profile", url: "" },
            { label: "Wednesday", detail: "Regular profile", url: "" },
            { label: "Thursday / Friday", detail: "Regular profile", url: "" },
            { label: "Saturday", detail: "Regular profile", url: "" },
            { label: "Sunday", detail: "Regular profile", url: "" }
          ]
        }
      ]
    },
    {
      id: "summer",
      icon: "☀️",
      title: "Summer Profile",
      description: "Summer schedule source tabs.",
      groups: [
        {
          title: "Summer source tabs",
          links: [
            { label: "Arcade", detail: "Summer profile", url: "" },
            { label: "Golf", detail: "Summer profile", url: "" },
            { label: "Slush", detail: "Summer profile", url: "" },
            { label: "infoArcade", detail: "Summer profile", url: "" }
          ]
        }
      ]
    },
    {
      id: "holiday",
      icon: "🎉",
      title: "Holiday Schedule",
      description: "Date-specific exceptions and reusable holiday tabs.",
      groups: [
        {
          title: "Holiday Schedule Days",
          links: [
            { label: "Holiday Schedule Days", detail: "Special dates & closures", url: "" }
          ]
        },
        {
          title: "Reusable holiday source tabs",
          links: [
            { label: "ArcadeHoliday", detail: "Holiday source", url: "" },
            { label: "GolfHoliday", detail: "Holiday source", url: "" },
            { label: "SlushHoliday", detail: "Holiday source", url: "" },
            { label: "infoArcadeHoliday", detail: "Holiday source", url: "" }
          ]
        }
      ]
    },
    {
      id: "promo",
      icon: "🏷️",
      title: "Promo Schedule",
      description: "Recurring promotional schedule destinations.",
      groups: [
        {
          title: "Promo sources",
          links: [
            { label: "Promo Golf", detail: "Promotional schedule", url: "" },
            { label: "Promo Arcade", detail: "Promotional schedule", url: "" }
          ]
        }
      ]
    }
  ]
};
