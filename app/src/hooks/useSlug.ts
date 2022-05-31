import { computed, Ref } from 'vue';

export const useSlug = (text: Ref<string>) =>
  computed(() =>
    (text.value || '')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  );
