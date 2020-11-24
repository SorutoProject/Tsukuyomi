<template>
  <div>
    <p class="text-h5">
      <v-btn icon elevation="0" to="/" text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      {{$t("timeline.title")}}
    </p>
    <v-timeline dense v-for="(event,index) in events" :key="event.title">
        <!--show "today" if index==0-->
        <v-timeline-item small v-if="index === 0" color="teal">{{$t("timeline.today")}}</v-timeline-item>
        <v-timeline-item hide-dot class="text--secondary">{{event.diff}}{{$t("timeline.days")}}</v-timeline-item>
        <v-timeline-item small>{{event.title}}<br>
        <span class="text-subtitle-2 text--secondary">
            {{event.date}}
        </span>
        </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script>
module.exports = {
  data(){
      return{
          events:[]
      }
  },
  mounted() {
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
            eventsFiltered[i].diff = remainDayCount - eventsFiltered[i - 1].remainDayCount;
          }
        }

        //console.log(eventsFiltered);
        self.events = eventsFiltered;
        self.isPending = false;
      });
  },
};
</script>