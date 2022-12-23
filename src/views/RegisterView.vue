<template>
  <header>
    <router-link to="/"
      ><img class="logo" src="@/assets/notes.png" alt="logo"
    /></router-link>
    <router-link class="button" to="/login">Вход</router-link>
  </header>
  <main>
    <img src="@/assets/register.png" alt="notebook" />
    <form class="form" action="#" @submit.prevent="register()">
      <input type="text" placeholder="Логин" v-model="user.login" />
      <input type="password" placeholder="Пароль" v-model="user.password" />
      <input
        type="password"
        placeholder="Подтверждение пароля"
        v-model="confirm"
      />
      <button type="submit">Регистрация</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const user = ref({ login: "", password: "" });
const confirm = ref();

async function register() {
  if (user.value.password == confirm.value) {
    const data = JSON.stringify(user.value);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const host = process.env.VUE_APP_API_URL;
    let response = await fetch(host + "signup", {
      method: "POST",
      headers: headers,
      body: data,
    });
    switch (response.status) {
      case 201: {
        let result = await response.json();
        let token = result.token;
        localStorage.setItem("token", token);
        break;
      }
      case 403: {
        break;
      }
    }
  }
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