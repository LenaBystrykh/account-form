<template>
   <div class="form-row">
    <input type="text" class="form-row__field" @blur="updateLabel" :value="label">
    <select class="form-row__select" v-model="accountInfo.accountType">
        <option v-for="option in options" :value="option.value">
            {{ option.text }}
        </option>
    </select>
    <input required type="text" class="form-row__field" :class="{ 'wide': !needPassword }" v-model="accountInfo.login">
    <div v-if="needPassword" class="password-container">
        <input required :type="isVisible ? 'text' : 'password'" class="form-row__field" v-model="accountInfo.password">
        <EyeIcon @click="switchVisibility" />
    </div>
    <DeleteIcon @click="deleteRow" />
   </div> 
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import EyeIcon from '@/assets/icons/EyeIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

interface AccountInfo {
    id: Number,
    label: Label[],
    accountType: String,
    login: String,
    password: String | null
}

interface Label {
    text: String
}

const props = defineProps({
    account: { type: Object as PropType<AccountInfo>, required: true }
})

const accountInfo = props.account;

const emit = defineEmits(['deleteRow']);

const isVisible = ref(false);
const label = ref(getLabel(accountInfo.label));

const options = [
  { text: 'Локальная', value: 'local' },
  { text: 'LDAP', value: 'ldap' }
]

const needPassword = computed(() => {
    return accountInfo.accountType === 'local' ? true : false;
})

function switchVisibility() {
    isVisible.value = !isVisible.value;
}

function deleteRow() {
    emit('deleteRow');
}

function getLabel(arr: Label[]) {
    let label = '';
    arr.forEach(item => {
        if (label.length > 0) {
            label += `; ${item.text}`;
        } else label += item.text;
    })
    return label;
}

function updateLabel() {
    console.log('focus off')
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
    border: 1px solid #d5e8f0;
    padding: 4px;
    width: 150px;
}

.form-row__select {
    border-radius: 4px;
    border: 1px solid #d5e8f0;
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