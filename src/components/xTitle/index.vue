<template>
  <div class="title">
    <span class="left">
      <slot></slot>
    </span>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.title {
  margin: 20px 0;
  color: #525252;
  display: flex;
  align-items: center;
  cursor: default;
  &::before {
    display: inline-block;
    margin-right: 10px;
    content: '';
    width: 3px;
    height: 1em;
    background-color: $--color-primary;
    border-radius: 2px;
  }
  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
}
</style>
