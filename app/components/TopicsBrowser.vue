<template>
    <div class="d-start-flex" :style="{'width': '100%'}">
        <TopicsTree ref="topicsTree" />
        <TopicValue />
    </div>
</template>
<script>
    export default {
        methods: {
            show() {
                this.$refs.topicsTree.show()
            }
        }
    }
</script>

