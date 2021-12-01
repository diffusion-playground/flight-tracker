<template>
    <div id="sportsBook">
        <div class="sb-title">Sportsbook</div>
        <TemplatesNbaSportsbookTable :competitionId="competitionId" />
        <hr>
        <TemplatesNbaSportsbookPlayByPlay :competitionId="competitionId" />
        <hr>
        <div class="sb-title">Leader Board</div>
        <TemplatesNbaSportsbookLeaderBoard :competitionId="competitionId" />        
    </div>
</template>
<script>
export default ({
    props: ['competitionId']
})
</script>
<style scoped>
.sb-title {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
}
.show-more-container {
    display: flex;    
    justify-content: center;
}

.show-more {
    border: 1px solid #4bade9;
    padding: 5px;
    color: #4bade9;
    align-self: center;
    border-radius: 5%;
}
</style>
