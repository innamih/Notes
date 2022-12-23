<template>
  <header>
    <router-link to="/"
      ><img class="logo" src="@/assets/notes.png" alt="logo"
    /></router-link>
    <router-link to="/register" class="button">Регистрация</router-link>
  </header>
  <main>
    <img src="@/assets/notebook.png" alt="notebook" />
    <form class="form" action="" @submit.prevent="login()">
      <input type="text" placeholder="Логин" v-model="user.login" autocomplete="off" />
      <input type="password" placeholder="Пароль" v-model="user.password" autocomplete="off" />
      <button class="button btn-login">Войти</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useAuthStore } from "@/store/auth";

const user = ref({ login: "", password: "" });

async function login() {
  const authStore = useAuthStore();
  authStore.login(user.value);
}



</script>

<style scoped>
main {
  background-color: #00d98d;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 300px;
  padding: 50px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffd500;
  align-items: center;
  padding: 100px;
  gap: 40px;
}

input,
textarea {
  padding: 10px;
  border: 2px solid #00d98d;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
}

form .button,
form button {
  padding: 5px 15px;
  background: #ff6969;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #ffd500;
  border: none;
  text-decoration: none;
}
</style>