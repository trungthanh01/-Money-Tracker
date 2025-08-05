const addIncome = document.getElementById('add-income-btn')
const addExpense = document.getElementById('add-expense-btn')
const addSalary = document.getElementById('add-salary-btn')
const transactionModal = document.getElementById('transaction-modal')

function openModal() {
    transactionModal.classList.add('active')
    addIncome.addEventListener('click', openModal)
    addExpense.addEventListener('click', openModal)
    addSalary.addEventListener('click', openModal)
}
