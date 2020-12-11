<template>
  <div>
    <p>{{ $t("app.description") }}</p>
    <p><img style="height:36px;" src="./tsukuyomi-logo_v2.svg"></p>
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
  mounted(){
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("About"));
  },
  data() {
    return {
      siteURL: new URL("./", location.href).href,
    };
  }
};
</script>