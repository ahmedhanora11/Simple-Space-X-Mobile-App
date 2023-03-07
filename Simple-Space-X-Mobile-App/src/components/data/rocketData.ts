export interface RocketInventory {
  id: string
  active: boolean
  country: string
  name: string
  type: string
  diameter: {meters: number}
  height: {meters: number}
  mass: {kg: number}
  success_rate_pct: number
  description: string
}

export interface RocketInventoryData {
  rockets: RocketInventory[];
}

