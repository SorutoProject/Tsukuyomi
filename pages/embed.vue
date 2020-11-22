<template>
    <div v-if="isInFrame">
        <tsukuyomi-card :title="$route.params.title" :date="$route.params.yyyymmdd" addable="true"></tsukuyomi-card>
    </div>
    <div v-else>
        <p>このページはiframe内でのみ有効です。
    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            isInFrame: window.parent !== window
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