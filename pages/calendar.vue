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
          <v-spacer></v-spacer>
          <v-btn text outlined @click="focus = ''">TODAY</v-btn>
        </v-toolbar>
      </v-sheet>
      <v-sheet>
        <v-calendar
          ref="calendar"
          :events="events"
          color="orange lighten-1"
          :event-color="getEventColor"
          v-model="focus"
          @click:event="showEvent"
        ></v-calendar>
      </v-sheet>
    </div>
    <v-dialog v-if="cardDialog.isOpen" v-model="cardDialog.isOpen" width="400">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{$t("calendar.cardDialog.title")}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="cardDialog.isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <tsukuyomi-card :title="cardDialog.eventTitle" :date="cardDialog.eventDate" elevation="0" sharable="true" removable="true"></tsukuyomi-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      events: [],
      isPending: true,
      focus: "",
      calendarTitle:"",
      cardDialog:{
        isOpen:false,
        eventTitle:"",
        eventDate:""
      }
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
    showEvent(event){
      //get event title and date
      this.cardDialog.eventTitle = event.event.name;
      this.cardDialog.eventDate = event.day.date;

      //show the dialog
      this.cardDialog.isOpen = true;
    }
  },
};
</script>