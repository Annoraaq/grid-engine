<template>
  <div>
    <iframe :src="src" scrolling="no" :height="frameHeight"></iframe>
  </div>
</template>

<script>

export default {
  name: 'ExampleFrame',
  props: ['src', 'height'],
  data() {
    return {
      frameHeight: this.height ?? 540
    }
  }
}
</script>

<style>
  iframe {
    width: 700px;
    border: none;
  }
</style>
