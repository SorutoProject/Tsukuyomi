<template>
  <div>
    <p>
      <v-text-field
        v-model="event.title"
        :label="$t('edit.titleTextBox.label')"
        :placeholder="$t('edit.titleTextBox.placeholder')"
        counter="50"
        maxlength="50"
        clearable
        color="#F57F17"
      ></v-text-field>
    </p>
    <p>
      <span class="text-caption">{{ $t("edit.startDateText") }}</span
      ><br />
      <v-date-picker
        v-model="event.date"
        :locale="userLang"
        :day-format="(date) => new Date(date).getDate()"
        :min="today"
        color="#F57F17"
      ></v-date-picker>
    </p>
    <p>
      <v-btn
        @click="submit"
        :disabled="invalidTitle || event.title === '' || event.date === ''"
        elevation="0"
        class="yellow darken-4 white--text"
        ><v-icon>mdi-plus</v-icon> {{ $t("edit.submitText") }}</v-btn
      >
    </p>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      event: {
        id:this.$route.params.id,
        title: "",
        date: ""
      },
      today: "",
      userLang: navigator.language,
      invalidTitle: false,
    };
  },
  created() {
    //Check the event exists
    const self = this;
    tsukuyomi.db.events.get(this.$route.params.id).then((event) => {
      if (event === undefined) {
        self.$router.replace("/");
      }else{
        self.event.title = event.title;
        self.event.date = event.date;
      }
    });
  },
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("edit.title"));

    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    let date = today.getDate();
    if (date.toString().length == 1) {
      date = "0" + date;
    }
    this.today = `${year}-${month}-${date}`;
  },
  methods: {
    submit() {
      //delete old event
      tsukuyomi.db.events.delete(this.$route.params.id);
      //Save to IndexedDB
      tsukuyomi.db.events
        .put({
          title: this.event.title,
          date: this.event.date,
          id: this.event.id
        })
        .then(() => {
          router.replace("/");
        })
        .catch((e) => {
          alert(e);
          throw e;
        });
    },
  },
  watch: {
    "event.title": function (title) {
      //block |
      if (title.match(/\|/) !== null) this.invalidTitle = true;
      else this.invalidTitle = false;
    },
  },
};
</script>
