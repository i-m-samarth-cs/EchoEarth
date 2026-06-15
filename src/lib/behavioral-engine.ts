export type FuturePath = "default" | "pragmatist" | "regeneration";

export interface FutureState {
  path: FuturePath;
  title: string;
  description: string;
  visualTheme: string;
  temperatureDelta: string;
  airQuality: string;
}

export interface HabitRow {
  category: string;
  choice: string;
  impact: string;
}

export interface ImpactMetrics {
  waterDepletion: string;
  deforestation: string;
  carbonEmitted: string;
  phase: string;
  phaseTitle: string;
  phaseSubtitle: string;
  habitRows: HabitRow[];
  commuteScore: number;
  dietScore: number;
  energyScore: number;
  totalScore: number;
}

const CHOICE_LABELS: Record<string, Record<string, string>> = {
  commute: {
    car: "The Solo Drive",
    transit: "The Transit Web",
    bike: "The Two-Wheel Glide",
    remote: "The Remote Oasis",
  },
  diet: {
    "meat-heavy": "The Carnivore",
    mixed: "The Flexitarian",
    plant: "The Plant-Based",
  },
  energy: {
    standard: "Grid Standard",
    smart: "Smart Saver",
    solar: "Rooftop Solar",
  },
};

const IMPACT_SCORES: Record<string, Record<string, number>> = {
  commute: { car: 10, transit: 3, bike: 0, remote: 1 },
  diet: { "meat-heavy": 15, mixed: 8, plant: 3 },
  energy: { standard: 12, smart: 7, solar: 2 },
};

function getChoiceLabel(category: string, id: string): string {
  return CHOICE_LABELS[category]?.[id] ?? id;
}

function getImpactScore(category: string, id: string): number {
  return IMPACT_SCORES[category]?.[id] ?? 5;
}

export interface PhaseDetail {
  phase: string;
  title: string;
  subtitle: string;
  category: string;
  choice: string;
  impact: string;
  metric: string;
  metricLabel: string;
  insight: string;
}

const CATEGORY_META: Record<string, { label: string; phase: string }> = {
  commute: { label: "Commute", phase: "Phase 01" },
  diet: { label: "Diet", phase: "Phase 02" },
  energy: { label: "Energy", phase: "Phase 03" },
};

function impactLevel(score: number, thresholds: [number, number]): string {
  if (score <= thresholds[0]) return "Low";
  if (score <= thresholds[1]) return "Moderate";
  return "High";
}

export function getPhaseDetail(category: string, choiceId: string): PhaseDetail {
  const score = getImpactScore(category, choiceId);
  const choice = getChoiceLabel(category, choiceId);
  const meta = CATEGORY_META[category] ?? { label: category, phase: "Phase" };

  if (category === "commute") {
    const weeklyCo2 = Math.round(4 + score * 1.8);
    return {
      phase: meta.phase,
      title: "Mobility Pattern Logged",
      subtitle: "Your commute choice shapes daily emissions and urban congestion load.",
      category: meta.label,
      choice,
      impact: impactLevel(score, [1, 5]),
      metric: `${weeklyCo2} kg CO2e`,
      metricLabel: "Weekly transport emissions",
      insight:
        score >= 8
          ? "Solo driving adds the highest per-trip carbon load. Transit or remote work could cut this by 60–90%."
          : score >= 3
          ? "A solid middle path — small schedule tweaks could push this into the low-impact zone."
          : "Excellent mobility footprint. You're among the lowest emitters in this category.",
    };
  }

  if (category === "diet") {
    const waterLiters = 2800 + score * 520;
    return {
      phase: meta.phase,
      title: "Dietary Footprint Mapped",
      subtitle: "Food choices drive water use, land conversion, and methane output.",
      category: meta.label,
      choice,
      impact: impactLevel(score, [5, 10]),
      metric: `${waterLiters.toLocaleString()} L`,
      metricLabel: "Weekly water footprint",
      insight:
        score >= 12
          ? "Meat-heavy diets carry the largest hidden water and land cost. One plant-based day weekly makes a measurable dent."
          : score >= 6
          ? "Flexitarian habits balance nutrition and impact. Shifting one more meal plant-forward lowers your shadow."
          : "Plant-forward eating keeps your dietary shadow minimal.",
    };
  }

  const monthlyKwh = 180 + score * 22;
  return {
    phase: meta.phase,
    title: "Energy Profile Analyzed",
    subtitle: "Home energy use feeds grid demand and peak-hour fossil generation.",
    category: meta.label,
    choice,
    impact: impactLevel(score, [4, 8]),
    metric: `${monthlyKwh} kWh`,
    metricLabel: "Estimated monthly draw",
    insight:
      score >= 10
        ? "Standard grid use during peak hours strains fossil plants. Smart scheduling or solar offsets this sharply."
        : score >= 5
        ? "Smart habits are helping. Shifting heavy loads off 4–9 PM unlocks another 20% reduction."
        : "Solar or near-zero draw — your home energy shadow is remarkably light.",
  };
}

export function calculateImpact(choices: Record<string, string>): ImpactMetrics {
  const commute = choices.commute ?? "car";
  const diet = choices.diet ?? "meat-heavy";
  const energy = choices.energy ?? "standard";

  const commuteScore = getImpactScore("commute", commute);
  const dietScore = getImpactScore("diet", diet);
  const energyScore = getImpactScore("energy", energy);
  const totalScore = commuteScore + dietScore + energyScore;

  const waterLiters = 4200 + dietScore * 740 + commuteScore * 120;
  const deforestation = 28 + dietScore * 28 + commuteScore * 4;
  const carbonKg = 8 + commuteScore * 2.4 + dietScore * 1.6 + energyScore * 1.2;

  const habitRows: HabitRow[] = [
    {
      category: "Commute",
      choice: getChoiceLabel("commute", commute),
      impact: commuteScore <= 1 ? "Low" : commuteScore <= 5 ? "Moderate" : "High",
    },
    {
      category: "Diet",
      choice: getChoiceLabel("diet", diet),
      impact: dietScore <= 5 ? "Low" : dietScore <= 10 ? "Moderate" : "High",
    },
    {
      category: "Energy",
      choice: getChoiceLabel("energy", energy),
      impact: energyScore <= 4 ? "Low" : energyScore <= 8 ? "Moderate" : "High",
    },
  ];

  const isComplete = Boolean(choices.commute && choices.diet && choices.energy);

  let phase: string;
  let phaseTitle: string;
  let phaseSubtitle: string;

  if (!isComplete) {
    phase = "Phase 01";
    phaseTitle = "2050 Simulation Ready";
    phaseSubtitle = "Awaiting habit parameters...";
  } else if (totalScore <= 10) {
    phase = "Phase 04";
    phaseTitle = "Regenerative Trajectory Locked";
    phaseSubtitle = "Low-impact habits mapped — optimistic 2050 projection active.";
  } else if (totalScore <= 22) {
    phase = "Phase 03";
    phaseTitle = "Pragmatic Shift Detected";
    phaseSubtitle = "Moderate footprint — alternate futures within reach.";
  } else {
    phase = "Phase 02";
    phaseTitle = "Baseline Shadow Exposed";
    phaseSubtitle = "High-impact habits detected — scratch to reveal supply chains.";
  }

  return {
    waterDepletion: `${waterLiters.toLocaleString()} L`,
    deforestation: `${deforestation.toLocaleString()} m²`,
    carbonEmitted: `${Math.round(carbonKg)} kg CO2e`,
    phase,
    phaseTitle,
    phaseSubtitle,
    habitRows,
    commuteScore,
    dietScore,
    energyScore,
    totalScore,
  };
}

export function calculateFutures(currentChoices: Record<string, string>): FutureState[] {
  // A mock behavior engine that extrapolates 3 futures based on current choices
  
  return [
    {
      path: "default",
      title: "The Baseline (2050)",
      description: "If millions follow the current trajectory. Higher temperatures, increased congestion, and fragile ecosystems.",
      visualTheme: "bg-orange-950/80 border-orange-800 text-orange-200",
      temperatureDelta: "+2.4°C",
      airQuality: "Poor (AQI 150+)",
    },
    {
      path: "pragmatist",
      title: "The Pragmatic Shift (2050)",
      description: "Based on adopting smart, realistic swaps. Moderate warming, stabilized grids, and cleaner urban centers.",
      visualTheme: "bg-blue-950/80 border-blue-800 text-blue-200",
      temperatureDelta: "+1.6°C",
      airQuality: "Moderate (AQI 60)",
    },
    {
      path: "regeneration",
      title: "The Climate Hero (2050)",
      description: "A radically redesigned lifestyle. Thriving circular ecosystems, zero-emission transit, and restored nature.",
      visualTheme: "bg-green-950/80 border-green-800 text-green-200",
      temperatureDelta: "+1.2°C",
      airQuality: "Excellent (AQI 20)",
    }
  ];
}
