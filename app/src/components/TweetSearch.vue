<script setup lang="ts">
  import { toRefs } from 'vue';

  interface IProps {
    modelValue: string;
    placeholder: string;
    disabled: boolean;
  }

  const emit = defineEmits(['search', 'update:modelValue']);
  const props = defineProps<IProps>();

  const { modelValue, placeholder, disabled } = toRefs(props);
</script>

<template>
  <div class="relative border-b">
    <input
      type="text"
      class="text-gray-700 w-full pl-16 pr-32 py-4 bg-gray-50"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', $event)"
      @keydown.enter="emit('search')"
    />
    <div
      class="absolute left-0 inset-y-0 flex items-center justify-center pl-8 pr-2"
      :class="modelValue ? 'text-gray-700' : 'text-gray-400'"
    >
      <slot name="icon"></slot>
    </div>
    <div class="absolute right-0 inset-y-0 flex items-center pr-8">
      <button
        class="rounded-full px-4 py-1 font-semibold"
        :class="
          !disabled
            ? 'text-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-white'
            : 'text-gray-400 bg-gray-200 cursor-not-allowed'
        "
        :disabled="disabled"
        @click="emit('search')"
      >
        Search
      </button>
    </div>
  </div>
</template>
