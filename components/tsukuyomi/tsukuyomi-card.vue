<template>
  <div v-if="!removeCompleted">
    <v-card :elevation="elevation">
      <div v-if="!removed">
        <v-card-text>
          あと<span class="display-1 text-h4 text--primary">{{
            remainDayCount
          }}</span
          >日

          <v-card-title>{{ title }}</v-card-title>
          <v-card-subtitle>{{ date }}</v-card-subtitle>
        </v-card-text>
        <v-card-actions>
          <!--<v-btn :to="'/detail/' + date + '/' +title" text>詳細を確認</v-btn>-->
          <v-btn
            icon
            v-if="removable !== undefined"
            @click="removeConfirm = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon v-if="sharable" :to="'/share/' + date + '/' + title">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <div v-if="removed">
        <v-card-text> 削除しました </v-card-text>
      </div>

      <!--Confirm Removing-->
      <v-expand-transition>
        <v-card
          v-if="removeConfirm"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <span class="text-h6 text--primary">削除確認</span>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle>{{ date }}</v-card-subtitle>
            <span class="text--primary">このイベントを削除しますか？</span>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text @click="removeConfirm = false"> キャンセル </v-btn>
            <v-btn text v-on:click="remove" class="red white--text">
              削除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
module.exports = {
  props: ["title", "date", "removable", "sharable", "elevation"],
  data() {
    return {
      remainDayCount: 0,
      removeConfirm: false,
      removed: false,
      removeCompleted: false,
    };
  },
  methods: {
    remove() {
      this.removeConfirm = false;
      this.removed = true;

      //Remove from the DB
      const db = new Dexie("Tsukuyomi_events");
      db.version(1).stores({
        events: "title",
      });

      db.events.delete(this.title);
    },
  },
  mounted() {
    //Calclate how many days
    const now = new Date().getTime();
    const target = new Date(this.date).getTime();

    this.remainDayCount = Math.ceil((target - now) / (1000 * 60 * 60 * 24)) - 1;
  },
};
</script>
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>