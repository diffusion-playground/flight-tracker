<template>
    <div class="extended-competitor">
        <img class="nba-extended-logo" v-if="isNotAt" :src="competitor.team.logo" />
        <div class="extended-score" v-if="isAt">{{competitor.score}}</div>
        {{competitor.team.displayName}}
        <div class="extended-score" v-if="isNotAt">{{competitor.score}}</div>
        <img class="nba-extended-logo" v-if="isAt" :src="competitor.team.logo" />        
    </div>
</template>
<script>
export default ({
    props: ['competitor', 'isAt', 'isNotAt']
})
</script>
<style scoped>
.extended-competitor {
    margin: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nba-extended-logo {
    width: 48px;
}
.extended-score {
    margin: 15px;
    font-size: 1.5rem;
    font-weight: 700;
}
</style>