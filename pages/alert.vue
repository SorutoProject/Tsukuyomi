<template>
    <div>
        <p>アプリ内ブラウザの場合、正常にイベントが保存されない可能性があります。続行しますか？</p>
        <p class="text--secondary">Google ChromeやSafariを利用することをおすすめします。</p>
        <p>You should use this site not in the "in App Browser" but in Chrome or Safari.</p>
        <p><v-btn to="/">続行(CONTINUE)</v-btn></p>
        <p>
            他のブラウザでこのサイトにアクセスする場合は、<br>
            <v-text-field :value="siteURL" readonly></v-text-field>
            へアクセスしてください。
        </p>
        <p>
            If you want to use this site in another browser, Access to
            <v-text-field :value="siteURL" readonly></v-text-field>
        </p>
    </div>
</template>
<script>
module.exports = {
    mounted(){
        //Update Title
        tsukuyomi.app.changeTitle("Notice");
    },
    data(){
        return {
            "siteURL": new URL("./", location.href).href
        }
    }
}
</script>