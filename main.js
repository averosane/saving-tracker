/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

let transactions = []
const storageKey = 'DATA_object'

function createID() {
  return +new Date()
}

// RENDER TRANSACTION
function renderTransactions() {
  const incomeList = document.getElementById('incomeList')
  const expenseList = document.getElementById('expenseList')

  incomeList.innerHTML = ''
  expenseList.innerHTML = ''

  for (const transactionObject of transactions) {
    const transactionCard = makeTransaction(generatedID, inputTitle, inputAmount, inputDate,)  //transactionCard => element container yg memuat 1 transaksi
    if (transactionObject.type === 'income') {
      incomeList.append(transactionCard)
    }
    else if (transactionObject.type === 'expense') {
      expenseList.append(transactionCard)
    }
  }

}

function makeTransaction(transactionObject) {

  const { id, title, amount, date, type } = transactionObject

  const itemTitle = document.createElement('h3')
  itemTitle.innerText = title;
  itemTitle.setAttribute('data-testid', `transactionItemTitle`)

  const itemAmount = document.createElement('p')
  itemAmount.innerText = `Nominal: Rp ${amount}`
  itemAmount.setAttribute('data-testid', `transactionItemAmount`)
  itemAmount.classList.add('tracker-transaction-item__amount')

  const itemDate = document.createElement('p')
  itemDate.innerText = `Tanggal: ${date}`
  itemDate.setAttribute('data-testid', `transactionItemDate`)
  itemDate.classList.add('tracker-transaction-item__date')

  const itemType = document.createElement('p')
  itemType.innerText = `Tipe: ${type}`
  itemType.setAttribute('data-testid', `transactionItemType`)
  itemType.classList.add('tracker-transaction-item__')  //.....


  const changeButton = document.createElement('button')
  changeButton.setAttribute('data-testid', `transactionItemEditTypeButton`)
  changeButton.classList.add('tracker-transaction-item__change-button', 'tracker-transaction-item__icon')
  changeButton.addEventListener('click', function () {
    changeTransaction(id)
  })

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('data-testid', `transactionItemDeleteButton`)
  deleteButton.classList.add('tracker-transaction-item__delete-button', 'tracker-transaction-item__icon')
  deleteButton.addEventListener('click', function () {
    deleteTransaction(id)
  })

  const editButton = document.createElement('button')
  editButton.classList.add('tracker-transaction-item__icon')
  editButton.innerText = 'Edit'
  editButton.addEventListener('click', function () {
    editTransaction(id)
  })

  const containerButton = document.createElement('div')
  containerButton.append(editButton, deleteButton, changeButton)
  containerButton.classList.add('tracker-transaction-item__actions')
  //containerButton.classList.add('containerButton')

  const transactionCard = document.createElement('div')
  transactionCard.setAttribute('data-testid', 'transactionItem')
  transactionCard.classList.add('tracker-transaction-item')
  transactionCard.append(itemTitle, itemAmount, itemDate, itemType, containerButton)

  if (type === 'income') {
    itemAmount.classList.add('tracker-transaction-item__amount--income')
  }
  else if (type === 'expense') {
    itemAmount.classList.add('tracker-transaction-item__amount--expense')
  }
  return transactionCard
}

// EVENT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', function () {
  getTransactionFromStorage(storageKey)

  // Opsi tambah Card
  const submitForm = document.getElementById('transactionForm')
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault()
    addTransaction()
  })

  renderTransactions()
})

function getTransactionFromStorage(storageKey) {
  let data = JSON.parse(localStorage.getItem(storageKey))
  if (data !== null) {
    for (const transaction of data) {
      transactions.push(transaction);
    }
  }
}

function addTransaction() {
  const generatedID = createID()
  const inputTitle = document.getElementById('transactionFormTitleInput').value
  const inputAmount = parseInt(document.getElementById('transactionFormAmountInput').value)
  const inputDate = document.getElementById('transactionFormDateInput').value
  const inputType = document.getElementById('transactionFormTypeSelect').value

  if (!inputTitle) {
    return alert('Kamu belum menambahkan Judul Transaksi!! \nSilahkan tambahkan!')
  } else if (inputAmount < 1) {
    return alert(`Nominal transaksi TDK BOLEH KURANG dari 1!`)
  }

  const transactionObject = generateTransaction(generatedID, inputTitle, inputAmount, inputDate, inputType)
  transactions.push(transactionObject)

  console.log(typeof (inputAmount))

  renderTransactions()
  saveData()

}

function generateTransaction(id, title, amount, date, type) {
  return {
    id,
    title,
    amount,
    date,
    type
  }
}

// FUNGSI menyimpan ke localStorage
function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(transactions))
}

// FUNGSI menghapus card transaksi
function deleteTransaction(transactionID) {
  const cardTarget = findTransactionIndex(transactionID);
  if (cardTarget === -1) return;
  transactions.splice(cardTarget, 1);
  saveData();
  renderTransactions()
}

// FUNGSI ubah type transaksi
function changeTransaction(transactionID) {
  const transactionTarget = findTransaction(transactionID)
  if (transactionTarget == null) return;

  if (transactionTarget.type === 'income') {  // ...nanti tambahkan find
    transactionTarget.type = 'expense'
  }
  else if (transactionTarget.type === 'expense') {
    transactionTarget.type = 'income'
  }
  saveData();
}

// FUNGSI Edit Transaksi, menampilkan objek ke input
function editTransaction(transactionID) {
  let transactionTarget = findTransaction(transactionID)
  if (transactionTarget == null) return;

  let { id, title, amount, date, type } = transactionTarget

  //menampilkan data ke form
  let showTitle = document.getElementById('transactionFormTitleInput')
  let showAmount = document.getElementById('transactionFormAmountInput')
  let showDate = document.getElementById('transactionFormDateInput')
  let showType = document.getElementById('transactionFormTypeSelect')

  showTitle.value = title
  showAmount.value = amount
  showDate.value = date
  showType.value = type
  //__

  renderTransactions()

}

//FUNGSI
function findTransaction(transactionID) {
  for (const transactionItem of transactions) {
    if (transactionItem.id === transactionID) {
      return transactionItem;
    }
  }
  return null;
}

//FUNGSI
function findTransactionIndex(transactionID) {
  for (const index in transactions) {
    if (transactions[index].id === transactionID) {
      return index;
    }
  }
  return -1;
}

//FUNGSI searchTransaction(title) {}
/**
 * function setSummaryTransaction() {
  const totalHarga = transactions.reduce((total, item) => total + item.amount, 0);
  const balanceState = document.getElementById('balance-amount')
  balanceState.innerText = totalHarga

  const incomeState = document.getElementById('balance-amount-income')

  const expenseState = document.getElementById('balance-amount-expense')

}
 */






// TODO [Basic] Buat variabel array untuk menyimpan semua data transaksi, contoh: let transactions = []
// TODO [Basic] Buat fungsi untuk menghasilkan ID unik secara otomatis, contoh: gunakan +new Date() --------

/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
// TODO [Basic] Ambil elemen kontainer incomeList dan expenseList dari DOM  --------
 */

/**
 * TODO [Basic]:  ------
 * Buat fungsi untuk menampilkan (render) semua transaksi ke layar:
 *  - Kosongkan kontainer terlebih dahulu sebelum mengisi ulang --------
 *  - Gunakan perulangan, buat setiap elemen kartu dengan document.createElement()  -----
 *  - Pastikan setiap elemen memiliki atribut data-testid yang sesuai (lihat panduan di rubrik) --------
 *  - Masukkan kartu ke kontainer yang tepat: income → incomeList, expense → expenseList  ------
 */

// TODO [Basic] Tambahkan event listener 'submit' pada form, panggil e.preventDefault() di dalamnya -----
// TODO [Basic] Di dalam handler submit, ambil nilai input lalu tambahkan sebagai objek transaksi baru ke array -----

/**
 * TODO [Skilled]:  --------
 * Tambahkan validasi input sebelum menyimpan data:
 *  - Tampilkan alert() dan hentikan proses jika judul kosong ---------
 *  - Tampilkan alert() dan hentikan proses jika nominal kurang dari 1  ---------
 */

/**
 * TODO [Advanced]: ----[COMING SOON!!!]
 * Setiap kali data transaksi berubah, perbarui Panel Dasbor: 
 *  - Hitung total pemasukan, total pengeluaran, dan saldo (pemasukan - pengeluaran)
 *  - Tampilkan hasilnya ke elemen yang sesuai di HTML  
 */

/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
/**
 * TODO [Basic]:  -----
 * Data transaksi disimpan ke localStorage menggunakan JSON.stringify(), dan dimuat kembali saat halaman dibuka menggunakan JSON.parse(). 
 *  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari localStorage.  -------
 */

/**
 * TODO [Skilled]:  --[!]
 * Tombol "Edit" berfungsi: saat ditekan, formulir (#transactionForm) secara otomatis terisi dengan data transaksi yang dipilih.
 *  - Pengguna dapat mengubah data lalu menyimpan perubahan.  <<<!>>> [saat dicoba masih berupa menambah transaksi baru, ]
 *  - Formulir kembali ke mode "Tambah" setelah pembaruan selesai.  
 */

/**
 * TODO [Advanced]:
 * Gunakan Custom Event sebagai penghubung antara perubahan data dan pembaruan tampilan:
 *  - Kirim sinyal dengan document.dispatchEvent(new Event('transaction:updated')) setiap kali data berubah
 *  - Pasang satu listener untuk event tersebut yang memanggil fungsi render dan update dasbor
 */

/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
/**
 * TODO [Basic]: --------
 * Tambahkan tombol "Ubah Tipe" pada setiap kartu transaksi:
 *  - Saat diklik, ubah tipe transaksi: 'income' → 'expense' atau 'expense' → 'income'  ----------
 *  - Simpan perubahan ke localStorage dan perbarui tampilan  --------
 */

/**
 * TODO [Skilled]:
 * Tambahkan event listener 'input' pada kolom pencarian: 
 *  - Filter array transaksi berdasarkan kecocokan kata kunci dengan judul transaksi  !!![masih blm ketemu caranya]
 *  - Tampilkan hanya transaksi yang judulnya mengandung kata kunci tersebut  
 */


/**
 * TODO [Advanced]:
 * Pastikan fitur pencarian berjalan dengan baik di semua kondisi:
 *  - Saat kolom pencarian dikosongkan, tampilkan kembali seluruh daftar transaksi  
 */