<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop :style="style">
      <slot></slot>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="~/assets/images/close-icon.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
    props: ['width', 'height'],
    data() {
        return {
            style: {
                'width': this.width +'%',
                'height': this.height + 'px'
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
  background-color: #000000da;
  z-index: 10000000;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}
</style>