export interface RocketInventory {
  id: string
  active: boolean
  country: string
  name: string
  type: string
  diameter: {meters: number}
  height: {meters: number}
  mass: {kg: number}
  description: string
  boosters: string
}

export interface RocketInventoryData {
  rockets: RocketInventory[];
}

