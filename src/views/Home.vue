<template>
  <div class="home">
    <h1>Mnemonic</h1>

    <input v-model="mnemonic" placeholder="Mnemonic" />
    <input v-model="path" placeholder="HD path" />

    <button @click.prevent="generate">Generate</button>

    <pre>{{ wallet }}</pre>

    <img :src="qr" v-if="qr" width="300" />
  </div>
</template>

<script lang="ts">
import { mnemonicToKeys } from "@/lib/mnemonic";
import { getQr } from "@/lib/qr";
import { generateMnemonic } from "bip39";
import { computed, defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const mnemonic = ref("");
    const path = ref("m/44'/60'/0'/0/0");

    const wallet = computed(() => {
      try {
        return mnemonicToKeys(mnemonic.value, path.value);
      } catch {
        return {
          address: "",
          privateKey: "",
        };
      }
    });

    const qr = ref("");

    watch(wallet, () => {
      getQr(wallet.value.mnemonic || "")
        .then((val) => (qr.value = val))
        .catch(() => (qr.value = ""));
    });

    const generate = () => {
      mnemonic.value = generateMnemonic();
    };

    generate();

    return {
      generate,
      wallet,
      mnemonic,
      path,
      qr,
    };
  },
});
</script>
