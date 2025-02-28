<template>
   <div class="form-row">
    <input maxlength="50" type="text" class="form-row__field" @blur="updateLabel" :value="label">
    <select class="form-row__select" v-model="accountInfo.accountType" @change="validate">
        <option v-for="option in options" :value="option.value">
            {{ option.text }}
        </option>
    </select>
    <input required maxlength="100" type="text" class="form-row__field" :class="{ 'wide': !needPassword, error: loginError }" v-model="accountInfo.login" @blur="validate">
    <div v-if="needPassword" class="password-container">
        <input required maxlength="100" :type="isVisible ? 'text' : 'password'" class="form-row__field" :class="{error: passwordError}" v-model="accountInfo.password" @blur="validate">
        <EyeIcon @click="switchVisibility" :visible="isVisible" />
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

const emit = defineEmits(['deleteRow', 'updateRow']);

const accountInfo = props.account;
const isVisible = ref(false);
const label = ref(getLabel(accountInfo.label));
const loginError = ref(false);
const passwordError = ref(false);

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

function updateLabel(event) {
    label.value = event.target.value;
    accountInfo.label = label.value.split(';').map(item => ({ text: item.trim() }));
    validate()
}

function validate() {
    loginError.value = accountInfo.login.length === 0 ? true : false;
    passwordError.value = accountInfo.accountType === 'local' && (accountInfo.password === null || accountInfo.password.length === 0) ? true : false;
    if (!loginError.value && !passwordError.value) {
        emit('updateRow', accountInfo)
    }
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
    position: relative;
}

.password-container svg {
    position: absolute;
    right: 4px;
}

.error {
    border: 1px solid red;
}

svg {
    cursor: pointer;
}
</style>