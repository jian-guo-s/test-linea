<template>
  <div class="default-header">
    <div class="logo">
      <img src="../assets/linea-logo.svg" class="logo-image"/>
      <span>JSON-RPC API</span>
    </div>
    <div class="account">
      <a-select ref="select" v-model:value="actionVal" class="w-[140px] !ml-[24px]"
                :options="actionOptions" @select="switchNetwork(actionVal)">
      </a-select>
      <div style="margin-left: 8px">
        <button v-if="!isConnectedWallet" @click="connectWallet">Connect MetaMask</button>
        <a-dropdown v-if="isConnectedWallet">
          <div class="wallet">
            <img src="../assets/metamask-icon.svg" style="margin-right: 4px"/>
            <div style="margin-right: 4px">{{ walletAccount }}</div>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="Disconnect">
                <a href="javascript:;" style="color:black;" class="flex items-center">
                  <img src="../assets/disconnect.svg" class="h-[16px] mr-2" />
                  Disconnect
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup >
  import {ref,defineEmits,onMounted} from "vue";
  import { message } from 'ant-design-vue'
  // import { ethers } from 'ethers';
  const login = ref(false)
  const emit = defineEmits(["connectEvent"])
  const actionVal = ref('Linea Mainnet')
  const isConnectedWallet = ref(false)
  const walletAccount = ref('')
  const actionOptions = ref([
    {label: 'Linea Mainnet', value: '0xe708'},
    {label: 'Linea Testnet', value: '0xe704'},
  ]);
  const defaultNetwork = ref({
    name: "Linea Mainnet",
    chainId: "0xe708",
  })
  onMounted(()=>{
    getDefault()
    getDefaultWallet()
  })
  const getDefaultWallet = () => {
    const walletAddress = localStorage.getItem("walletAccount")
    if (walletAddress) {
      walletAccount.value = walletAddress
      isConnectedWallet.value = true
    }
  }
  const getDefault = () => {
    const accountInfo = localStorage.getItem("walletAccount")
    if (accountInfo) {
      login.value = true
      emit('connectEvent',login.value)
    }
  }
  const connectWallet = async () => {
    if (window.ethereum) {
      //check current network
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' })
      console.log(currentChainId);
      if (currentChainId != defaultNetwork.value.chainId) {
        //Determine if the network list contains switched networks
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: defaultNetwork.value.chainId }],
          })
        } catch (e) {
          message.error("Error switching network")
          console.error("Error switching network:", e);
        }
      }
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts);
        walletAccount.value = accounts[0]
        isConnectedWallet.value = true
        localStorage.setItem("walletAccount",walletAccount.value)
        login.value = true
        emit('connectEvent',login.value)
      } catch (e) {
        message.error("Error connecting to MetaMask")
        console.error("Error connecting to MetaMask:", e);
      }
    } else {
      message.warning("MetaMask is not installed")
      console.error("MetaMask is not installed");
    }
  }
  const Disconnect = () => {
    isConnectedWallet.value = false
    localStorage.removeItem("walletAccount")
    login.value = false
    emit('connectEvent',login.value)
  }
  const switchNetwork = async (network) => {
    if (!isConnectedWallet.value) {
      message.warning("Please connect wallet")
    }
    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (currentChainId != network) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: network }],
          })
        } catch (e) {
          message.error("Error switching network")
          console.error("Error switching network:", e);
        }
      }
    }
  }
</script>

<style scoped lang="less">
.default-header {
  background: #121212;
  display: flex;
  justify-content: space-between;
  top: 0;
  padding-left: 32px;
  height: 64px;
  z-index: 1;
  align-items:  center;
}
.account {
  display: flex;
  align-items: center;
  span{
    color: #fff;
    font-weight: 400;
    font-size: 14px;
    margin-right: 16px;
  }
  button{
    color: #fff;
    font-weight: 400;
    font-size: 14px;
    background: #df9100;
    border-radius: 18px;
    height: 32px;
    width: 140px;
    outline: none;
    border: 0px solid transparent;
  }
}
.logo {
  display: flex;
  align-items: center;
  span {
    color: rgb(234, 242, 247);
    font: inherit;
    text-align: inherit;
    font-size: 20px;
    font-weight: 700;
    display: inline-block;
    line-height: 68px;
    height: 60px;
  }
}
.logo-image {
  width: 80px;
  height: 50px;
  margin-right: 8px;
}
:deep(.ant-select-selector) {
  background-color: #df9100 !important;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  border-radius: 8px!important;
}
.ant-select{
  color: white;
}

:deep(.ant-select-arrow svg) {
  color: #ffffff !important;
}

:deep(.ant-select-single.ant-select-open .ant-select-selection-item) {
  color: #ffffff;
}
.wallet {
  padding: 4px;
  border: 1px solid #df9100;
  border-radius: 8px;
  height: 32px;
  display: flex;
  align-items: center;
  color: #df9100;
  font-size: 16px;
  font-weight: 400;
}
</style>
