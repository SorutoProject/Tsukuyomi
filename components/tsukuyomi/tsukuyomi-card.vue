<template>
  <div v-if="!removeCompleted">
    <v-card
      :elevation="elevation"
      :data-checked="checked"
      :data-date="date"
      :data-title="title"
      :data-id="id"
      class="tsukuyomi-card"
    >
      <div v-if="!removed">
        <v-card-text>
          <span v-if="remainDayCount > 0">
            {{ $t("card.dayleft.before") }}
            <span class="display-1 text-h5 font-weight-bold text--primary">
              {{ remainDayCount }}
            </span>
            {{ $t("card.dayleft.after") }}</span
          >
          <span
            v-if="remainDayCount === 0"
            class="display-1 text-h5 font-weight-bold text--primary"
          >
            {{ $t("card.today") }}
          </span>
          <span v-if="remainDayCount < 0">
            {{ $t("card.passed.before") }}
            <span class="display-1 text-h5 font-weight-bold text--secondary">
              {{remainDayCount * -1}}
            </span>
            {{ $t("card.passed.after")}}
          </span>

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
          <v-btn icon v-if="sharable" :to="'/share/' + id">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
          <v-btn text v-if="addable" :href="addURL" target="_blank">
            <v-icon>mdi-plus</v-icon> {{ $t("card.addText") }}
          </v-btn>
          <v-btn icon v-if="editable" :to="'/edit/' + id">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            text
            v-if="checkable"
            v-on:click="checked = !checked"
            class="tsukuyomi-card-check"
          >
            <v-icon v-if="checked" color="yellow darken-4"
              >mdi-checkbox-marked</v-icon
            >
            <v-icon v-if="!checked">mdi-checkbox-blank-outline</v-icon>
            　{{ $t("card.checkText") }}
          </v-btn>
        </v-card-actions>
      </div>
      <div v-if="removed">
        <v-card-text>{{ $t("card.removedText") }}</v-card-text>
      </div>

      <!--Confirm Removing-->
      <v-expand-transition>
        <v-card
          v-if="removeConfirm"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
          elevation="0"
        >
          <v-card-text class="pb-0">
            <span class="text-h6 text--primary">{{
              $t("card.removeConfirm.title")
            }}</span>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle>{{ date }}</v-card-subtitle>
            <span class="text--primary">{{
              $t("card.removeConfirm.confirmText")
            }}</span>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text @click="removeConfirm = false">
              {{ $t("card.removeConfirm.buttons.cancel") }}
            </v-btn>
            <v-btn text v-on:click="remove" class="red white--text">
              {{ $t("card.removeConfirm.buttons.remove") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
module.exports = {
  props: [
    "title",
    "date",
    "id",
    "removable",
    "sharable",
    "elevation",
    "addable",
    "checkable",
    "editable"
  ],
  data() {
    this.$i18n.locale = userLang;
    return {
      remainDayCount: 0,
      removeConfirm: false,
      removed: false,
      removeCompleted: false,
      checked: false,

      addURL:
        new URL("./", location.href).href +
        "#/add/" +
        this.date +
        "/" +
        encodeURIComponent(this.title) +
        "/share",
      updateDayCountTimer: null,
    };
  },
  methods: {
    remove() {
      this.removeConfirm = false;
      this.removed = true;

      //Remove from the DB
      tsukuyomi.db.events.delete(this.id);
    },
  },
  mounted() {
    const self = this;
    const calclateDayCount = function () {
      const now = new Date();
      now.setHours(0, 0, 0);
      const target = new Date(self.date);
      target.setHours(0, 0, 0);

      self.remainDayCount = Math.ceil(
        (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
    };
    calclateDayCount();
    //Calclate how many days every 0.5s
    this.updateDayCountTimer = setInterval(function () {
      calclateDayCount();
    }, 500);
  },
  destroyed() {
    clearInterval(this.updateDayCountTimer);
  }
};
</script>
<style>
.tsukuyomi-card .v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.tsukuyomi-card.theme--dark.elevation-0 {
  background: rgba(0, 0, 0, 0) !important;
}

.tsukuyomi-card.highlight {
  background: #b3e5fc !important;
}

.tsukuyomi-card.theme--dark.highlight {
  background: #01579b !important;
}
</style>
