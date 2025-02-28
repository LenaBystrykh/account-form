import { defineStore } from 'pinia';

interface State {
    accounts: AccountInfo[]
}

export const useAccountStore = defineStore('account', {
    state: (): State => {
        const data = localStorage.getItem('accounts');
        return {
            accounts: data ? JSON.parse(data) : [],
        }
    },
    actions: {
        updateAccount(account: AccountInfo) {
            const index = this.accounts.findIndex((item) => item.id === account.id);
            if (index === -1) {
                this.accounts.push(account)
            } else {
                this.accounts[index] = account;
            }
            localStorage.setItem('accounts', JSON.stringify(this.accounts));
        },
        deleteAccount(id: Number) {
            this.accounts = this.accounts.filter((item) => {
                return item.id !== id;
            })
            localStorage.setItem('accounts', JSON.stringify(this.accounts));
        },
    },
})

interface AccountInfo {
    id: number,
    label: Label[],
    accountType: string,
    login: string,
    password: string | null
}

interface Label {
    text: string
}