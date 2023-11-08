<template>
  <div style="display: flex">
    <div class="box">
      <div class="title-span">
        <span class="title">Description:</span>
        <span>Returns the current price per gas in wei..</span>
      </div>
      <div class="option">
        <div class="option-title">Option:</div>
        <button class="upload" @click="getGasPrice">Get Gas Price</button>
      </div>
      <div class="response" v-if="responseShow">
        <p class="res-title">Response:</p>
        <div>
          <JsonViewer :value="gasPriceData" sort theme="dark" class="json-viewer-container"/>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="code-style">Code:</div>
      <div>
        <pre v-highlightjs><code class="javascript">{{ gasPriceCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {JsonViewer} from "vue3-json-viewer"
import {message} from "ant-design-vue";
import { ethers } from 'ethers'

const responseShow = ref(false)
const gasPriceData = ref()
const gasPriceCode = 'async function getGasPrice() {\n' +
    '    const gasPrice = await window.ethereum.request({\n' +
    '        "method": "eth_gasPrice",\n' +
    '        "params": []\n' +
    '    });\n' +
    '    console.log("get gas price,",gasPrice)\n' +
    '}'

const getGasPrice = async () => {
  if (window.ethereum) {
    const gasPrice = await window.ethereum.request({
      "method": "eth_gasPrice",
      "params": []
    });
    gasPriceData.value = ethers.utils.formatUnits(gasPrice, 18)
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
.upload {
  cursor: pointer;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  background: #df9100;
  border-radius: 20px;
  height: 24px;
  width: 120px;
  outline: none;
  border: 0px solid transparent;
}
.input-fileId {
  margin-bottom: 8px;
}
.title {
  font-size: 14px;
  font-weight: 800;
  margin-right: 4px;
}
.option-title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 8px;
}
.title-span {
  margin-bottom: 8px;
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