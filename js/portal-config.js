/*
  Mini Golf Operations Portal - Build 1.4
  -------------------------------------
  All Google Sheets destinations are centralized here.

  Each Schedule Profile link includes the exact Google Sheets tab name in `tab`.
  When you are ready, add the full destination URL to the matching `url` value.

  Leave url: "" to show a destination as "Not configured" instead of a broken link.
*/

window.PORTAL_CONFIG = {
  dashboards: {
    prod: "https://davynova28.github.io/mini-golf-signage/dashboard-v3.html?version=117.3",
    dev: "https://davynova28.github.io/mini-golf-signage-dev/dashboard-v3.html?version=117.3"
  },

  quickLinks: [
    { id: "operationsSheet", icon: "📗", label: "Operations Google Sheet", detail: "Shared operational workbook", url: "" },
    { id: "audit", icon: "🧾", label: "Audit Logs", detail: "System activity history", url: "" },
    { id: "backups", icon: "💾", label: "Backup History", detail: "Schedule backups", url: "" }
  ],

  profiles: [
    {
      id: "regular",
      icon: "📅",
      title: "Regular Profile",
      description: "Normal weekly operating schedules grouped by screen.",
      groups: [
        {
          title: "Arcade",
          links: [
            { label: "Closed", tab: "ArcadeRegularClosed", url: "" },
            { label: "Wednesday", tab: "ArcadeRegularWed", url: "" },
            { label: "Thursday / Friday", tab: "ArcadeRegularThuFri", url: "" },
            { label: "Saturday", tab: "ArcadeRegularSat", url: "" },
            { label: "Sunday", tab: "ArcadeRegularSun", url: "" }
          ]
        },
        {
          title: "Golf",
          links: [
            { label: "Closed", tab: "GolfRegularClosed", url: "" },
            { label: "Wednesday", tab: "GolfRegularWed", url: "" },
            { label: "Thursday / Friday", tab: "GolfRegularThuFri", url: "" },
            { label: "Saturday", tab: "GolfRegularSat", url: "" },
            { label: "Sunday", tab: "GolfRegularSun", url: "" }
          ]
        },
        {
          title: "Slush",
          links: [
            { label: "Closed", tab: "SlushRegularClosed", url: "" },
            { label: "Wednesday", tab: "SlushRegularWed", url: "" },
            { label: "Thursday / Friday", tab: "SlushRegularThuFri", url: "" },
            { label: "Saturday", tab: "SlushRegularSat", url: "" },
            { label: "Sunday", tab: "SlushRegularSun", url: "" }
          ]
        },
        {
          title: "Info Arcade",
          links: [
            { label: "Closed", tab: "infoArcadeRegularClosed", url: "" },
            { label: "Wednesday", tab: "infoArcadeRegularWed", url: "" },
            { label: "Thursday / Friday", tab: "infoArcadeRegularThuFri", url: "" },
            { label: "Saturday", tab: "infoArcadeRegularSat", url: "" },
            { label: "Sunday", tab: "infoArcadeRegularSun", url: "" }
          ]
        }
      ]
    },
    {
      id: "summer",
      icon: "☀️",
      title: "Summer Profile",
      description: "Summer schedule source tabs grouped by screen.",
      groups: [
        {
          title: "Arcade",
          links: [
            { label: "Monday - Thursday", tab: "ArcadeWeek", url: "" },
            { label: "Friday - Saturday", tab: "Arcade", url: "" },
            { label: "Sunday", tab: "ArcadeSunday", url: "" }
          ]
        },
        {
          title: "Golf",
          links: [
            { label: "Monday - Saturday", tab: "Golf", url: "" },
            { label: "Sunday", tab: "GolfSunday", url: "" }
          ]
        },
        {
          title: "Slush",
          links: [
            { label: "Monday - Saturday", tab: "Slush", url: "" },
            { label: "Sunday", tab: "SlushSunday", url: "" }
          ]
        },
        {
          title: "Info Arcade",
          links: [
            { label: "Monday - Saturday", tab: "infoArcade", url: "" },
            { label: "Sunday", tab: "infoArcadeSunday", url: "" }
          ]
        }
      ]
    },
    {
      id: "holiday",
      icon: "🎉",
      title: "Holiday Profile",
      description: "Reusable holiday schedule source tabs grouped by screen.",
      groups: [
        {
          title: "Golf",
          links: [
            { label: "Holiday", tab: "GolfHoliday", url: "" }
          ]
        },
        {
          title: "Arcade",
          links: [
            { label: "Holiday", tab: "ArcadeHoliday", url: "" }
          ]
        },
        {
          title: "Slush",
          links: [
            { label: "Holiday", tab: "SlushHoliday", url: "" }
          ]
        },
        {
          title: "Info Arcade",
          links: [
            { label: "Holiday", tab: "infoArcadeHoliday", url: "" }
          ]
        }
      ]
    },
    {
      id: "promo",
      icon: "🏷️",
      title: "Promo Profile",
      description: "Recurring promotional schedule source tabs.",
      groups: [
        {
          title: "Golf",
          links: [
            { label: "Wednesday", tab: "GolfPromoWednesday", url: "" }
          ]
        },
        {
          title: "Arcade",
          links: [
            { label: "Thursday", tab: "ArcadePromoThursday", url: "" }
          ]
        }
      ]
    }
  ]
};
