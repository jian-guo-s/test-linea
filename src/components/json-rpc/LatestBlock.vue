<template>
  <div style="display: flex;">
    <div class="box">
      <div class="title-span">
        <span class="title">Description:</span>
        <span>Obtain the latest blockchain information from Linea Chain.</span>
      </div>
      <div class="option">
        <span class="option-title">Option:</span>
        <button class="upload" @click="latestBlockInfo">Latest Block Info</button>
      </div>
      <div class="response" v-if="responseShow">
        <p class="res-title">Response:</p>
        <div>
          <JsonViewer :value="latestBlockData" sort theme="dark" class="json-viewer-container"/>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="code-style">Code:</div>
      <div>
        <pre v-highlightjs><code class="javascript">{{ latestBlockCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {JsonViewer} from "vue3-json-viewer"
import {ethers} from "ethers";
import {message} from "ant-design-vue";

const responseShow = ref(false)
const latestBlockData = ref()
const latestBlockCode = 'import { ethers } from \'ethers\';\n' +
    '\n' +
    'async function getLatestBlock() {\n' +
    '    const provider = new ethers.providers.Web3Provider(window.ethereum)\n' +
    '    const blockNumber = await provider.getBlockNumber();\n' +
    '    console.log(\'Latest block number:\', blockNumber);\n' +
    '}'

const latestBlockInfo = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const blockNumber = await provider.getBlockNumber();
    const block = await provider.getBlock(blockNumber);
    latestBlockData.value = block
    responseShow.value = true
  } else {
    message.warning("Please install metamask first")
  }
}

</script>

<style scoped lang="less">
.box {
  flex: 1;
  padding: 0 8px;
}
.title {
  font-size: 14px;
  font-weight: 800;
  margin-right: 4px;
}
.title-span {
  margin-bottom: 8px;
}

.option-title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 8px;
}
.upload {
  cursor: pointer;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  background: #df9100;
  border-radius: 20px;
  height: 26px;
  width: 120px;
  outline: none;
  border: 0px solid transparent;
  margin-left: 8px;
}
.code-style {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 8px;
}
.res-title {
  font-size: 14px;
  font-weight: 800;
  margin-top: 8px;
}
.json-viewer-container {
  max-height: 300px;
  overflow-y: auto;
}
</style>