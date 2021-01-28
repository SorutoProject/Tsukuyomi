<template>
  <div>
    <div v-if="!isPending && validDate">
      <p>{{ $t("addConfirm.share.confirmText") }}</p>
      <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
      <tsukuyomi-card
        :title="newEvent.title"
        :date="this.$route.params.yyyymmdd"
        elevation="0"
      ></tsukuyomi-card>
      <p
        class="text--secondary text-caption"
        v-html="$t('addConfirm.share.cautionText')"
      ></p>
      <p class="red--text" v-if="newEvent.isExist">{{$t("addConfirm.share.existText")}}</p>
      <p>
        <v-btn to="/" text>
          {{ $t("addConfirm.share.buttons.cancel") }}
        </v-btn>
        <v-btn @click="applyEvent" text class="yellow darken-4 white--text">
          <v-icon>mdi-plus</v-icon> {{ $t("addConfirm.share.buttons.submit") }}
        </v-btn>
      </p>
    </div>
    <div v-if="!isPending && !validDate">
      <p class="text-h5">{{ $t("addConfirm.share.invalidDateTitle") }}</p>
      <p>{{ $t("addConfirm.share.invalidDateText") }}</p>
      <p>
        <v-btn to="/" replace><v-icon>mdi-home</v-icon> HOME</v-btn>
      </p>
    </div>
    <div v-if="isPending" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      isPending: true,
      validDate: true,
      newEvent: {
        year: this.$route.params.yyyymmdd.split("-")[0],
        month: this.$route.params.yyyymmdd.split("-")[1],
        date: this.$route.params.yyyymmdd.split("-")[2],
        title: this.$route.params.title,
        isExist:false
      },
    };
  },
  created() {
    const self = this;
    //check whether the same name event is exist
    tsukuyomi.db.events.get(this.$route.params.title).then(function (event) {
      if (event === undefined) {
        self.newEvent.isExist = false;
      } else {
        self.newEvent.isExist = true;
      }
    });
  },
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("addConfirm.share.title"));

    //console.log(tsukuyomi.isValidDate(this.$route.params.yyyymmdd))
    //check date valid
    if (!tsukuyomi.isValidDate(this.$route.params.yyyymmdd)) {
      this.validDate = false;
      this.isPending = false;
      return;
    } else {
      this.validDate = true;
    }
    console.log("pending");
    /*//check whether shared events has already registered.
    const self = this;
    tsukuyomi.db.events.get(this.newEvent.title).then(function (event) {
      if (event !== undefined) {
        if (event.date === self.$route.params.yyyymmdd) {
          //if registered, move to TOP and highlight the event
          //check if in the future or past
          const now = new Date();
          now.setHours(0, 0, 0);
          const target = new Date(event.date);
          target.setHours(0, 0, 0);

          const remainDayCount = Math.ceil(
            (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          //future
          if (remainDayCount >= 0)
            router.replace(`/?highlight=${self.$route.params.title}`);
          //past
          else router.replace(`/past?highlight=${self.$route.params.title}`);
        } else {
          self.isPending = false;
        }
      } else {
        self.isPending = false;
      }
    });*/
    this.isPending = false;
  },
  methods: {
    applyEvent() {
      //Save to IndexedDB

      tsukuyomi.db.events
        .put({
          title: this.newEvent.title,
          date: `${this.newEvent.year}-${this.newEvent.month}-${this.newEvent.date}`,
          id: tsukuyomi.generateId(),
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
};
</script>
