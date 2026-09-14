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
    dev: "https://davynova28.github.io/mini-golf-signage-dev/dashboard-v3.html?version=118"
  },

  quickLinks: [
    { id: "operationsSheet", icon: "📗", label: "Operations Google Sheet", detail: "Shared operational workbook", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1054965962#gid=1054965962" },
    { id: "audit", icon: "🧾", label: "Audit Logs", detail: "System activity history", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=844074778#gid=844074778" },
    { id: "backups", icon: "💾", label: "Backup History", detail: "Schedule backups", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1822898361#gid=1822898361" }
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
            { label: "Closed", tab: "ArcadeRegularClosed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1576431645#gid=1576431645" },
            { label: "Wednesday", tab: "ArcadeRegularWed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=193628438#gid=193628438" },
            { label: "Thursday / Friday", tab: "ArcadeRegularThuFri", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=584469926#gid=584469926" },
            { label: "Saturday", tab: "ArcadeRegularSat", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1827276194#gid=1827276194" },
            { label: "Sunday", tab: "ArcadeRegularSun", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=717565053#gid=717565053" }
          ]
        },
        {
          title: "Golf",
          links: [
            { label: "Closed", tab: "GolfRegularClosed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=311802604#gid=311802604" },
            { label: "Wednesday", tab: "GolfRegularWed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=644370409#gid=644370409" },
            { label: "Thursday / Friday", tab: "GolfRegularThuFri", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1253682426#gid=1253682426" },
            { label: "Saturday", tab: "GolfRegularSat", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1691160278#gid=1691160278" },
            { label: "Sunday", tab: "GolfRegularSun", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1544211730#gid=1544211730" }
          ]
        },
        {
          title: "Slush",
          links: [
            { label: "Closed", tab: "SlushRegularClosed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=2020440419#gid=2020440419" },
            { label: "Wednesday", tab: "SlushRegularWed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=159244622#gid=159244622" },
            { label: "Thursday / Friday", tab: "SlushRegularThuFri", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1264273938#gid=1264273938" },
            { label: "Saturday", tab: "SlushRegularSat", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=610417010#gid=610417010" },
            { label: "Sunday", tab: "SlushRegularSun", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1696350074#gid=1696350074" }
          ]
        },
        {
          title: "Info Arcade",
          links: [
            { label: "Closed", tab: "infoArcadeRegularClosed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=928245894#gid=928245894" },
            { label: "Wednesday", tab: "infoArcadeRegularWed", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=2147034885#gid=2147034885" },
            { label: "Thursday / Friday", tab: "infoArcadeRegularThuFri", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1637948919#gid=1637948919" },
            { label: "Saturday", tab: "infoArcadeRegularSat", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=670782306#gid=670782306" },
            { label: "Sunday", tab: "infoArcadeRegularSun", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1832228553#gid=1832228553" }
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
            { label: "Monday - Thursday", tab: "ArcadeWeek", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=658363605#gid=658363605" },
            { label: "Friday - Saturday", tab: "Arcade", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=0#gid=0" },
            { label: "Sunday", tab: "ArcadeSunday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=772696316#gid=772696316" }
          ]
        },
        {
          title: "Golf",
          links: [
            { label: "Monday - Saturday", tab: "Golf", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=523286119#gid=523286119" },
            { label: "Sunday", tab: "GolfSunday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=312186726#gid=312186726" }
          ]
        },
        {
          title: "Slush",
          links: [
            { label: "Monday - Saturday", tab: "Slush", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1337977680#gid=1337977680" },
            { label: "Sunday", tab: "SlushSunday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=2106383195#gid=2106383195" }
          ]
        },
        {
          title: "Info Arcade",
          links: [
            { label: "Monday - Saturday", tab: "infoArcade", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=881672756#gid=881672756" },
            { label: "Sunday", tab: "infoArcadeSunday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1183277175#gid=1183277175" }
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
            { label: "Holiday", tab: "GolfHoliday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=702289736#gid=702289736" }
          ]
        },
        {
          title: "Arcade",
          links: [
            { label: "Holiday", tab: "ArcadeHoliday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=415857844#gid=415857844" }
          ]
        },
        {
          title: "Slush",
          links: [
            { label: "Holiday", tab: "SlushHoliday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1436504138#gid=1436504138" }
          ]
        },
        {
          title: "Info Arcade",
          links: [
            { label: "Holiday", tab: "infoArcadeHoliday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=924083883#gid=924083883" }
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
            { label: "Wednesday", tab: "GolfPromoWednesday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=683280292#gid=683280292" }
          ]
        },
        {
          title: "Arcade",
          links: [
            { label: "Thursday", tab: "ArcadePromoThursday", url: "https://docs.google.com/spreadsheets/d/1VjA9_pBBv8mjwCZqnmso3KmIP3bRI3FrT02GeD2XVKo/edit?gid=1778411904#gid=1778411904" }
          ]
        }
      ]
    }
  ]
};
