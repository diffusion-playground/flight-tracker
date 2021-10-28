<template>
    <div :class="detailClass(eventType.id)">{{eventType.shortDetail}}</div>
</template>
<script>
export default ({
    props: ['eventType'],
    methods: {
        /* http://www.espn.com/apis/devcenter/docs/scores.html#details */
        detailClass(statusId) {            
            const id = parseInt(statusId)
            if (id === 1) {
                return 'event-scheduled'
            }
            if (id === 2) {
                return 'event-in-progress'                
            }
            return 'event-completed'
        },
    }
})
</script>
<style scoped>
.event-completed, .event-scheduled,  .event-in-progress {
    font-size: 0.8rem;
    color: #000000 !important;
    align-self: center;
    text-align: center;
}

.event-scheduled {
    color: gray !important;
    font-size: 0.6rem;
}

.event-in-progress {
    color: red !important;
}
</style>
