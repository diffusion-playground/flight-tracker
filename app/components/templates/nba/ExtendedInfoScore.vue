<template>
    <div class="extended-info-score">
        <div class="competition-date"><small>{{competition.status.type.shortDetail}}</small></div>
    </div>
</template>
<script>
export default ({
    props: ['competition'],    
})
</script>
<style scoped>
.extended-info-score {
    align-self: center;
}
.competition-date {
    text-align: center;
}
</style>
