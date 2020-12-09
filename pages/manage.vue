<template>
  <div>
    <p class="text-h5">
      <v-btn icon elevation="0" v-on:click="goBack"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      {{ $t("manage.title") }}
    </p>
    <p class="text-subtitle-2">{{ $t("manage.message") }}</p>
    <p>
      <v-btn text @click="dbImport"><v-icon>mdi-database-import</v-icon>　{{$t("manage.buttons.import")}}</v-btn>
    </p>
    <p>
      <v-btn text @click="dbExport"><v-icon>mdi-database-export</v-icon>　{{$t("manage.buttons.export")}}</v-btn>
    </p>
  </div>
</template>
<script>
module.exports = {
  methods: {
    goBack() {
      router.go(-1);
    },
    dbImport() {
      //create new file prompt
      const filePrompt = document.createElement("input");
      filePrompt.setAttribute("type", "file");
      filePrompt.setAttribute("accept", ".tsukuyomibackup");

      filePrompt.addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          //Add to database
          const db = new Dexie("Tsukuyomi_events");
          db.version(1).stores({
            events: "title",
          });

          db.events.bulkPut(JSON.parse(reader.result));
          alert("Imported.");
        };
        reader.readAsText(file);
      });

      filePrompt.click();
    },
    dbExport() {
      //get all events from db
      const db = new Dexie("Tsukuyomi_events");
      db.version(1).stores({
        events: "title",
      });
      db.events.toArray(function (events) {
        //download JSON
        const json = JSON.stringify(events);
        const a = document.createElement("a");
        const blob = new Blob([json], {type:"application/json"});
        a.href = window.URL.createObjectURL(blob);
        a.download = new Date() + ".tsukuyomibackup";
        a.click();
      });
    },
  },
};
</script>