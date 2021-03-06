import { ref, Ref, computed } from "vue";

type CountResultProps = {
  count: Ref<number>;
  multiple: Ref<number>;
  // eslint-disable-next-line no-unused-vars
  increase: (delta?: number) => void;
  // eslint-disable-next-line no-unused-vars
  decrease: (delta?: number) => void;
};

export default function useCount(initValue = 1): CountResultProps {
  const count = ref(initValue);

  const increase = (delta?: number): void => {
    if (typeof delta !== "undefined") {
      count.value += delta;
    } else {
      count.value += 1;
    }
  };
  const multiple = computed(() => count.value * 2);

  const decrease = (delta?: number): void => {
    if (typeof delta !== "undefined") {
      count.value -= delta;
    } else {
      count.value -= 1;
    }
  };

  return {
    count,
    multiple,
    increase,
    decrease,
  };
}

