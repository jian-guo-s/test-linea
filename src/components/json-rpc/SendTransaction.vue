<template>
  <div style="display: flex">
    <div class="box">
      <div class="title-span">
        <span class="title">Description:</span>
        <span>Get file details.</span>
      </div>
      <div class="option">
        <div class="option-title">Option:</div>
        <div class="input-fileId">
          <a-row>
            <a-col :span="4" style="display: flex;align-items: center">Address:</a-col>
            <a-col :span="10"><a-input v-model:value="receiveAddress" placeholder="0x1f27f81c1d13dd96a3b75d42e3d5d92b709869aa" style="width: 550px"/></a-col>
          </a-row>
        </div>
        <div class="input-fileId">
          <a-row>
            <a-col :span="4" style="display: flex;align-items: center">Amount:</a-col>
            <a-col :span="10"><a-input v-model:value="amount" @input="validateInput" style="width: 550px" placeholder="0.1" /></a-col>
          </a-row>
        </div>
        <button class="upload" @click="txClick">Send Transaction</button>
      </div>
      <div class="response" v-if="responseShow">
        <p class="res-title">Response:</p>
        <div>
          <JsonViewer :value="txData" sort theme="dark" class="json-viewer-container"/>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="code-style">Code:</div>
      <div>
        <pre v-highlightjs><code class="javascript">{{ txCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {JsonViewer} from "vue3-json-viewer"
import {message} from "ant-design-vue";
import {ethers} from "ethers";


const responseShow = ref(false)
const txData = ref()
const receiveAddress = ref('')
const amount = ref('')
const txCode = 'import { ethers } from \'ethers\';\n' +
    '\n' +
    'async function sendTransaction() {\n' +
    '    const amountData = ethers.utils.parseEther("0.1");\n' +
    '    const tx = {\n' +
    '        from: "",\n' +
    '        to:"",\n' +
    '        value: amountData.toHexString()\n' +
    '    };\n' +
    '    const txData = await window.ethereum\n' +
    '        .request({ method: \'eth_sendTransaction\', params: [tx] })\n' +
    '    console.log(txData);\n' +
    '}'

const txClick = async () => {
  if (receiveAddress.value === '') {
    message.warning("Please enter the receiving address")
  }
  const amountData = ethers.utils.parseEther(amount.value.toString());
  const address = localStorage.getItem("walletAccount")
  const tx = {
    from: address,
    to: receiveAddress.value,
    value: amountData.toHexString()
  };
  try {
    const txInfo = await window.ethereum.request({ method: 'eth_sendTransaction', params: [tx] })
    txData.value = txInfo
    responseShow.value = true
  }catch (e) {
    console.info("send transaction failed")
  }
}

const validateInput = () => {
  amount.value = amount.value.replace(/[^0-9.]/g, '');
  const pointIndex = amount.value.indexOf('.');
  if (pointIndex !== -1) {
    amount.value= amount.value.slice(0, pointIndex + 1) + amount.value.slice(pointIndex).replace(/\./g, '');
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
.option-title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 8px;
}
.title-span {
  margin-bottom: 8px;
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