<template>
    <span>
        <select @change="onSelectionChange($event)" autocomplete="off">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </span>
</template>
<script>
  export default {
    props: ['options', 'selected', 'name'],
    methods: {
      onSelectionChange(e) {
        this.$emit(`valuechanged`, e.target.value)
      }
    }
  }
</script>