<template>
  <div>
    <p>
      <v-btn to="/new" icon large>
        <v-icon>mdi-plus</v-icon>
        　<!--{{ $t("index.newEvent") }}-->
      </v-btn>
      <v-btn to="/timeline" icon large>
        <v-icon>mdi-timeline</v-icon>
      </v-btn>
      <v-btn to="/share-multiple" icon large>
        <v-icon>mdi-share-all</v-icon>
      </v-btn>
    </p>
    <!--<span class="text-h6">{{ $t("index.eventListText") }}</span>-->
    <!--loader-->
    <p class="text-center" v-if="isPending">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </p>

    <v-container fluid v-if="events.length > 0 && !isPending">
      <v-row dense>
        <v-col
          v-for="event in events"
          :key="event.title"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <tsukuyomi-card
            :title="event.title"
            :date="event.date"
            removable="true"
            sharable="true"
          ></tsukuyomi-card>
        </v-col>
      </v-row>
    </v-container>
    <p
      v-if="events.length === 0 && !isPending"
      class="text-center text--secondary"
    >
      {{ $t("index.noEventsFoundText") }}
    </p>
    <v-snackbar v-model="isHighlight" timeout="8000">
      <span v-html="$t('index.highlightedTextHTML')"></span>
    </v-snackbar>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      events: [],
      isPending: true,
      isHighlight:false
    };
  },
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("app.name"));
    //Get events from DB
    const db = new Dexie("Tsukuyomi_events");
    db.version(1).stores({
      events: "title",
    });

    const self = this;
    db.events
      .orderBy("title")
      .sortBy("date")
      .then((events) => {
        //extract events only in the future
        const eventsFiltered = events.filter((event) => {
          const now = new Date();
          now.setHours(0, 0, 0);
          const target = new Date(event.date);
          target.setHours(0, 0, 0);

          const remainDayCount = Math.ceil(
            (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (remainDayCount >= 0) {
            return true;
          } else {
            return false;
          }
        });

        self.events = eventsFiltered;
        self.isPending = false;

        //if "highlight" query is defined, highlight the card after generating event list
        if (this.$route.query.highlight) {
          const self = this;
          this.$nextTick(function () {
            setTimeout(function () {
              self.highlightCard(self.$route.query.highlight);
              self.isHighlight = true;
            }, 500);
          });
        }
      });
  },
  methods: {
    highlightCard(title) {
      //get card element that has the "title" given as argument
      const targetCard = document.querySelector(
        `.tsukuyomi-card[data-title="${title}"]`
      );
      if (targetCard !== null) {
        //highlight the card
        targetCard.classList.add("highlight");
        //scroll to the card
        targetCard.scrollIntoView();
      }
    },
  },
};
</script>
