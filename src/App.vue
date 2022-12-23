<template>
  <div class="wrapper">
    <router-view />
    <footer>
      <h2>Заметки</h2>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: "Roboto";
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  /*background-color: #00d98d;*/
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0070c5;
  padding: 20px 50px;
}

.logo {
  width: 150px;
}

header .button {
  padding: 5px 15px;
  border: 2px solid #ff6969;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #ff6969;
  background-color: transparent;
  text-decoration: none;
}

footer {
  box-sizing: border-box;
  background-color: #0070c5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 50px;
}

footer h2 {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: #ff6969;
  margin: 0;
}
</style>
