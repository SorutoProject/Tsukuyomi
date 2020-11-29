<template>
  <div>
    <p class="text-h6">
      <v-btn icon elevation="0" v-on:click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      About TSUKUYOMI
    </p>
    <p>{{ $t("app.description") }}</p>
    <p class="text--secondary text-caption">
      &copy; 2020 Soruto Project<br />Licensed under the MIT.
    </p>
    <p>
      <v-btn
        icon
        href="https://github.com/SorutoProject/Tsukuyomi/"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </p>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      siteURL: new URL("./", location.href).href,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>