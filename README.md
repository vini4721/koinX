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
- 🌑 **Dark Theme UI** — clean, modern interface matching KoinX's design system

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
        ├──→ API Call 1 ──→ Get Capital Gains Data
        │                        │
        │                        ▼
        │                 Store in capitalGains state
        │
        ├──→ API Call 2 ──→ Get Holdings Data
        │                        │
        │                        ▼
        │                 Store in holdings state
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

The app maintains 3 pieces of state:

| State | Type | Purpose |
|-------|------|---------|
| `capitalGains` | Object | Original tax data from API — never mutated |
| `holdings` | Array | All coin holdings from API — never mutated |
| `selectedCoins` | Array | Coins the user has ticked — changes on every interaction |

Every time `selectedCoins` changes → app recalculates → After Harvesting card re-renders automatically.


---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| useState / useEffect | State management and lifecycle |
| Axios | API calls |
| CSS-in-JS (inline styles) | Component styling |

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── CapitalGainsCard.jsx   → Reusable card for pre & post harvesting
│   └── HoldingsTable.jsx      → Table with all coins and checkboxes
├── data/
│   └── mockData.json          → Mock API data for development
├── hooks/
│   └── useCapitalGains.js     → Custom hook for data fetching
├── utils/
│   └── calculatePostHarvesting.js  → Core tax calculation logic
├── App.jsx                    → Root component, manages all state
└── index.css                  → Global styles and dark theme
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd koinx-tax-harvesting

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

