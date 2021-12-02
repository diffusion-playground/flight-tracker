<template>    
    <span class="col main-col no-border w-100">
        <div class="section-title-holder">
            <h1 class="section-title">{{title}}</h1>
            <Info class="info" :width="32" :height="32"
                @mouseover.native="hover = true"
                @mouseleave.native="hover = false"
            />
        </div>
        <div class="sub-text w-90" v-if="hover"><slot></slot></div>
    </span>
</template>
<script>
export default ({
    props: ['title', 'subTitle'],
    data() {
        return {
            hover: false
        }
    }
})
</script>
<style scoped>
.sub-text {
    position: absolute;
    margin-top: 60px;
    width: 300px;
    background-color: white;
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 9px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;  
}
.section-title-holder {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.info {
    margin-top: 20px;
    margin-left: 10px;
}

.info:hover {
    fill: brown;
    cursor: help;
}
</style>
