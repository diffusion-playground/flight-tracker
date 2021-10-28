<template>    
    <div class="nba-list-team">
        <span v-if="isAt" class="at">at</span>
        <img class="nba-logo" :src="competitor.team.logo" />
        <span class="nba-list-team-name">{{competitor.team.displayName}}</span>        
    </div>
</template>
<script>
export default ({
    props: ['competitor', 'isAt']
})
</script>
<style scoped>
.at {
    margin-right: 5px;
}
.nba-logo {
    width: 24px;
    height: 24px;
    margin-right: 5px;    
}
.nba-list-team { 
    width: 50%;
    display: flex;
    align-items: center;   
    color: #4bade9;
    margin-left: 5px;
}
</style>
