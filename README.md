# Skill Trajectories — Human Capital Decision Intelligence

A dark-mode enterprise SaaS dashboard used by universities and research labs to simulate skill growth trajectories under financial stress, cognitive load, and uncertainty. **Skill Trajectories** focuses on visualizing the hidden costs of compounding variables over long-term temporal horizons without making absolute predictions.

![Platform Overview](public/overview-placeholder.png) <!-- Update with actual screenshot later -->

## Features

- **Decision Builder (`/`)**: A comprehensive configuration panel to adjust parameters and visualize outcomes.
  - **Scenario Presets**: Instantly apply Stress, Stable, High Mentor, or Burnout Prone templates.
  - **Constraints & Behaviors**: Sliders for time allocation, financial stress, cognitive load, present bias, scarcity mindset, etc.
  - **Model Diagnostics**: Computes derived indicators like Growth Coefficient, Volatility Index, Burnout Decay Rate, Recovery Elasticity, and State Rigidity.
  
- **Future Landscape Visualization**:
  - **Monte Carlo Geometry**: SVG-rendered trajectories forming 95% Confidence Interval envelopes reflecting variance across 10,000 simulations.
  - **Variance Heat Bands**: Visual atmospheric indicator behind curves showing volatility concentrations.
  - **Irreversibility Boundary**: A dynamically placed "Point of No Return" line highlighting critical decay states based on current loads.
  - **Counterfactual Overlay (Compare Baseline)**: Locks a transparent baseline curve to visually compare A/B scenarios instantly as inputs change.
  - **Path Fragility Indicator**: Real-time classification of the trajectory's vulnerability (cyan/amber/red).
  - **Regret Accumulator**: Mini-graph correlating volatility with long-term systemic regret.

- **Trade-Off Analyzer (`/tradeoff-analyzer`)**:
  - Radar surface comparing Baseline against over-ridden metrics.
  - **Sensitivity Sweep**: Enables delta-calculation against variables incremented by +10, estimating impacts on Outcome & Volatility.

- **Policy Mode (`/policy-view`)**: 
  - Sub-population cohort simulation (N=1000). 
  - **Intervention Slider**: Inject "Mentorship Coverage" to a percentage of the population and instantly watch outcome distribution heatmaps respond.

## Tech Stack

Built from the ground up focusing on modularity, readability, and production-grade separation of concerns.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom slate, cyan, amber, and red dark-mode design system.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) driving centralized reactivity without prop drilling.
- **Visualizations**: Pure native `<svg>` logic. Zero dependency on charting boundaries, ensuring minimum possible bundle footprint.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.17+) installed.

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/Rakshaad-Kolhe/Skill-Trajectories.git
   cd skill-trajectories
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure

```text
skill-trajectories/
├── app/                  # Next.js App Router (pages and layouts)
│   ├── page.tsx          # Decision Lab View (Home)
│   ├── tradeoff-analyzer/# Trade-Off Analyzer Route
│   └── policy-view/      # Policy Mode Route
├── components/           # Modular React components
│   ├── decision-builder/ # Left panel controls
│   ├── trajectory/       # Center graph components
│   ├── tradeoff/         # Radar and A/B charts
│   ├── policy/           # Cohort heatmaps and distributions
│   ├── shared/           # Sliders, toggles, badges
│   └── layout/           # AppShell, TopBar, SideNavigation
├── store/                # Zustand global state (simulationStore.ts)
├── engine/               # Simulation algorithms (runSimulation.ts)
└── hooks/                # Bridging hooks (useSimulation.ts)
```

## Design Principles

1. **Deterministic Yet Varied**: Core math runs deterministically based on seeded randomness, feeding arrays directly into SVG bounds.
2. **Sharp & Focused UX**: Minimal glow, sharp borders, tabular mono fonts. Highly Bloomberg-esq terminal aesthetic.
3. **No Soft Predictions**: Focuses entirely on variance, constraints, efficiency multipliers and risk factors rather than predicting raw dollars.

## License

This project is licensed under the MIT License.
