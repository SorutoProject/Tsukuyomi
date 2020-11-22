<template>
  <div>
    <p class="text-h5">
      <v-btn icon elevation="0" to="/" text>
        <v-icon>mdi-arrow-left</v-icon> </v-btn
      >　イベントの共有
    </p>
    <span class="text--secondary">URLを使ってこのイベントを共有します</span>
    <tsukuyomi-card
      :title="this.$route.params.title"
      :date="this.$route.params.yyyymmdd"
      elevation="0"
    ></tsukuyomi-card>
    <p>共有方法</p>
    <div>
      <!--copy-->
      <v-btn icon x-large v-on:click="copyURL">
        <v-icon> mdi-content-copy </v-icon>
      </v-btn>

      <!--copied snackbar-->
      <v-snackbar v-model="copied" timeout="3000">
        URLをコピーしました
      </v-snackbar>

      <!--LINE-->
      <v-btn
        icon
        x-large
        color="#00b904"
        :href="'https://social-plugins.line.me/lineit/share?url=' + shareURLEncoded"
        target="_blank"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="line"
          class="svg-inline--fa fa-line fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="32"
          height="32"
        >
          <path
            fill="currentColor"
            d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z"
          ></path>
        </svg>
      </v-btn>
      <!--Twitter-->
      <v-btn
        icon
        x-large
        color="#55ACEE"
        :href="
          'https://twitter.com/share?url=' + shareURLEncoded + '&hashtags=ツクヨミ'
        "
        target="_blank"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>

      <!--Facebook-->
      <v-btn
        icon
        x-large
        color="#3B5998"
        :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareURLEncoded"
        target="_blank"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
    </div>
    <div>
        <p class="text--secondary">もしくは</p>
        <v-btn text :href="gCalendarURL">
            <v-icon>mdi-calendar</v-icon>　Googleカレンダーにこのイベントを追加
        </v-btn>
    </div>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      shareURL:
        new URL("./", location.href).href +
        "#/add/" +
        this.$route.params.yyyymmdd +
        "/" +
        encodeURIComponent(this.$route.params.title) +
        "/share",
        shareURLEncoded:encodeURIComponent(new URL("./", location.href).href +
        "#/add/" +
        this.$route.params.yyyymmdd +
        "/" +
        encodeURIComponent(this.$route.params.title) +
        "/share"),
      copied: false,
      gCalendarURL:""
    };
  },
  mounted(){
      //Create google calendar url

      const zerofill = function(num){
          return ('0'+num).slice(-2);
      }
      //get UTC
      const date = new Date(this.$route.params.yyyymmdd);
      const utc = date.getUTCFullYear() +
    		zerofill(date.getUTCMonth()+1) +
    		zerofill(date.getUTCDate()) +
    		'T' +
    		zerofill(date.getUTCHours()) +
    		zerofill(date.getUTCMinutes()) +
    		zerofill(date.getUTCSeconds()) +
            'Z';
        this.gCalendarURL = `https://www.google.com/calendar/event?action=TEMPLATE&text=${this.$route.params.title}&dates=${utc}/${utc}&trp=false`;
  },
  methods: {
    copyURL() {
      //make a textbox
      const copyForm = document.createElement("input");
      //set URL
      copyForm.value = this.shareURL;
      //append to <body>
      document.body.appendChild(copyForm);

      //select text in copyForm
      copyForm.select();
      //Exec copy
      document.execCommand("copy");
      //remove copyForm
      copyForm.remove();

      //show copied message
      this.copied = true;
    },
  },
  components: {
    "tsukuyomi-card": httpVueLoader(
      "../components/tsukuyomi/tsukuyomi-card.vue"
    ),
  },
};
</script>