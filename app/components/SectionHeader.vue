<template>    
    <span class="col main-col no-border w-100">
        <h1 class="section-title">{{title}}</h1>
        <p class="sub-text w-75">{{subTitle}}</p>
    </span>
</template>
<script>
export default ({
    props: ['title', 'subTitle']
})
</script>
