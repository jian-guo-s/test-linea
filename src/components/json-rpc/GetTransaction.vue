<template>
  <div style="display: flex">
    <div class="box">
      <div class="title-span">
        <span class="title">Description:</span>
        <span>Obtain transaction information based on block number.</span>
      </div>
      <div class="option">
        <div class="option-title">Option:</div>
        <div class="input-fileId">
          <a-row>
            <a-col :span="4" style="display: flex;align-items: center">BlockNumber:</a-col>
            <a-col :span="10"><a-input v-model:value="blockNumber" @input="validateInput" placeholder="12" style="width: 400px"/></a-col>
          </a-row>
        </div>
        <button class="upload" @click="getTransaction">Get Transaction</button>
      </div>
      <div class="response" v-if="responseShow">
        <p class="res-title">Response:</p>
        <div>
          <JsonViewer :value="transactionData" sort theme="dark" class="json-viewer-container"/>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="code-style">Code:</div>
      <div>
        <pre v-highlightjs><code class="javascript">{{ transactionCode }}</code></pre>
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
const blockNumber = ref('')

const transactionData = ref()
const transactionCode = 'import { ethers } from \'ethers\';\n' +
    '\n' +
    'async function getTransaction() {\n' +
    '    const blockNumber = 752353\n' +
    '    const provider = new ethers.providers.Web3Provider(window.ethereum)\n' +
    '    const transactionInfo = await provider.getBlockWithTransactions(blockNumber);\n' +
    '    console.log(\'block with transactions:\', transactionInfo);\n' +
    '}'

const getTransaction = async () => {
  if (window.ethereum) {
    if (blockNumber.value === undefined) {
      message.warning("Please enter the block number")
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const latestBlock = await provider.getBlockWithTransactions(Number(blockNumber.value));
    transactionData.value = latestBlock
    responseShow.value = true
  } else {
    message.warning("Please install metamask first")
  }
}

const validateInput = () => {
  blockNumber.value = blockNumber.value.replace(/\D/g, '');
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
  height: 26px;
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