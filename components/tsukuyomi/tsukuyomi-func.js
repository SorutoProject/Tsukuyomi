let tsukuyomi_pwa_prompt = null;
window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault();
  tsukuyomi_pwa_prompt = event;
  return false;
});

const tsukuyomi = {
  "isValidDate":function(dateText){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(dateText)){
      return false;
    }
    const date = new Date(dateText);
    const y = dateText.split("-")[0];
    const m = dateText.split("-")[1];
    const d = dateText.split("-")[2];

    return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
  },
  "pwaInstall":function(){
    if(tsukuyomi_pwa_prompt){
      tsukuyomi_pwa_prompt.prompt();
    }
  }
}
