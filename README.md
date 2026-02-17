# 🧠 Skill Trajectory Simulator

An interactive decision-intelligence prototype that visualizes how long-term skill growth compounds under financial stress and uncertainty. Built as a cyberpunk-themed dashboard, it simulates 36-month learning trajectories using Monte Carlo methods — helping you see how daily habits shape outcomes over time.

> **⚠️ Disclaimer:** This tool simulates learning patterns — it does not predict income, careers, or success. It visualizes uncertainty and explains cognitive trade-offs honestly.

---

## 🎯 What It Does

- **Simulates skill growth** over a 36-month horizon with monthly updates
- **Models uncertainty** using 100 Monte Carlo runs per configuration
- **Compares strategies** across three preset scenarios (Steady, Grind, Inconsistent)
- **Detects cognitive biases** (Present Bias, Planning Fallacy, Scarcity Mindset) based on your input configuration
- **Visualizes trade-offs** between burnout risk and skill accumulation

---

## ✨ Features

| Feature | Description |
|---|---|
| **Real-Time Trajectory Graph** | Compares your custom configuration against three preset scenarios |
| **Monte Carlo Uncertainty Bands** | Shows mean, P25, and P75 skill trajectories across 100 simulations |
| **Burnout vs Skill Trade-off** | Scatter plot showing how burnout accumulates relative to skill growth |
| **Burnout Forecast** | Time-series of your burnout risk with a danger threshold annotation |
| **Cognitive Bias Detection** | Rule-based analysis flags Present Bias, Planning Fallacy, and Scarcity Mindset |
| **Scenario Presets** | One-click presets for Average, Grind, and Custom strategies |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **Vanilla CSS** — Cyberpunk/glassmorphism dark theme with `Outfit` font from Google Fonts
- **Vanilla JavaScript** — No frameworks, no build step
- **Chart.js 4.4.7** — All chart rendering (via CDN)
- **chartjs-plugin-annotation** — Danger threshold annotations on charts

---

## 📁 Project Structure

```
Skill Trajectories/
├── index.html          # Main dashboard page
├── style.css           # Cyborg dark theme (glassmorphism, neon accents)
├── simulation.js       # Core simulation engine (monthly loop, Monte Carlo, aggregation)
├── scenarios.js        # Three preset scenario definitions
├── charts.js           # Chart.js configuration and rendering (4 charts)
├── biases.js           # Cognitive bias detection rules and explanations
├── app.js              # Main controller — wires inputs → simulation → charts → biases
└── .gitignore
```

---

## 🚀 How to Run

This is a **zero-dependency, static web app**. No build step, no `npm install`.

### Option 1 — Open Directly
Just open `index.html` in any modern browser.

### Option 2 — Local Server (recommended for no CORS issues)
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```
Then visit `http://localhost:8000`.

### Option 3 — Deployed on Vercel
The project includes a `.vercel` config and can be deployed directly to Vercel as a static site.

---

## 🔬 How the Simulation Works

### Input Parameters
| Parameter | Range | Effect |
|---|---|---|
| Daily Learning Hours | 0–6 hrs | Primary driver of skill growth |
| Practice Quality | Low / Medium / High | Multiplier on learning efficiency (0.8× / 1.0× / 1.2×) |
| Sleep / Regeneration | 4–9 hrs | Below 6 hrs triggers a sleep penalty; reduces burnout recovery |
| Distraction Level | 0–4 hrs | Competes with study time allocation |
| Financial Stress | Low / Medium / High | Increases noise, burnout sensitivity, and consistency variability |

### Core Loop (per month)
1. **Learning Efficiency** is updated based on current burnout and sleep
2. **Skill Growth** is computed with diminishing returns `1 / (1 + S/100)`
3. **Burnout Risk** accumulates from study intensity, modulated by sleep and financial stress
4. If burnout exceeds `0.7`, efficiency drops by 15% (compounding penalty)

### Monte Carlo
Each configuration runs **100 stochastic simulations** with Gaussian noise scaled by financial stress. Results are aggregated into:
- **Mean trajectory** — expected outcome
- **P25 / P75 bands** — interquartile range showing realistic spread

### Preset Scenarios

| Scenario | Study | Quality | Sleep | Stress | Strategy |
|---|---|---|---|---|---|
| **A — Steady & Sustainable** | 2 hrs | High | 8 hrs | Low | Consistency over intensity |
| **B — Intense Grind** | 6 hrs | Medium | 5 hrs | Medium | Maximum hours, high burnout risk |
| **C — Inconsistent Bursts** | 4 hrs | Low | 6 hrs | High | Erratic pattern, wide uncertainty |

---

## 🧩 Architecture

```
User Inputs (sliders/selects)
       │
       ▼
   app.js ──────────────────────────────────────┐
       │                                         │
       ├─→ simulation.js ─→ runMonteCarloSimulation()
       │         │                                │
       │         └─→ runSingleSimulation() ×100   │
       │                                         │
       ├─→ scenarios.js ─→ runAllScenarios()      │
       │                                         │
       ├─→ charts.js ─→ 4 Chart.js renders       │
       │                                         │
       └─→ biases.js ─→ detectBiases()           │
                                                  ▼
                                         Dashboard UI
```

---

## 📊 Visualizations

1. **Skill Growth: Presets vs You** — Line chart comparing all three scenarios against your custom trajectory
2. **Burnout vs Skill Trade-off** — Scatter plot with parametric traces and a danger zone annotation
3. **Burnout Forecast** — Area chart of your burnout risk over time with a 0.7 danger threshold line
4. **Cognitive Analysis** — Text-based panel with bias cards that appear contextually

---

## 🧠 Cognitive Biases Detected

| Bias | Trigger | Description |
|---|---|---|
| **Present Bias** | Study ≤ 1 hr/day | Hyperbolic discounting — distant goals feel abstract |
| **Planning Fallacy** | Study ≥ 5 hrs + Sleep ≤ 5 hrs | Overestimating sustainable effort capacity |
| **Scarcity Mindset** | Financial Stress = High | Cognitive bandwidth narrows to immediate survival |

---

## 📄 License

This project is for educational and demonstration purposes.

---

*Built with intention — not to predict, but to understand.*
