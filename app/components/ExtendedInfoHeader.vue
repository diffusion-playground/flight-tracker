<template>
    <div class="competitors-header">        
        <ExtendedInfoCompetitor :competitor="competitors[1]" :isNotAt="true" />
        <ExtendedInfoScore :competition="competition" />
        <ExtendedInfoCompetitor :competitor="competitors[0]" :isAt="true"/>
    </div>
</template>
<script>
export default ({
    props: ['competitors', 'competition']
})
</script>
<style scoped>
.competitors-header {
    display: flex;
    justify-content: center;
}
</style>
