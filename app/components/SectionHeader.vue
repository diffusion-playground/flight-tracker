<template>    
    <span class="col main-col no-border w-100">
        <h1 class="section-title">{{title}}</h1>
        <div class="sub-text w-90"><slot></slot></div>
    </span>
</template>
<script>
export default ({
    props: ['title', 'subTitle']
})
</script>
