<template>
    <span>
        <div class="extended-info">
            <ExtendedInfoHeader :competition="event.competitions[0]" :competitors="event.competitions[0].competitors" />        
        </div>
        <div class="extended-info">        
            <ExtendedInfoOdds :competition="event.competitions[0]" />
        </div>
        <div class="extended-info">        
            <ExtendedInfoWinProbs :competition="event.competitions[0]" />
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
    width: 100%;
    border-bottom: 1px solid lightgray;
}

.extended-info:last-child {
    border-bottom: 3px solid lightgray;
}
</style>