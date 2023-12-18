<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.big-box {
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 100vh;
}

.content {
  min-width: 1200px;
  width: 1200px;
}
</style>
