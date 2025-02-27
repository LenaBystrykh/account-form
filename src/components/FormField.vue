<template>
   <div class="form-row">
    <input type="text" class="form-row__field">
    <select class="form-row__select" v-model="accountType">
        <option v-for="option in options" :value="option.value">
            {{ option.text }}
        </option>
    </select>
    <input type="text" class="form-row__field" :class="{ 'wide': !needPassword }">
    <div v-if="needPassword" class="password-container">
        <input :type="isVisible ? 'text' : 'password'" class="form-row__field">
        <svg @click="switchVisibility" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9b9b9b"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z"/></svg>
    </div>
    <svg @click="deleteRow" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9b9b9b"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
   </div> 
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits(['deleteRow']);

const isVisible = ref(false);
const accountType = ref('local');
const options = [
  { text: 'Локальная', value: 'local' },
  { text: 'LDAP', value: 'ldap' }
]

const needPassword = computed(() => {
    return accountType.value === 'local' ? true : false
})

function switchVisibility() {
    isVisible.value = !isVisible.value;
}

function deleteRow() {
    emit('deleteRow');
}
</script>

<style>
.form-row {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
}

.form-row__field {
    border-radius: 4px;
    border: 1px solid #b5c2c7;
    padding: 4px;
    width: 150px;
}

.form-row__select {
    border-radius: 4px;
    border: 1px solid #b5c2c7;
    width: 100px;
    padding: 4px;
}

.wide {
    width: 312px;
}

.password-container {
    display: flex;
    align-items: center;
}

.password-container svg {
    margin-left: -24px;
    cursor: pointer;
}
</style>