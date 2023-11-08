<template>
  <div class="tutorial">
    <p class="tutorial-title">Linea JSON_RPC Tutorial</p>
    <div class="tutorial-content">
      <a-collapse v-model:activeKey="activeKey" ghost>
        <a-collapse-panel key="1" header="Get Current Network" :style="customStyle">
          <CurrentNetwork/>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Latest Block Info" :style="customStyle">
          <LatestBlock/>
        </a-collapse-panel>
        <a-collapse-panel key="4" header="Send Transaction" :style="customStyle">
          <SendTransaction/>
        </a-collapse-panel>
        <a-collapse-panel key="5" header="Get Transactions By BlockNumber" :style="customStyle">
          <GetTransaction/>
        </a-collapse-panel>
        <a-collapse-panel key="6" header="Get Gas Price" :style="customStyle">
          <GetGasPrice/>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup >
  import CurrentNetwork from "@/components/json-rpc/CurrentNetwork";
  import LatestBlock from "@/components/json-rpc/LatestBlock"
  import SendTransaction from "@/components/json-rpc/SendTransaction"
  import GetGasPrice from "@/components/json-rpc/GetGasPrice"
  import GetTransaction from "@/components/json-rpc/GetTransaction"
  import {ref} from "vue";
  const activeKey = ref(['1']);
  const customStyle =
      'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
  const data = ref("")
  console.log(data)
</script>

<style scoped lang="less">
.tutorial {
  background: #FAF9FF;
  padding: 40px 56px;
}
.tutorial-title {
  align-items: center;
  color: #df9100;
  font-size: 36px;
  font-weight: 700;
  line-height: 39px;
  margin-top: 32px;
}
</style>