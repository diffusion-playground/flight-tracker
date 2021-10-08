<template>
    <a :href="dhref" type="button" :class="dclass" @click="onBtnClicked"> {{ dtext }} </a>    
</template>
<script>
export default ({
    props: ['dhref', 'dtext', 'dclass'],
    methods: {
      onBtnClicked(e) {
        this.$emit(`dclick`, e.target)
      }
    }
})
</script>

<style scoped>
.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: initial;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 3px;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
}

@media(prefers-reduced-motion:reduce) {
    .btn {
        transition: none
    }
}

.btn:hover {
    color: #212529;
    text-decoration: none
}

.btn.focus,.btn:focus {
    outline: 0;
    box-shadow: 0 0 0 .2rem rgba(75,173,233,.25)
}

.btn.disabled,.btn:disabled {
    opacity: .65
}

a.btn.disabled,fieldset:disabled a.btn {
    pointer-events: none
}

.btn-primary {
    color: #FFFFFF !important;
    background: #4bade9 linear-gradient(180deg,#65b8ec,#4bade9) repeat-x;
    border-color: #4bade9
}

.btn-primary:hover {
    color: #fff;
    background: #299de5 linear-gradient(180deg,#48abe8,#299de5) repeat-x;
    border-color: #1e98e3
}

.btn-primary.focus,.btn-primary:focus {
    box-shadow: 0 0 0 .2rem rgba(69,153,204,.5)
}

.btn-primary.disabled,.btn-primary:disabled {
    color: #212529;
    background-color: #4bade9;
    border-color: #4bade9;
    background-image: none
}

.btn-primary:not(:disabled):not(.disabled).active,.btn-primary:not(:disabled):not(.disabled):active,.show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #1e98e3;
    background-image: none;
    border-color: #1b91da
}

.btn-primary:not(:disabled):not(.disabled).active:focus,.btn-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 .2rem rgba(69,153,204,.5)
}
</style>