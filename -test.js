const transactions = [
  { tipe: "pemasukan", nominal: 500000 },
  { tipe: "pengeluaran", nominal: 50000 },
  { tipe: "pemasukan", nominal: 150000 },
  { tipe: "pengeluaran", nominal: 100000 },
  { tipe: "investasi", nominal: 200000 } // Tipe baru otomatis ikut terhitung
];

const totalPerTipe = transactions.reduce((acc, item) => {
  const tipe = item.tipe;
  const nominal = item.nominal;

  // Jika tipe belum ada di object penampung, buat baru dengan nilai awal 0
  if (!acc[tipe]) {
    acc[tipe] = 0;
  }

  // Tambahkan nominal ke tipe yang sesuai
  acc[tipe] += nominal;

  return acc;
}, {}); // {} adalah nilai awal berupa object kosong

console.log(totalPerTipe);
