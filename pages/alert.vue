<template>
    <div>
        <p class="text-h6">お知らせ</p>
        <p>アプリ内ブラウザの場合、正常にイベントが保存されない可能性があります。続行しますか？</p>
        <p class="text--secondary">Google ChromeやSafariを利用することをおすすめします。</p>
        <p><v-btn to="/">続行</v-btn></p>
        <p>
            他のブラウザでこのサイトにアクセスする場合は、<br>
            <v-text-field :value="siteURL" readonly></v-text-field>
            へアクセスしてください。
        </p>
    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            "siteURL": new URL("./", location.href).href
        }
    }
}
</script>