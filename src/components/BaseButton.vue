<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped lang="postcss">
.btn {
  @apply inline-flex rounded-lg items-center justify-center;
  @apply transition duration-200 ease-in-out cursor-pointer;
  @apply text-white bg-blue-600 hover:bg-blue-500;

  p {
    @apply text-base;
  }
}
</style>
