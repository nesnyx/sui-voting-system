<!-- SUI Voting System README -->

<div align="center">
  <h1>🗳️ SUI Voting System</h1>
  <p><strong>Decentralized Voting Platform Built on Sui Blockchain</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Built on Sui](https://img.shields.io/badge/Built%20on-Sui%20Network-000000?style=flat-square)](https://sui.io)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://www.javascript.com/)
  [![Move Language](https://img.shields.io/badge/Move-Language-2B3E50?style=flat-square)](https://docs.sui.io/concepts/sui-move)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
</div>

---

## 🌟 Overview

**SUI Voting System** is a decentralized voting platform built on top of the Sui Blockchain. This project combines Move-based smart contracts with an interactive frontend to create a secure, transparent, and efficient voting system.

By leveraging Sui's blockchain technology, this system guarantees voting integrity, immutable records, and enterprise-grade security.

---

## ✨ Key Features

- **🔐 Secure Voting** - Uses Sui blockchain to ensure security and transparency
- **⚡ Lightning-Fast Transactions** - Leverages Sui's exceptionally fast transaction speed
- **📊 Real-time Dashboard** - Monitor voting results live as they happen
- **🎯 Immutable Smart Contracts** - Voting logic that cannot be altered on the blockchain
- **💻 Modern UI/UX** - User-friendly interface for the best voting experience
- **🌐 Fully Decentralized** - No single point of failure, completely trustless
- **📈 Transparent Results** - All votes are recorded and auditable on-chain
- **🔄 Dispute Resolution** - Built-in mechanisms for voting validation

---

## 🏗️ Project Architecture

```
sui-voting-system/
├── contracts/              # Smart Contracts (Move Language)
│   └── sources/           # Smart contract source files
├── frontend/              # Frontend Application (React/JavaScript)
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   └── package.json      # Dependencies
└── commands.txt           # Helpful CLI commands reference
```

### Core Components

**Backend (Smart Contracts)**
- Written in Move language
- Deployed to Sui blockchain
- Manages voting logic, poll creation, and vote counting
- Ensures immutability and security at the protocol level

**Frontend (Web Application)**
- Built with React and JavaScript
- Connected to Sui blockchain via Sui TypeScript SDK
- User-friendly interface for voting and poll creation
- Real-time updates from blockchain events

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Sui CLI** for deploying smart contracts
- **Sui Wallet** for testing and transactions

### Installation

1. **Clone the Repository**
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

The frontend will be available at `http://localhost:3000`

**Deploy Smart Contracts**

Refer to `commands.txt` for deployment instructions to the Sui blockchain:
```bash
cat commands.txt
```

---

## 📝 Smart Contracts Overview

The smart contracts in this project handle:

- **Poll Creation** - Create new voting polls with custom options
- **Vote Management** - Accept and record votes from users securely
- **Vote Counting** - Calculate and display voting results in real-time
- **Access Control** - Ensure only authorized users can participate
- **Immutable Records** - All votes are permanently stored on the blockchain
- **Vote Validation** - Prevent double voting and ensure vote integrity

Smart contracts are written in **Move Language**, which is specifically designed for security and performance on the Sui blockchain.

---

## 🔌 Integration Guide

### Connect Sui Wallet

The application uses Sui Wallet for user authentication and transaction signing:

```javascript
// Example: Connect to Sui Wallet
import { useWallet } from '@mysten/dapp-kit';

function VotingComponent() {
  const { currentAccount } = useWallet();
  
  return (
    <div>
      {currentAccount ? (
        <p>Connected: {currentAccount.address}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
```

### Cast a Vote

Submit a vote transaction to the blockchain:

```javascript
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';

async function castVote(pollId, option) {
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  
  const tx = new TransactionBlock();
  // Add voting logic to tx
  
  const result = await signAndExecute({
    transactionBlock: tx,
  });
  
  return result;
}
```

---

## 🛠️ Development Guide

### Project Structure

```
├── contracts/
│   ├── sources/
│   │   ├── voting.move      # Main voting smart contract
│   │   └── poll.move        # Poll management contract
│   └── Move.toml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VoteForm.jsx
│   │   │   ├── PollList.jsx
│   │   │   └── Results.jsx
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── commands.txt
```

### Building the Project

Build smart contracts:
```bash
cd contracts
sui move build
```

Build frontend:
```bash
cd frontend
npm run build
```

### Testing Smart Contracts

Run tests for the smart contracts:
```bash
cd contracts
sui move test
```

---

## 📚 Technology Stack

**Frontend**
- React 18 - UI library
- JavaScript/ES6+ - Programming language
- CSS - Styling
- Sui TypeScript SDK - Blockchain integration

**Backend**
- Move Language - Smart contract programming
- Sui Blockchain - Execution environment
- BCS (Binary Canonical Serialization) - Data serialization

---

## 🔐 Security Features

This voting system implements multiple security layers:

✅ **On-Chain Verification** - All votes verified at the protocol level
✅ **Cryptographic Signatures** - Each vote is cryptographically signed
✅ **Transparent Audit Trail** - Full voting history on immutable ledger
✅ **Double Vote Prevention** - Smart contracts prevent voting multiple times
✅ **Access Control** - Only registered voters can participate
✅ **Time-Locked Polls** - Voting periods are enforced by smart contracts

---

## 📖 API Reference

### Smart Contract Functions

#### Create Poll
```move
public fun create_poll(
    title: String,
    description: String,
    options: vector<String>,
    end_time: u64,
    ctx: &mut TxContext
)
```

#### Cast Vote
```move
public fun cast_vote(
    poll_id: ID,
    option_index: u64,
    ctx: &mut TxContext
)
```

#### Get Poll Results
```move
public fun get_results(poll_id: ID): vector<u64>
```

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/sui-voting-system.git

# Install dependencies
cd sui-voting-system
npm install

# Create a feature branch
git checkout -b feature/your-feature

# Start development
npm run dev
```

---

## 🐛 Bug Reports & Issues

Found a bug? Please create an [Issue](https://github.com/nesnyx/sui-voting-system/issues) with:

- Clear description of the bug
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or code snippets if applicable
- Environment details (browser, OS, Node.js version)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 Resources & Learning Materials

- [Sui Official Documentation](https://docs.sui.io)
- [Move Language Guide](https://move-book.com)
- [Sui TypeScript SDK Documentation](https://sdk.mystenlabs.com)
- [React Documentation](https://react.dev)
- [Sui Developer Discord Community](https://discord.gg/sui)

---

## 🙋 Support & Community

Need help or have questions? Connect with us:

- 📧 **GitHub Issues**: [Create an Issue](https://github.com/nesnyx/sui-voting-system/issues)
- 💬 **GitHub Discussions**: [Start a Discussion](https://github.com/nesnyx/sui-voting-system/discussions)
- 🌐 **Sui Community**: Join the [Sui Discord](https://discord.gg/sui)

---

## 📈 Roadmap

### Current Version (v1.0)
- ✅ Basic voting functionality
- ✅ Real-time results display
- ✅ Smart contract security

### Upcoming Features (v1.1)
- [ ] Multi-choice voting options
- [ ] Weighted voting by stake
- [ ] Voting delegation system
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] DAO integration
- [ ] Snapshot voting support

---

## 🙏 Acknowledgments

We would like to thank:

- **Sui Foundation** - For the incredible blockchain platform
- **Move Language Team** - For the security-focused language design
- **React Team** - For the powerful UI framework
- **All Contributors** - For improving this project

---

<div align="center">
  <p><strong>Built with ❤️ on Sui Network</strong></p>
  <p>⭐ If you find this project helpful, please consider starring it!</p>
  
  <br/>
  
  [Report a Bug](https://github.com/nesnyx/sui-voting-system/issues) • [Request a Feature](https://github.com/nesnyx/sui-voting-system/discussions) • [View Docs](https://docs.sui.io)
</div>
