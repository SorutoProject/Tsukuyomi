<template>
  <div>
    <p class="text-subtitle-2">{{ $t("manage.message") }}</p>
    <p>
      <v-btn text @click="dbExport"
        ><v-icon>mdi-database-export</v-icon>　{{
          $t("manage.buttons.export")
        }}</v-btn
      >
    </p>
    <p>
      <v-btn text @click="dbImport"
        ><v-icon>mdi-database-import</v-icon>　{{
          $t("manage.buttons.import")
        }}</v-btn
      >
    </p>
  </div>
</template>
<script>
module.exports = {
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("manage.title"));
  },
  methods: {
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
          tsukuyomi.db.events.bulkPut(JSON.parse(reader.result));
          alert("Imported.");
        };
        reader.readAsText(file);
      });

      filePrompt.click();
    },
    dbExport() {
      //get all events from db
      tsukuyomi.db.events.toArray(function (events) {
        //download JSON
        const json = JSON.stringify(events);
        const a = document.createElement("a");
        const blob = new Blob([json], { type: "application/octet-stream" });
        a.href = window.URL.createObjectURL(blob);
        const time = new Date().toISOString().split("T");
        a.download =
          time[0] +
          "_" +
          time[1].split(".")[0].split(":").join("-") +
          ".tsukuyomibackup";
        a.click();
      });
    },
  },
};
</script>