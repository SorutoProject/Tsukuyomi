<template>
  <div>
    <div v-if="isPending" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="!isPending">
      <v-sheet>
        <v-btn icon @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet>
          <v-calendar ref="calendar" :events="events" :event-color="getEventColor" v-model="month"></v-calendar>
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
      month:null
    };
  },
  created() {
    //set title
    tsukuyomi.app.changeTitle("Calendar");

    const self = this;
    //Get Events From DB
    tsukuyomi.db.events.toArray(function (events) {
      let calendarEvents = [];
      events.forEach(async function (event) {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0);
        //make template for the calendar
        const calendarEvent = {
          name: event.title,
          start: eventDate,
          timed: false,
          color: await tsukuyomi.getColorFromString(event.title),
        };
        console.log(calendarEvent)
        calendarEvents.push(calendarEvent);
      });
      self.events = calendarEvents;
      self.isPending = false;
    });
  },
  methods:{
      getEventColor(event){
          return event.color;
      }
  }
};
</script>