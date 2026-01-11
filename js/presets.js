/*
 * popular subscription presets
 * prices are US monthly rates as of late 2024
 * these will definitely go out of date but gives users a starting point
 */
const presets = [

  // streaming services - everyone has like 5 of these now
  { name: "Netflix", domain: "netflix.com", price: 17.99, cycle: "Monthly", color: "rose", category: "Streaming", popular: true },
  { name: "Disney+", domain: "disneyplus.com", price: 15.99, cycle: "Monthly", color: "blue", category: "Streaming", popular: true },
  { name: "Max", domain: "max.com", price: 18.49, cycle: "Monthly", color: "purple", category: "Streaming" }, // was HBO Max
  { name: "Hulu", domain: "hulu.com", price: 9.99, cycle: "Monthly", color: "green", category: "Streaming" },
  { name: "Apple TV+", domain: "tv.apple.com", price: 9.99, cycle: "Monthly", color: "slate", category: "Streaming" },
  { name: "Paramount+", domain: "paramountplus.com", price: 7.99, cycle: "Monthly", color: "blue", category: "Streaming" },
  { name: "Peacock", domain: "peacocktv.com", price: 7.99, cycle: "Monthly", color: "purple", category: "Streaming" },
  { name: "Amazon Prime", domain: "amazon.com", price: 14.99, cycle: "Monthly", color: "orange", category: "Streaming", popular: true },
  { name: "Crunchyroll", domain: "crunchyroll.com", price: 7.99, cycle: "Monthly", color: "orange", category: "Streaming" },

  // music
  { name: "Spotify", domain: "spotify.com", price: 11.99, cycle: "Monthly", color: "green", category: "Music", popular: true },
  { name: "Apple Music", domain: "music.apple.com", price: 10.99, cycle: "Monthly", color: "pink", category: "Music" },
  { name: "YouTube Premium", domain: "youtube.com", price: 13.99, cycle: "Monthly", color: "rose", category: "Music", popular: true },
  { name: "Audible", domain: "audible.com", price: 14.95, cycle: "Monthly", color: "orange", category: "Music" },

  // gaming subscriptions
  { name: "Xbox Game Pass", domain: "xbox.com", price: 19.99, cycle: "Monthly", color: "green", category: "Gaming" },
  { name: "PlayStation Plus", domain: "playstation.com", price: 14.99, cycle: "Monthly", color: "blue", category: "Gaming" },
  { name: "Nintendo Switch Online", domain: "nintendo.com", price: 3.99, cycle: "Monthly", color: "rose", category: "Gaming" },
  { name: "EA Play", domain: "ea.com", price: 5.99, cycle: "Monthly", color: "blue", category: "Gaming" },

  // ai tools - these are getting expensive
  { name: "ChatGPT Plus", domain: "openai.com", price: 20, cycle: "Monthly", color: "teal", category: "AI", popular: true },
  { name: "Claude Pro", domain: "claude.ai", price: 20, cycle: "Monthly", color: "orange", category: "AI" },
  { name: "Midjourney", domain: "midjourney.com", price: 10, cycle: "Monthly", color: "indigo", category: "AI" },
  { name: "GitHub Copilot", domain: "github.com", price: 10, cycle: "Monthly", color: "slate", category: "AI" },

  // productivity
  { name: "Microsoft 365", domain: "microsoft.com", price: 9.99, cycle: "Monthly", color: "blue", category: "Productivity" },
  { name: "Notion", domain: "notion.so", price: 12, cycle: "Monthly", color: "slate", category: "Productivity" },
  { name: "Slack", domain: "slack.com", price: 8.75, cycle: "Monthly", color: "purple", category: "Productivity" },
  { name: "Linear", domain: "linear.app", price: 10, cycle: "Monthly", color: "indigo", category: "Productivity" },
  { name: "Canva Pro", domain: "canva.com", price: 15, cycle: "Monthly", color: "cyan", category: "Productivity" },
  { name: "Figma", domain: "figma.com", price: 15, cycle: "Monthly", color: "purple", category: "Productivity" },
  { name: "Adobe Creative Cloud", domain: "adobe.com", price: 59.99, cycle: "Monthly", color: "rose", category: "Productivity" }, // ouch

  // cloud storage
  { name: "iCloud+", domain: "icloud.com", price: 2.99, cycle: "Monthly", color: "blue", category: "Cloud" },
  { name: "Google One", domain: "one.google.com", price: 2.99, cycle: "Monthly", color: "cyan", category: "Cloud" },
  { name: "Dropbox", domain: "dropbox.com", price: 11.99, cycle: "Monthly", color: "blue", category: "Cloud" },

  // vpn / security
  { name: "NordVPN", domain: "nordvpn.com", price: 12.99, cycle: "Monthly", color: "indigo", category: "Security" },
  { name: "ExpressVPN", domain: "expressvpn.com", price: 12.95, cycle: "Monthly", color: "rose", category: "Security" },
  { name: "1Password", domain: "1password.com", price: 2.99, cycle: "Monthly", color: "blue", category: "Security" },

  // fitness
  { name: "Peloton", domain: "onepeloton.com", price: 12.99, cycle: "Monthly", color: "rose", category: "Fitness" },
  { name: "Apple Fitness+", domain: "fitness.apple.com", price: 9.99, cycle: "Monthly", color: "pink", category: "Fitness" },
  { name: "Strava", domain: "strava.com", price: 11.99, cycle: "Monthly", color: "orange", category: "Fitness" },

  // news / reading
  { name: "The Athletic", domain: "theathletic.com", price: 9.99, cycle: "Monthly", color: "slate", category: "News" },
  { name: "Kindle Unlimited", domain: "amazon.com/kindle", price: 11.99, cycle: "Monthly", color: "orange", category: "News" },
  { name: "Medium", domain: "medium.com", price: 5, cycle: "Monthly", color: "slate", category: "News" },

  // learning platforms
  { name: "Duolingo", domain: "duolingo.com", price: 12.99, cycle: "Monthly", color: "green", category: "Learning" },
  { name: "Skillshare", domain: "skillshare.com", price: 13.99, cycle: "Monthly", color: "teal", category: "Learning" },
  { name: "Coursera Plus", domain: "coursera.org", price: 59, cycle: "Monthly", color: "blue", category: "Learning" },
  { name: "Udemy", domain: "udemy.com", price: 19.99, cycle: "Monthly", color: "purple", category: "Learning" },
  { name: "LinkedIn Learning", domain: "linkedin.com", price: 39.99, cycle: "Monthly", color: "blue", category: "Learning" },
  { name: "Masterclass", domain: "masterclass.com", price: 15, cycle: "Monthly", color: "rose", category: "Learning" },

  // more streaming
  { name: "Tidal", domain: "tidal.com", price: 10.99, cycle: "Monthly", color: "slate", category: "Music" },
  { name: "Deezer", domain: "deezer.com", price: 10.99, cycle: "Monthly", color: "pink", category: "Music" },
  { name: "SoundCloud Go+", domain: "soundcloud.com", price: 9.99, cycle: "Monthly", color: "orange", category: "Music" },
  { name: "Pandora", domain: "pandora.com", price: 10.99, cycle: "Monthly", color: "blue", category: "Music" },
  { name: "YouTube Music", domain: "music.youtube.com", price: 10.99, cycle: "Monthly", color: "rose", category: "Music", popular: true },
  { name: "Showtime", domain: "showtime.com", price: 10.99, cycle: "Monthly", color: "rose", category: "Streaming" },
  { name: "Starz", domain: "starz.com", price: 9.99, cycle: "Monthly", color: "slate", category: "Streaming" },
  { name: "Discovery+", domain: "discoveryplus.com", price: 6.99, cycle: "Monthly", color: "blue", category: "Streaming" },
  { name: "ESPN+", domain: "espn.com", price: 10.99, cycle: "Monthly", color: "rose", category: "Streaming" },
  { name: "FuboTV", domain: "fubo.tv", price: 79.99, cycle: "Monthly", color: "green", category: "Streaming" },
  { name: "Sling TV", domain: "sling.com", price: 40, cycle: "Monthly", color: "blue", category: "Streaming" },
  { name: "Philo", domain: "philo.com", price: 25, cycle: "Monthly", color: "purple", category: "Streaming" },

  // more gaming
  { name: "Discord Nitro", domain: "discord.com", price: 9.99, cycle: "Monthly", color: "indigo", category: "Gaming" },
  { name: "Twitch Turbo", domain: "twitch.tv", price: 8.99, cycle: "Monthly", color: "purple", category: "Gaming" },
  { name: "GeForce Now", domain: "nvidia.com", price: 9.99, cycle: "Monthly", color: "green", category: "Gaming" },
  { name: "Apple Arcade", domain: "apple.com/arcade", price: 6.99, cycle: "Monthly", color: "blue", category: "Gaming" },
  { name: "Ubisoft+", domain: "ubisoft.com", price: 17.99, cycle: "Monthly", color: "blue", category: "Gaming" },

  // more ai & dev tools
  { name: "Perplexity Pro", domain: "perplexity.ai", price: 20, cycle: "Monthly", color: "blue", category: "AI" },
  { name: "Gemini Advanced", domain: "gemini.google.com", price: 19.99, cycle: "Monthly", color: "indigo", category: "AI" },
  { name: "Jasper AI", domain: "jasper.ai", price: 49, cycle: "Monthly", color: "purple", category: "AI" },
  { name: "Copy.ai", domain: "copy.ai", price: 49, cycle: "Monthly", color: "teal", category: "AI" },
  { name: "Grammarly Premium", domain: "grammarly.com", price: 12, cycle: "Monthly", color: "green", category: "Productivity" },
  { name: "Todoist Premium", domain: "todoist.com", price: 4, cycle: "Monthly", color: "rose", category: "Productivity" },
  { name: "Evernote", domain: "evernote.com", price: 10.83, cycle: "Monthly", color: "green", category: "Productivity" },
  { name: "Monday.com", domain: "monday.com", price: 8, cycle: "Monthly", color: "rose", category: "Productivity" },
  { name: "Asana", domain: "asana.com", price: 10.99, cycle: "Monthly", color: "pink", category: "Productivity" },
  { name: "Trello", domain: "trello.com", price: 5, cycle: "Monthly", color: "blue", category: "Productivity" },
  { name: "Airtable", domain: "airtable.com", price: 20, cycle: "Monthly", color: "orange", category: "Productivity" },
  { name: "ClickUp", domain: "clickup.com", price: 9, cycle: "Monthly", color: "purple", category: "Productivity" },
  { name: "Miro", domain: "miro.com", price: 8, cycle: "Monthly", color: "orange", category: "Productivity" },

  // more cloud & storage
  { name: "OneDrive", domain: "onedrive.com", price: 1.99, cycle: "Monthly", color: "blue", category: "Cloud" },
  { name: "Box", domain: "box.com", price: 10, cycle: "Monthly", color: "blue", category: "Cloud" },
  { name: "pCloud", domain: "pcloud.com", price: 9.99, cycle: "Monthly", color: "teal", category: "Cloud" },
  { name: "Sync.com", domain: "sync.com", price: 8, cycle: "Monthly", color: "blue", category: "Cloud" },

  // more security
  { name: "Surfshark", domain: "surfshark.com", price: 12.95, cycle: "Monthly", color: "teal", category: "Security" },
  { name: "Private Internet Access", domain: "privateinternetaccess.com", price: 11.95, cycle: "Monthly", color: "green", category: "Security" },
  { name: "ProtonVPN", domain: "protonvpn.com", price: 9.99, cycle: "Monthly", color: "purple", category: "Security" },
  { name: "Bitwarden", domain: "bitwarden.com", price: 10, cycle: "Monthly", color: "blue", category: "Security" },
  { name: "LastPass", domain: "lastpass.com", price: 3, cycle: "Monthly", color: "rose", category: "Security" },
  { name: "Dashlane", domain: "dashlane.com", price: 4.99, cycle: "Monthly", color: "green", category: "Security" },
  { name: "Norton 360", domain: "norton.com", price: 4.99, cycle: "Monthly", color: "orange", category: "Security" },
  { name: "McAfee", domain: "mcafee.com", price: 4.17, cycle: "Monthly", color: "rose", category: "Security" },

  // more fitness & health
  { name: "Headspace", domain: "headspace.com", price: 12.99, cycle: "Monthly", color: "orange", category: "Fitness" },
  { name: "Calm", domain: "calm.com", price: 14.99, cycle: "Monthly", color: "blue", category: "Fitness" },
  { name: "MyFitnessPal", domain: "myfitnesspal.com", price: 9.99, cycle: "Monthly", color: "blue", category: "Fitness" },
  { name: "Noom", domain: "noom.com", price: 59, cycle: "Monthly", color: "orange", category: "Fitness" },
  { name: "Zwift", domain: "zwift.com", price: 14.99, cycle: "Monthly", color: "orange", category: "Fitness" },
  { name: "Nike Training Club", domain: "nike.com", price: 14.99, cycle: "Monthly", color: "slate", category: "Fitness" },

  // news & media
  { name: "New York Times", domain: "nytimes.com", price: 17, cycle: "Monthly", color: "slate", category: "News" },
  { name: "Washington Post", domain: "washingtonpost.com", price: 12, cycle: "Monthly", color: "slate", category: "News" },
  { name: "Wall Street Journal", domain: "wsj.com", price: 38.99, cycle: "Monthly", color: "slate", category: "News" },
  { name: "Financial Times", domain: "ft.com", price: 39, cycle: "Monthly", color: "pink", category: "News" },
  { name: "Bloomberg", domain: "bloomberg.com", price: 34.99, cycle: "Monthly", color: "slate", category: "News" },
  { name: "The Economist", domain: "economist.com", price: 12.50, cycle: "Monthly", color: "rose", category: "News" },
  { name: "Scribd", domain: "scribd.com", price: 11.99, cycle: "Monthly", color: "orange", category: "News" },
  { name: "Pocket Premium", domain: "getpocket.com", price: 4.99, cycle: "Monthly", color: "rose", category: "News" },

  // communication & social
  { name: "Zoom", domain: "zoom.us", price: 14.99, cycle: "Monthly", color: "blue", category: "Productivity" },
  { name: "Webex", domain: "webex.com", price: 13.50, cycle: "Monthly", color: "green", category: "Productivity" },
  { name: "Calendly", domain: "calendly.com", price: 8, cycle: "Monthly", color: "blue", category: "Productivity" },
  { name: "Loom", domain: "loom.com", price: 8, cycle: "Monthly", color: "purple", category: "Productivity" },
  { name: "Riverside.fm", domain: "riverside.fm", price: 19, cycle: "Monthly", color: "indigo", category: "Productivity" },

  // design & creative
  { name: "Sketch", domain: "sketch.com", price: 9, cycle: "Monthly", color: "orange", category: "Productivity" },
  { name: "InVision", domain: "invisionapp.com", price: 7.95, cycle: "Monthly", color: "pink", category: "Productivity" },
  { name: "Framer", domain: "framer.com", price: 5, cycle: "Monthly", color: "blue", category: "Productivity" },
  { name: "Webflow", domain: "webflow.com", price: 14, cycle: "Monthly", color: "blue", category: "Productivity" },
  { name: "Squarespace", domain: "squarespace.com", price: 16, cycle: "Monthly", color: "slate", category: "Productivity" },
  { name: "Wix", domain: "wix.com", price: 16, cycle: "Monthly", color: "blue", category: "Productivity" },

  // developer tools
  { name: "Vercel Pro", domain: "vercel.com", price: 20, cycle: "Monthly", color: "slate", category: "Cloud" },
  { name: "Netlify Pro", domain: "netlify.com", price: 19, cycle: "Monthly", color: "teal", category: "Cloud" },
  { name: "Heroku", domain: "heroku.com", price: 7, cycle: "Monthly", color: "purple", category: "Cloud" },
  { name: "DigitalOcean", domain: "digitalocean.com", price: 6, cycle: "Monthly", color: "blue", category: "Cloud" },
  { name: "AWS", domain: "aws.amazon.com", price: 0.50, cycle: "Monthly", color: "orange", category: "Cloud" },
  { name: "Railway", domain: "railway.app", price: 5, cycle: "Monthly", color: "purple", category: "Cloud" },
  { name: "Supabase Pro", domain: "supabase.com", price: 25, cycle: "Monthly", color: "green", category: "Cloud" },
  { name: "PlanetScale", domain: "planetscale.com", price: 29, cycle: "Monthly", color: "slate", category: "Cloud" },
  { name: "MongoDB Atlas", domain: "mongodb.com", price: 0, cycle: "Monthly", color: "green", category: "Cloud" }
];

function getCategories() {
  const cats = [];
  for (let i = 0; i < presets.length; i++) {
    const cat = presets[i].category;
    if (cats.indexOf(cat) === -1) {
      cats.push(cat);
    }
  }
  return cats;
}
