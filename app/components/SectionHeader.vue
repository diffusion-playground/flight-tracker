<template>    
    <span class="col no-border">
        <div class="section-title-holder">
            <h1 class="section-title">{{title}}</h1>
            <Info class="info" :width="32" :height="32" v-tooltip="{ content: toolTip, html: true }"
                @mouseover.native="onInfoHover($event)"
                @mouseleave.native="onInfoLeave($event)"
            />
        </div>
        <div ref="subText" class="sub-text w-90" :style="{'display': 'none'}"><slot></slot></div>
    </span>
</template>
<script>
export default ({
    props: ['title', 'subTitle'],
    data() {
        return {
            hover: false,
            toolTip: '<h2>Hola Maistro</h2>'
        }
    },
    methods: {
        onInfoHover(event) {            
            this.toolTip = this.$refs.subText.innerHTML
            //console.log(this.$refs.subText)
            this.hover = true
        },
        onInfoLeave(event) {
            this.hover = false
        }
    }
})
</script>
<style scoped>

.v-popper--tooltip-loading .v-popper__inner {
  color: black;
}
.sub-text {
    color: black;
    position: absolute;
    margin-top: 0px;
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
