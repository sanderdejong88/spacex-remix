export interface Size {
  meters: number
  feet: number
}

export interface Mass {
  kg: number
  lb: number
}

export interface PayloadWeight {
  id: string
  name: string
  kg: number
  lb: number
}

export interface Thrust {
  kN: number
  lbf: number
}

export interface FirstStage {
  reusable: boolean
  engines: number
  fuel_amount_tons: number
  burn_time_sec: number
  thrust_sea_level: Thrust
  thrust_vacuum: Thrust
}

export interface CompositeFairing {
  height: Size
  diameter: Size
}

export interface Payloads {
  option_1: string
  composite_fairing: CompositeFairing
}

export interface SecondStage {
  reusable: boolean
  engines: number
  fuel_amount_tons: number
  burn_time_sec: number
  thrust: Thrust
  payloads: Payloads
}

export interface Isp {
  sea_level: number
  vacuum: number
}

export interface Engines {
  number: number
  type: string
  version: string
  layout: string
  isp: Isp
  engine_loss_max: number
  propellant_1: string
  propellant_2: string
  thrust_sea_level: Thrust
  thrust_vacuum: Thrust
  thrust_to_weight: number
}

export interface LandingLegs {
  number: number
  material?: any
}

export interface Rocket {
  id: number
  active: boolean
  stages: number
  boosters: number
  cost_per_launch: number
  success_rate_pct: number
  first_flight: string
  country: string
  company: string
  height: Size
  diameter: Size
  mass: Mass
  payload_weights: PayloadWeight[]
  first_stage: FirstStage
  second_stage: SecondStage
  engines: Engines
  landing_legs: LandingLegs
  flickr_images: string[]
  wikipedia: string
  description: string
  rocket_id: string
  rocket_name: string
  rocket_type: string
}

export async function getRocket(id: string) {
  const res = await fetch(`https://api.spacexdata.com/v3/rockets/${id}`)
  if (res.status !== 200) {
    throw new Error('Rocket not found. Call Elon please...')
  }
  return (await res.json()) as Rocket
}
