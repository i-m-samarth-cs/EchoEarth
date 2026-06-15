import { PersonaCardProps } from "@/components/ui/testimonial-cards";

export const localPersonas: PersonaCardProps[] = [
  {
    id: "p1",
    name: "Maya T.",
    action: "Swapped car commute for an e-bike 3x a week.",
    impact: "-420kg CO2/year",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "p2",
    name: "James L.",
    action: "Installed a smart thermostat and shifted energy use off-peak.",
    impact: "-315kg CO2/year",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "p3",
    name: "Sarah K.",
    action: "Adopted a 90% plant-based diet for weekday lunches.",
    impact: "-650kg CO2/year",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "p4",
    name: "David R.",
    action: "Started community composting in the neighborhood.",
    impact: "-150kg CO2/year",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
];

export const dayBuilderOptions = {
  commute: [
    { id: "car", title: "The Solo Drive", icon: "car", baselineImpact: 10 },
    { id: "transit", title: "The Transit Web", icon: "bus", baselineImpact: 3 },
    { id: "bike", title: "The Two-Wheel Glide", icon: "bike", baselineImpact: 0 },
    { id: "remote", title: "The Remote Oasis", icon: "home", baselineImpact: 1 },
  ],
  diet: [
    { id: "meat-heavy", title: "The Carnivore", icon: "steak", baselineImpact: 15 },
    { id: "mixed", title: "The Flexitarian", icon: "salad", baselineImpact: 8 },
    { id: "plant", title: "The Plant-Based", icon: "leaf", baselineImpact: 3 },
  ],
  energy: [
    { id: "standard", title: "Grid Standard", icon: "plug", baselineImpact: 12 },
    { id: "smart", title: "Smart Saver", icon: "cpu", baselineImpact: 7 },
    { id: "solar", title: "Rooftop Solar", icon: "sun", baselineImpact: 2 },
  ],
};
