<template>
    <Modal v-show="showModal" @close-modal="showModal = false" :width="51" :minWidth="850" :height="750">
        <div>
            <iframe v-if="link !== ''"
                :src="link"
                width="100%"
                height="750px"
                frameborder="0" >
           </iframe>
           <h1 v-if="!iFrameSrc">Select a Game</h1>
        </div>
    </Modal>
</template>
<script>
import {mapActions} from 'vuex'
export default ({
    data() {        
        return {
            showModal: false,
            competitionId: 0,
            link: ''
        }
    },    
    methods: {
        ...mapActions('nba', ['getCompetition']),
        async toggle() {            
            if (
                this.$store.state.nba.selectedCompetitionId 
                && this.getCompetition !== undefined 
                && this.$store.state.nba.selectedCompetitionId !== this.competitionId
            ) {
                this.competitionId = this.$store.state.nba.selectedCompetitionId
                const competition = await this.getCompetition(this.competitionId)
                try {
                    console.log('Competition link: ', competition.links[0].href)
                    this.link = competition.links[0].href
                } catch(e) {
                    this.link = ''
                }
            }
            this.showModal = !this.showModal
        }
    }
})
</script>
