<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled || loading"
    class="btn"
    :class="[
      {'btn-round': round},
      {'btn-block': block},
      {'btn-just-icon': icon},
      {[`btn-${type}`]: type},
      {[`btn-outline`]: outline},
      {[`btn-${size}`]: size},
      {[`btn-wd`]: wide},
      {'btn-link': simple}
    ]">
    <slot name="loading">
      <i v-if="loading" class="fa fa-spinner fa-spin"></i>
    </slot>
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'l-button',
  props: {
    tag: {
      type: String,
      default: "button"
    },
    round: Boolean,
    icon: Boolean,
    wide: Boolean,
    outline: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "default"
    },
    nativeType: {
      type: String,
      default: "button"
    },
    size: {
      type: String,
      default: ""
    },
    simple: Boolean
  }
};
</script>
<style>
</style>
