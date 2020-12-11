<template>
    <div>
        <p>You entered invalid URL.</p>
        <p><v-btn to="/" replace><v-icon>mdi-home</v-icon>HOME</v-btn>
    </div>
</template>
<script>
module.exports = {
    mounted(){
        //Update Title
        tsukuyomi.app.changeTitle("Invalid URL");
    }
}
</script>