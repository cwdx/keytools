<template>
  <div class="about">
    <h1>Private key</h1>

    <input v-model="privateKey" placeholder="Private key" />

    <button @click.prevent="generate">Generate</button>

    <pre>{{ wallet }}</pre>
    <img :src="qr" v-if="qr" width="300" />
  </div>
</template>

<script lang="ts">
import { mnemonicToKeys, privateKeyToKeys } from "@/lib/mnemonic";
import { getQr } from "@/lib/qr";
import { generateMnemonic } from "bip39";
import { computed, defineComponent, ref, watch } from "vue";

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

    const qr = ref("");

    watch(wallet, () => {
      getQr(wallet.value.privateKey)
        .then((val) => (qr.value = val))
        .catch(() => (qr.value = ""));
    });

    const generate = () => {
      privateKey.value = mnemonicToKeys(generateMnemonic()).privateKey;
    };

    generate();

    return {
      generate,
      wallet,
      privateKey,
      qr,
    };
  },
});
</script>
