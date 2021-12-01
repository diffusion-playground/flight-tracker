<template>
    <Modal v-show="showModal" @close-modal="showModal = false" :width="51" :minWidth="850" :height="750">
        <div class="sb-title">Sportsbook</div>
        <TemplatesNbaSportsbookTable :competitionId="competitionId" />
        <hr>
        <TemplatesNbaSportsbookPlayByPlay :competitionId="competitionId" />
        <hr>
        <div class="sb-title">Leader Board</div>
        <TemplatesNbaSportsbookLeaderBoard :competitionId="competitionId" />
        <hr>
        <div class="show-more-container">
            <a class="show-more" href="#" @click="onShowMoreClick">Show me more</a>
        </div>
    </Modal>
</template>
<script>
export default ({
    props: ['competitionId'],
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        toggle() {            
            this.showModal = !this.showModal
        },
        onShowMoreClick() {
            console.log('ShowingMore');
            this.$emit('event-showespnmodal')
        }
    }
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
