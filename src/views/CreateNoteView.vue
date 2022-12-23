<template>
  <header>
    <router-link to="/"
      ><img class="logo" src="@/assets/notes.png" alt="logo"
    /></router-link>
    <router-link to="/new" class="button btn-create"
      ><img src="@/assets/btn-icon.png" alt="btn-icon" />Создать заметку
    </router-link>
    <button class="button" @click="logout()">Выход</button>
  </header>
  <main>
    <form action="" class="new_note" @submit.prevent="addNote()">
      <button class="close_btn" type="button" @click="close()"></button>
      <img :src="note.image" alt="image" v-if="note.image" />
      <input type="text" placeholder="Заголовок заметки" v-model="note.title" />
      <textarea placeholder="Текст заметки" v-model="note.body"></textarea>
      <input type="text" placeholder="Ссылка на изображение" v-model="note.image"/>
      <div class="buttons">
        <button class="save_btn"></button>
      </div>
    </form>
  </main>
</template>

<script setup>
import router from "@/router";
import { useAuthStore } from "@/store/auth";
import { ref } from "@vue/reactivity";

const note = ref({ title: "", body: "", image: "" });
async function addNote() {
  const data = JSON.stringify(note.value);
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  headers.append("Content-Type", "application/json");
  let response = await fetch(process.env.VUE_APP_API_URL + "/notes", {
    method: "POST",
    headers: headers,
    body: data
  });
  if(response.status == 201){
    router.push("/");
  }
  else{
    console.log("Ошибка");
  }
}

function close(){
  router.push("/");
}

function logout(){
  const authStore = useAuthStore();
  authStore.logout();
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

form {
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

.new_note,
.view_note {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 26px;
  width: 600px;
  box-sizing: border-box;
}

.new_note img {
  height: 200px;
}

header .btn-create {
  background-color: #ff6969;
  color: #ffd500;
}

.btn-create img {
  width: 32px;
  margin-right: 10px;
}

.close_btn {
  background-image: url("@/assets/close.svg");
  width: 32px;
  height: 32px;
  background-color: transparent;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  align-self: flex-end;
  cursor: pointer;
}

.save_btn {
  background-image: url("@/assets/disk.png");
  width: 50px;
  height: 50px;
  background-color: transparent;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  }

.buttons {
  display: flex;
  flex-direction: row-reverse;
}

.new_note .buttons {
  width: 100%;
  background-color: #00d98d;
  padding: 10px;
}
</style>