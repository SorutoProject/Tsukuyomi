let tsukuyomi_pwa_prompt = null;
window.addEventListener('beforeinstallprompt', function (event) {
  event.preventDefault();
  tsukuyomi_pwa_prompt = event;
  return false;
});

const tsukuyomi = {
  "isValidDate": function (dateText) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateText)) {
      return false;
    }
    const date = new Date(dateText);
    const y = dateText.split("-")[0];
    const m = dateText.split("-")[1];
    const d = dateText.split("-")[2];

    return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
  },
  "pwaInstall": function () {
    if (tsukuyomi_pwa_prompt) {
      tsukuyomi_pwa_prompt.prompt();
    }
  },
  getColorFromString: async function (string) {
    const uint8 = new TextEncoder().encode(string);
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    const result = Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('');
    return "#0000" + result.slice(0,2);
  },
  generateId: function(length = 16){
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789"
    let id = "";
    for(let i = 0; i < length; i++){
      id+= str[Math.floor(Math.random() * str.length)];
    }
    return id;
  },
  app: {
    changeTitle: function (title) {
      app.title = title;

      //change document.title
      if (app.$route.path !== "/") {
        //add " - {appname}" after the title
        document.title = title + " - " + app.$t("app.name");
      } else {
        document.title = title;
      }
    }
  },
  //Initialize DB
  db: new Dexie("Tsukuyomi_events")
}

//Init DB
tsukuyomi.db.version(2).stores({
  events: "id"
});
