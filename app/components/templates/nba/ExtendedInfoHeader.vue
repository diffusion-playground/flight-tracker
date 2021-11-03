<template>
    <div class="competitors-header">        
        <TemplatesNbaExtendedInfoCompetitor :competitor="competitors[1]" :isNotAt="true" />
        <TemplatesNbaExtendedInfoScore :competition="competition" />
        <TemplatesNbaExtendedInfoCompetitor :competitor="competitors[0]" :isAt="true"/>
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
