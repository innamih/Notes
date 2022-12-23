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
  <div class="notes">
    <div class="note" v-for="note in notes" :key="note.id" @click="show(note)">
      <div class="title">
        <img :src="note.image" alt="note" />
        <h3>{{ note.title }}</h3>
      </div>
      <p>{{ note.body }}</p>
      <div class="buttons">
        <button class="trash" @click="removeNote(note.id)"></button>
      </div>
    </div>
  </div>
  <router-link to="/new" class="add_note">+</router-link>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const notes = ref();
async function getNotes(){
  const token = localStorage.getItem("token");
  const host = process.env.VUE_APP_API_URL;
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  let response = await fetch(host + "notes", {
    headers: headers,
  });
  if (response.status == 200){
    notes.value = await response.json();
  }
}

async function removeNote(id){
  const token = localStorage.getItem("token");
  const host = process.env.VUE_APP_API_URL;
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  let response = await fetch(host + "notes/" + id, {
    method: "DELETE",
    headers: headers
  });
  if(response.status == 200){
    getNotes();
  }
}

function logout(){
  const authStore = useAuthStore();
  authStore.logout();
  router.push({name: "login"})
}

function show(note) {
  router.push({name: "note", params: { note: note.id}})
}
onMounted(getNotes);
</script>

<style scoped>

header .btn-create {
  background-color: #ff6969;
  color: #ffd500;
}

.btn-create img {
  width: 32px;
  margin-right: 10px;
}

.notes {
  background-color: #00d98d;
  flex: 1;
  padding: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 50px;
  row-gap: 50px;
}

.note {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  background-color: #ffd500;
  padding: 20px;
  box-shadow: 5px 5px 5px #000000;
}

.note:nth-child(odd) {
  transform: rotate(-5deg);
}

.note:nth-child(4n + 2) {
  transform: rotate(4deg);
}

.note:nth-child(4n) {
  transform: rotate(3deg);
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title img {
  width: 53px;
}

.title h3 {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
}

.note p {
  flex: 1;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
}

.buttons {
  display: flex;
  flex-direction: row-reverse;
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
  cursor: pointer;
}

.add_note {
  display: none;
}
</style>