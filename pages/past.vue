<template>
  <div>
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
            :id="event.id"
            :title="event.title"
            :date="event.date"
            removable="true"
            sharable="true"
            editable="true"
          ></tsukuyomi-card>
        </v-col>
      </v-row>
    </v-container>
    <p
      v-if="events.length === 0 && !isPending"
      class="text-center text--secondary"
    >
      {{ $t("past.noEventsFoundText") }}
    </p>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      events: [],
      isPending: true
    };
  },
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("past.title"));
    //Get events from DB
    const self = this;
    tsukuyomi.db.events
      .orderBy("id")
      .reverse()
      .sortBy("date")
      .then((events) => {
        //extract events only in the past
        const eventsFiltered = events.filter((event) => {
          const now = new Date();
          now.setHours(0, 0, 0);
          const target = new Date(event.date);
          target.setHours(0, 0, 0);

          const remainDayCount = Math.ceil(
            (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );

          if(remainDayCount < 0){
            return true;
          }else{
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
            }, 500);
          });
        }
      });
  },
  methods:{
    highlightCard(id) {
      //get card element that has the "title" given as argument
      const targetCard = document.querySelector(
        `.tsukuyomi-card[data-id="${title}"]`
      );
      if (targetCard !== null) {
        //highlight the card
        targetCard.classList.add("highlight");
        //scroll to the card
        targetCard.scrollIntoView();
      }
    },
  }
};
</script>
