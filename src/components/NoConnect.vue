<template>
  <div class="connect">
    <div>
      <div class="linea-box">
        <h1 class="box-content">Linea</h1>
        <p>An EVM-equivalent network, scaling the Ethereum experience. Secured with a zero-knowledge rollup to Ethereum, built on quantum-resistant, lattice-based cryptography, powered by Consensys.</p>
        <h2>Please connect the wallet first</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoConnect"
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 120px;
  isolation: isolate;
  min-width: 480px;
  min-height: 349px;
  background: #FAF9FF;
}
.linea-box {
  height:480px;
  background: #121212;
  padding: 70px 110px;
  h1 {
    color: white;
    font-size: clamp(1.5rem,5vw,6rem);
  }
  h2 {
    color: #df9100;
    font-size: clamp(1.1rem,3vw,3rem);
  }
  p {
    color: white;
    font-size: clamp(.8rem,1vw,2rem);
    text-align: center;
  }
}
.help-center {
  color: #df9100;
  color: white !important;
}
.tip-two {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  margin-top: 32px;
}
.tip {
  align-items: center;
  color: #df9100;
  font-size: 36px;
  font-weight: 700;
  line-height: 39px;
}
</style>