import { onBeforeUnmount, onMounted, type Ref, ref, watchEffect } from "vue";

const refs: Record<string, unknown> = {};
const hasLocalStorage = typeof localStorage !== "undefined";

export function useSyncedRef<T>(key: string, defaultValue: T) {
  if (!refs[key] && hasLocalStorage) {
    const stored = localStorage.getItem(key);
    const initial = stored !== null ? JSON.parse(stored) : defaultValue;
    const value = ref<T>(initial);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        value.value = JSON.parse(event.newValue);
      }
    };

    onMounted(() => {
      window.addEventListener("storage", handleStorage);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("storage", handleStorage);
    });

    watchEffect(() => {
      localStorage.setItem(key, JSON.stringify(value.value));
    });

    refs[key] = value;
  }

  return refs[key] as Ref<T>;
}
