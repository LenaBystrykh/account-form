<template>
  <header class="header">
    <h1>Учетные записи</h1>
    <div class="add-account" @click="addAccount">
      <AddIcon />
    </div>
  </header>
  <div class="hint">
    <HelpIcon />
    <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
  </div>
  <div v-for="account in accounts" :key="account.id" class="mb-3">
    <FormField :account="account" @delete-row="deleteRow(account.id)" @update-row="updateRow(account)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormField from './components/FormField.vue';
import AddIcon from './assets/icons/AddIcon.vue';
import HelpIcon from './assets/icons/HelpIcon.vue';
import { useAccountStore } from './store/accountStore';
const store = useAccountStore();

const accounts = ref(store.accounts);

interface Label {
    text: string
}

interface AccountInfo {
    id: number,
    label: Label[],
    accountType: string,
    login: string,
    password: string | null
}

function deleteRow(id: number) {
  store.deleteAccount(id);
  accounts.value = store.accounts;
}

function addAccount() {
  store.addAccount();
}

function updateRow(account: AccountInfo) {
  store.updateAccount(account);
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 40px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.add-account {
  border: 1px solid #d5e8f0;
  border-radius: 4px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.hint {
  width: 100%;
  display: flex;
  background-color: #d5e8f0;
  border-radius: 4px;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  margin: 20px 0;
}

.mb-3 {
  margin-bottom: 8px;
}
</style>
