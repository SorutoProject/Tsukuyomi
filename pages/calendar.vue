<template>
  <div>
    <div v-if="isPending" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="!isPending">
      <v-sheet>
        <v-toolbar flat>
          <v-btn icon @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            &nbsp;{{ $refs.calendar.title }}
          </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet>
        <v-calendar
          ref="calendar"
          :events="events"
          :event-color="getEventColor"
          v-model="month"
          
        ></v-calendar>
      </v-sheet>
    </div>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      events: [],
      isPending: true,
      month: null,
    };
  },
  created() {
    //set title
    tsukuyomi.app.changeTitle(this.$t("calendar.title"));

    const self = this;
    //Get Events From DB
    tsukuyomi.db.events.toArray(function (events) {
      let calendarEvents = [];
      events.forEach(function (event) {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0);
        //make template for the calendar
        const calendarEvent = {
          name: event.title,
          start: eventDate,
          timed: false,
          color: "yellow darken-4",
        };
        //console.log(calendarEvent);
        calendarEvents.push(calendarEvent);
      });
      self.events = calendarEvents;
      self.isPending = false;
    });
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
  },
};
</script>