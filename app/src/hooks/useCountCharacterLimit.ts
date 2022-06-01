import { Ref, ref, watchEffect } from 'vue';

export const useCountCharacterLimit = (text: Ref<string>, limit: number) => {
  const characterLimit = ref(0);
  watchEffect(() => (characterLimit.value = limit - text.value?.length));

  return characterLimit;
};
