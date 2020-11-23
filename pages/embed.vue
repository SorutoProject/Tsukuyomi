<template>
    <div v-if="isInFrame">
        <tsukuyomi-card :title="$route.params.title" :date="$route.params.yyyymmdd" addable="true"></tsukuyomi-card>
        <span class="text-caption">Powered by <a :href="siteURL" target="_blank">TSUKUYOMI</a></span>
    </div>
    <div v-else>
        <p>{{$t("embed.notInFrameText")}}
    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            isInFrame: window.parent !== window,
            siteURL: new URL("./", location.href).href
        }
    },
    created(){
        document.querySelector(".v-app-bar").style.display = "none";
        document.querySelector("html").style.overflow = "auto";
    },
    components:{
        "tsukuyomi-card":httpVueLoader("../components/tsukuyomi/tsukuyomi-card.vue")
    }
}
</script>