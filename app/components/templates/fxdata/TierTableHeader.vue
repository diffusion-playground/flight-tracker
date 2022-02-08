<template>
    <span class="headerContainer">
        <div class="cell currency-pair">Currency Pair<hr>{{pairName}}</div>
        <div class="cell offer">Offer<hr>Big / Points</div>
        <div class="cell bid">Bid<hr>Big / Points</div>
        <div class="cell">High</div>
        <div class="cell">Low</div>
        <div class="cell">Open</div>
    </span>
</template>
<script>
export default ({
    props: ['pairName']
})
</script>

<style scoped>
hr {
    border: 1px solid #FFFFFF;
}
.headerContainer {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background-color: #4bade9;   
    border: 1px solid #FFFFFF;     
}
.cell {
    padding: 5px;
    align-self: center;
    background-color: #4bade9;
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
}
.currency-pair {
    width: 8%;
}
.offer, .bid {
    width: 15%;
}
</style>