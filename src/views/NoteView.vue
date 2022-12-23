<template>
  <header>
    <router-link to="/"
      ><img class="logo" src="@/assets/notes.png" alt="logo"
    /></router-link>
    <router-link to="/new" class="button btn-create"
      ><img src="@/assets/btn-icon.png" alt="btn-icon" />Создать заметку </router-link
    ><button class="button" @click="logout()">Выход</button>
  </header>
  <main>
    <div class="view_note">
      <button class="close_btn" type="button" @click="close()"></button>
      <div class="content">
        <img :src="note.image" alt="note" />
        <h2>{{ note.title }}</h2>
        <p>{{ note.body }}</p>
      </div>
      <button class="trash" @click="remove(note.id)"></button>
    </div>
  </main>
</template>

<script setup>

import { useAuthStore } from "@/store/auth";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { ref } from "vue";
import router from "@/router";

let route = useRoute();
const noteId = route.params.note;
const note = ref({title: "", body: "", image: ""});

function logout() {
  const authStore = useAuthStore();
  authStore.logout();
}

async function getNote() {
  const authStore = useAuthStore();
  const token = authStore.token;
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  const response = await fetch(
    process.env.VUE_APP_API_URL + "notes/" + noteId,
    {
      headers: headers
    });
  
  if(response.status == 200) {
    note.value = await response.json();
  }
}

function close(){
  router.push("/");

}

async function remove(id){
  const token = localStorage.getItem("token");
  const host = process.env.VUE_APP_API_URL;
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  let response = await fetch(host + "notes/" + id, {
    method: "DELETE",
    headers: headers
  });
  if(response.status == 200){
    close()
  }
}

onMounted(getNote);
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

.view_note {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  gap: 40px;
  background: #ffd500;
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
.view_note img {
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

.trash {
  width: 32px;
  height: 32px;
  background-image: url("@/assets/trash.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
  background-color: transparent;
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
  border: none;
  cursor: pointer;
}

.view_note .trash {
  align-self: flex-end;
  cursor: pointer;
}
</style>