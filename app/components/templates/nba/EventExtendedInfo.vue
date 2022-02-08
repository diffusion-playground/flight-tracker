<template>
    <span class="extended-info-holder" :data-id="event.id">
        <div class="extended-info">
            <TemplatesNbaExtendedInfoHeader :competition="event.competitions[0]" :competitors="event.competitions[0].competitors" />        
        </div>
        <div class="extended-info">        
            <TemplatesNbaExtendedInfoOdds :competition="event.competitions[0]" />
        </div>
        <div class="extended-info">        
            <TemplatesNbaExtendedInfoWinProbs :competition="event.competitions[0]" />
        </div>
    </span>
</template>
<script>
export default ({
    props: ['event'],    
})
</script>

<style scoped>
.extended-info {
    display: flex;    
    border-bottom: 1px solid lightgray;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    align-items: center;
    max-width: 32rem;
}

.extended-info:last-child {
    border-bottom: 3px solid darkslategray;
}
</style>