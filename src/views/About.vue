<template>
  <div class="about">
    <h1>Private key</h1>

    <input v-model="privateKey" placeholder="Private key" />

    <button @click.prevent="generate">Generate</button>

    <pre>{{ wallet }}</pre>
  </div>
</template>

<script lang="ts">
import { mnemonicToKeys, privateKeyToKeys } from "@/lib/mnemonic";
import { generateMnemonic } from "bip39";
import { computed, defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const privateKey = ref("");

    const wallet = computed(() => {
      try {
        return privateKeyToKeys(privateKey.value);
      } catch {
        return {
          address: "",
          privateKey: "",
        };
      }
    });

    const generate = () => {
      privateKey.value = mnemonicToKeys(generateMnemonic()).privateKey;
    };

    generate();

    return {
      generate,
      wallet,
      privateKey,
    };
  },
});
</script>
