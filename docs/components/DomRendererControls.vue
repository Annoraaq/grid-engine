<template>
  <div class="buttons">
    <button class="VPButton brand medium" @click="restart">Restart</button>
    <button class="VPButton alt medium" @click="stopped ? resume() : pause()">{{ stopped ? 'Resume' : 'Pause'}}</button>
  </div>
</template>
<script>
export default {
  emits: ['restart', 'resume', 'pause'],
  data() {
    return {
      stopped: false,
    }
  },

  methods: {
    restart() {
      this.resume();
      this.$emit('restart');

    },
    resume() {
      this.stopped = false;
      this.$emit('resume');
    },

    pause() {
      this.stopped = true;
      this.$emit('pause');
    }
  },
}
</script>

<style scoped>
  .VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  }

  .VPButton.medium {
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
  }
  .VPButton.brand {
  border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
  }

  .VPButton.brand:hover {
    border-color: var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
  }

  .VPButton.alt {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
  }

  .VPButton.alt:hover {
    border-color: var(--vp-button-alt-hover-border);
    color: var(--vp-button-alt-hover-text);
    background-color: var(--vp-button-alt-hover-bg);
  }
  .buttons {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

</style>
