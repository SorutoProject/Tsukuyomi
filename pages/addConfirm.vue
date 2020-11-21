<template>
    <div>
        <div v-if="!isShare">
            <p class="text-h5">イベントの作成確認</p>
            <p>次のイベントを作成しますか？</p>
            <p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>
        </div>
        <div v-if="isShare">
            <p class="text-h5">イベントの共有</p>
            <p>次の共有されたイベントを追加しますか？</p>
            <p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>
        </div>
    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            newEvent:{
                year:this.$route.params.yyyymmdd.split("-")[0],
                month:this.$route.params.yyyymmdd.split("-")[1],
                date:this.$route.params.yyyymmdd.split("-")[2],
                title: this.$route.params.title
            },
            isShare: this.$route.params.share !== undefined
        }
    }
}
</script>