<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div :ref="modalId || 'aModal'"  class="modal" @click.stop :style="style">
      <slot></slot>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="~/assets/images/close-icon.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
    props: ['width', 'height', 'minWidth', 'modalId'],
    data() {
        return {
            style: {
                'width': this.width +'%',
                'height': this.height + 'px',
                'min-width': (this.minWidth || 300) + 'px'
            }
        }
    }
}
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7) !important;
  transition: opacity .15s linear;
  z-index: 10000000;
}

.modal {  
  background-color: white;
  height: 560px;
  width: 500px;
  margin: auto;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid lightgray;
}
.close {
  margin: 1rem 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}
</style>