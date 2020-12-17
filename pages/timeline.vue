<template>
  <div>
    <!--loader-->
    <p class="text-center" v-if="isPending">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </p>
    <div v-if="events.length > 0 && !isPending">
      <v-timeline dense v-for="(event, index) in events" :key="event.title">
        <!--show "today" if index==0-->
        <v-timeline-item small v-if="index === 0" color="teal">{{
          $t("timeline.today")
        }}</v-timeline-item>
        <v-timeline-item hide-dot class="text--secondary" v-if="event.diff > 0"
          >{{ event.diff }}{{ $t("timeline.days") }}</v-timeline-item
        >
        <v-timeline-item small>
          <tsukuyomi-card
            :title="event.title"
            :date="event.date"
            elevation="0"
            sharable="true"
            removable="true"
          ></tsukuyomi-card>
        </v-timeline-item>
      </v-timeline>
    </div>
    <p
      v-if="events.length === 0 && !isPending"
      class="text-center text--secondary"
    >
      {{ $t("timeline.noEventsFoundText") }}
    </p>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      events: [],
      isPending: true,
    };
  },
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("timeline.title"));

    //Get events from DB
    const self = this;
    tsukuyomi.db.events
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

        //add to diff(from previous item) to items
        for (let i = 0; i < eventsFiltered.length; i++) {
          const now = new Date();
          now.setHours(0, 0, 0);
          const target = new Date(eventsFiltered[i].date);
          target.setHours(0, 0, 0);

          const remainDayCount = Math.ceil(
            (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          eventsFiltered[i].remainDayCount = remainDayCount;
          if (i === 0) {
            eventsFiltered[i].diff = remainDayCount;
          } else {
            eventsFiltered[i].diff =
              remainDayCount - eventsFiltered[i - 1].remainDayCount;
          }
        }

        //console.log(eventsFiltered);
        self.events = eventsFiltered;
        self.isPending = false;
      });
  }
};
</script>
