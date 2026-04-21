# 🪙 KoinX — Tax Loss Harvesting Tool

> A frontend React application that helps crypto investors legally reduce their tax bill by identifying and selecting losing assets to offset their capital gains — built as part of the KoinX Frontend Assignment.

---

## 📌 What Is This Project?

This is a **Tax Loss Harvesting Tool** — a feature built for KoinX, a platform that helps cryptocurrency investors manage and optimise their taxes.

Most crypto investors hold dozens of coins across multiple exchanges. At the end of the financial year, they owe tax on whatever profit they have made. This tool helps them **legally reduce that tax bill** by showing them which coins they should sell before the year ends.

---

## 🔍 The Problem It Solves

### The Situation
Imagine you invested in crypto this year:

| Coin     | You Invested | Worth Today | Situation              |
|----------|-------------|-------------|------------------------|
| Bitcoin  | ₹5,00,000   | ₹7,00,000   | +₹2,00,000 profit 🟢   |
| Ethereum | ₹3,00,000   | ₹2,00,000   | -₹1,00,000 loss 🔴     |
| Solana   | ₹2,00,000   | ₹1,50,000   | -₹50,000 loss 🔴       |

The government taxes you on your Bitcoin profit:
```
Profit:       ₹2,00,000
Tax (30%):    ₹60,000   ← You owe this
```

### The Smart Move
The government allows you to **subtract your losses from your profits** before calculating tax. So if you sell Ethereum and Solana:

```
Profit:           ₹2,00,000
Losses:          -₹1,50,000
                 ----------
Taxable Amount:    ₹50,000
Tax (30%):         ₹15,000   ← You now owe this
```

**You just saved ₹45,000 in tax — legally.** That is Tax Loss Harvesting.

### Why Can't People Do This Manually?
Serious crypto investors hold 20–50+ coins across different exchanges. Manually figuring out which combination of coins to sell for maximum tax saving is nearly impossible. This tool does it **instantly and visually** — you tick a coin, your tax bill updates in real time.

---

## ✅ Features

- 📊 **Pre Harvesting Card** — shows your current tax liability based on real portfolio data
- 💙 **After Harvesting Card** — updates live as you select coins, showing your new reduced tax
- 📋 **Holdings Table** — lists all your crypto assets with short-term and long-term gain/loss values clearly highlighted in green/red
- ☑️ **Interactive Checkboxes** — tick any losing coin to instantly see how much your tax drops
- ⚡ **Real-time Recalculation** — no page reload needed, everything updates instantly
- 🔃 **Sortable Table** — sort holdings by Short-Term gains/losses in ascending or descending order
- 👁️ **View All / Show Less** — table starts with 5 rows and expands on demand
- 🌗 **Light / Dark Mode** — toggle between themes with a single click
- 📱 **Fully Responsive** — works cleanly on mobile, tablet and desktop

---

## 🧠 How It Works — The Core Logic

The entire application revolves around one simple formula:

```
Net Capital Gains = Profits - Losses

After Harvesting:
New Losses = Original Losses + Losses from selected coins
New Net Capital Gains = Profits - New Losses
```

### Short-Term vs Long-Term
- **Short-Term Capital Gains (STCG)** — assets held for less than 1 year, taxed at a higher rate
- **Long-Term Capital Gains (LTCG)** — assets held for more than 1 year, taxed at a lower rate

Both are tracked and calculated separately.

---

## 🔄 Application Flow

```
USER OPENS THE PAGE
        │
        ▼
App.jsx loads
        │
        └──→ Reads mockData.json
                    │
                    ├──→ Store capitalGains in state
                    └──→ Store holdings in state
        │
        ▼
    Render UI
        │
        ├──→ Pre Harvesting Card  (original data, never changes)
        ├──→ After Harvesting Card (recalculated data)
        └──→ Holdings Table        (all coins with checkboxes)


USER TICKS A CHECKBOX ON A COIN
        │
        ▼
Coin added to selectedCoins state
        │
        ▼
App recalculates post-harvesting numbers
        │
        ▼
After Harvesting Card re-renders with new lower tax
        │
        ▼
User sees exactly how much tax they saved ✅


USER UNTICKS THE COIN
        │
        ▼
Coin removed from selectedCoins state
        │
        ▼
Numbers go back to original
```

---

## 🏗️ Component Architecture

```
App.jsx  ← Main component, holds all state and data
    │
    ├── Disclaimer
    │       └── Collapsible info banner with notes & disclaimers
    │
    ├── CapitalGainsCard (Pre Harvesting)
    │       └── Receives original capitalGains data
    │       └── Static — never changes
    │
    ├── CapitalGainsCard (After Harvesting)
    │       └── Receives recalculated gains
    │       └── Dynamic — updates on every checkbox tick
    │
    └── HoldingsTable
            └── Receives all holdings
            └── Receives selectedCoins list
            └── Receives toggle function from App
            └── On checkbox tick → notifies App → App recalculates
```

---

## 🗃️ State Management

The app maintains 4 pieces of state:

| State | Type | Purpose |
|-------|------|---------|
| `capitalGains` | Object | Original tax data from mock data — never mutated |
| `holdings` | Array | All coin holdings from mock data — never mutated |
| `selectedCoins` | Array | Coins the user has ticked — changes on every interaction |
| `theme` | String | Current UI theme — `"dark"` or `"light"` |

Every time `selectedCoins` changes → app recalculates → After Harvesting card re-renders automatically.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS v3 | Utility-first styling |
| useState / useEffect | State management and lifecycle |
| mockData.json | Local mock data simulating API response |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── CapitalGainsCard.jsx   → Reusable card for Pre & After Harvesting
│   ├── Disclaimer.jsx         → Collapsible disclaimer banner
│   └── HoldingsTable.jsx      → Holdings table with sorting, checkboxes & View all
├── data/
│   └── mockData.json          → Mock capital gains and holdings data
├── assets/
│   └── hero.png               → Static assets
├── App.jsx                    → Root component, manages all state & tax logic
├── App.css                    → Component-level styles
├── index.css                  → Global styles (Tailwind directives)
└── main.jsx                   → React entry point
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/vini4721/koinX.git

# Navigate into the project
cd koinX

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 💡 Key Learning from This Project

Building this project gave me a deep understanding of:

- **React state management** — how a single state change (`selectedCoins`) can trigger recalculation and re-render across multiple components
- **Component reusability** — the same `CapitalGainsCard` component is used twice with different data (pre and post harvesting)
- **Real-world financial logic** — understanding short-term vs long-term capital gains, how losses offset profits, and the actual business value behind the UI
- **Data flow in React** — how data flows down via props and events flow up via callback functions

---

## 👨‍💻 Built By

Anurag Singh
anurag.singh@justdial.com