<template>
    <div>
            <p>
                <v-text-field
                    v-model="newEvent.title"
                    :label="$t('new.titleTextBox.label')"
                    :placeholder="$t('new.titleTextBox.placeholder')"
                    counter="50"
                    maxlength="50"
                    clearable
                    color="#F57F17"
                ></v-text-field>
            </p>
            <p>
                <span class="text-caption">{{$t("new.startDateText")}}</span><br>
                <v-date-picker
                v-model="newEvent.date"
                :locale="userLang"
                :day-format="date => new Date(date).getDate()"
                :min="today"
                color="#F57F17"
                ></v-date-picker>
            </p>
            <p>
                <v-btn @click="submit" :disabled="newEvent.title === '' || newEvent.date === ''" elevation="0" class="yellow darken-4 white--text"><v-icon>mdi-plus</v-icon> {{$t("new.submitText")}}</v-btn>
            </p>

    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            "newEvent":{
                "title":"",
                "date":""
            },
            "today":"",
            "userLang":navigator.language
        }
    },
    mounted(){
        //Update Title
        tsukuyomi.app.changeTitle(this.$t("new.title"));

        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        if(month.toString().length == 1){
            month = "0" + month;
        }
        let date = today.getDate();
        if(date.toString().length == 1){
            date = "0" + date;
        }
        this.today = `${year}-${month}-${date}`;
    },
    methods:{
        submit(){
            router.push(`/add/${this.newEvent.date}/${this.newEvent.title}`);
        }
    }
}
</script>
