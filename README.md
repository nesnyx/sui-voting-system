<!-- SUI Voting System README -->

<div align="center">
  <img width="320" src="https://pintu-academy.pintukripto.com/wp-content/uploads/2023/03/SUI.png" />
  <h1>🗳️ SUI Voting System</h1>
  <p><strong>Decentralized Voting Platform Built on Sui Blockchain</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Built on Sui](https://img.shields.io/badge/Built%20on-Sui%20Network-000000?style=flat-square)](https://sui.io)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://www.javascript.com/)
  [![Move Language](https://img.shields.io/badge/Move-Language-2B3E50?style=flat-square)](https://docs.sui.io/concepts/sui-move)
</div>

---

## 🌟 Overview

**SUI Voting System** adalah platform voting terdesentralisasi yang dibangun di atas Sui Blockchain. Proyek ini menggabungkan smart contracts berbasis Move dengan frontend interaktif untuk menciptakan sistem voting yang aman, transparan, dan efisien.

Dengan memanfaatkan teknologi blockchain Sui, sistem ini menjamin integritas voting, immutability record, dan keamanan tingkat enterprise.

---

## ✨ Fitur Utama

- **🔐 Voting Aman** - Menggunakan Sui blockchain untuk memastikan keamanan dan transparansi
- **⚡ Transaksi Cepat** - Memanfaatkan kecepatan transaksi Sui yang sangat cepat
- **📊 Dashboard Real-time** - Pantau hasil voting secara langsung
- **🎯 Smart Contracts** - Logika voting yang tidak dapat diubah di blockchain
- **💻 UI/UX Modern** - Interface yang user-friendly untuk pengalaman voting terbaik
- **🌐 Terdesentralisasi** - Tidak ada single point of failure

---

## 🏗️ Struktur Project

```
sui-voting-system/
├── contracts/              # Smart Contracts (Move Language)
│   └── sources/           # Source files smart contract
├── frontend/              # Frontend Application (React/JavaScript)
│   ├── src/
│   ├── public/
│   └── package.json
└── commands.txt           # Helpful CLI commands
```

### Komponen Utama

**Backend (Smart Contracts)**
- Ditulis dalam Move language
- Deploy ke Sui blockchain
- Mengelola logika voting, poll creation, dan vote counting
- Memastikan immutability dan security

**Frontend (Web Application)**
- Built dengan React/JavaScript
- Connected ke Sui blockchain via SDK
- User-friendly interface untuk voting
- Real-time updates dari blockchain

---

## 🚀 Quick Start

### Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

- **Node.js** (v16 atau lebih tinggi)
- **npm** atau **yarn** package manager
- **Sui CLI** untuk deployment smart contracts
- **Sui Wallet** untuk testing

### Installation

1. **Clone repository**
```bash
git clone https://github.com/nesnyx/sui-voting-system.git
cd sui-voting-system
```

2. **Setup Frontend**
```bash
cd frontend
npm install
```

3. **Setup Smart Contracts**
```bash
cd contracts
sui move build
```

### Running the Application

**Start Frontend Development Server**
```bash
cd frontend
npm start
```

Frontend akan tersedia di `http://localhost:3000`

**Deploy Smart Contracts**
Lihat `commands.txt` untuk instruksi deployment ke Sui blockchain:
```bash
cat commands.txt
```

---

## 📝 Smart Contracts Overview

Smart contracts dalam project ini menangani:

- **Poll Creation** - Membuat poll voting baru
- **Vote Management** - Menerima dan mencatat vote dari users
- **Vote Counting** - Menghitung dan menampilkan hasil voting
- **Access Control** - Memastikan hanya authorized users yang bisa voting
- **Immutable Records** - Semua vote disimpan secara permanen di blockchain

Contracts ditulis dalam **Move Language** yang dirancang khusus untuk keamanan dan performa di Sui blockchain.

---

## 🔌 API Integration

### Connect Wallet
Aplikasi menggunakan Sui Wallet untuk authentication:

```javascript
// Example: Connect to Sui
const { data: wallet } = useWallet();
```

### Voting Transaction
```javascript
// Cast a vote on blockchain
const vote = await signAndExecuteTransactionBlock({
  transactionBlock: tx,
});
```

---

## 🛠️ Development Guide

### File Structure
- `contracts/` - Semua Move smart contracts
- `frontend/src/` - React components dan logic
- `commands.txt` - Useful CLI commands untuk development

### Building
```bash
# Build contracts
cd contracts && sui move build

# Build frontend
cd frontend && npm run build
```

### Testing
Jalankan test suite untuk memastikan functionality:
```bash
cd contracts
sui move test
```

---

## 📚 Resources

- [Sui Official Documentation](https://docs.sui.io)
- [Move Language Guide](https://move-book.com)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com)
- [Sui Developer Discord](https://discord.gg/sui)

---

## 🤝 Contributing

Kami menerima contributions! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

---

## 🙋 Support & Questions

- 📧 Issues: [GitHub Issues](https://github.com/nesnyx/sui-voting-system/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/nesnyx/sui-voting-system/discussions)
- 🌐 Website: [Sui Network](https://sui.io)

---

## 🎉 Acknowledgments

- Sui Foundation untuk blockchain yang amazing
- Move language team untuk security-first design
- Semua contributors yang membantu project ini

---

<div align="center">
  <p><strong>Built with ❤️ on Sui Network</strong></p>
  <p>Star ⭐ jika project ini bermanfaat!</p>
</div>
