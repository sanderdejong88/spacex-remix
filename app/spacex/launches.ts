export interface Core {
  core_serial: string
  flight: number
  block: number
  gridfins: boolean
  legs: boolean
  reused: boolean
  land_success: boolean
  landing_intent: boolean
  landing_type: string
  landing_vehicle: string
}

export interface FirstStage {
  cores: Core[]
}

export interface OrbitParams {
  reference_system: string
  regime: string
  longitude?: any
  semi_major_axis_km?: any
  eccentricity?: any
  periapsis_km?: any
  apoapsis_km?: any
  inclination_deg?: any
  period_min?: any
  lifespan_years?: any
  epoch?: any
  mean_motion?: any
  raan?: any
  arg_of_pericenter?: any
  mean_anomaly?: any
}

export interface Payload {
  payload_id: string
  norad_id: any[]
  reused: boolean
  customers: string[]
  nationality: string
  manufacturer: string
  payload_type: string
  payload_mass_kg: number
  payload_mass_lbs: number
  orbit: string
  orbit_params: OrbitParams
}

export interface SecondStage {
  block: number
  payloads: Payload[]
}

export interface Fairings {
  reused: boolean
  recovery_attempt: boolean
  recovered?: any
  ship: string
}

export interface Rocket {
  rocket_id: string
  rocket_name: string
  rocket_type: string
  first_stage: FirstStage
  second_stage: SecondStage
  fairings: Fairings
}

export interface Telemetry {
  flight_club?: any
}

export interface LaunchSite {
  site_id: string
  site_name: string
  site_name_long: string
}

export interface Links {
  mission_patch: string
  mission_patch_small: string
  reddit_campaign: string
  reddit_launch: string
  reddit_recovery?: any
  reddit_media?: any
  presskit?: any
  article_link?: any
  wikipedia: string
  video_link: string
  youtube_id: string
  flickr_images: any[]
}

export interface Launch {
  flight_number: number
  mission_name: string
  mission_id: any[]
  launch_year: string
  launch_date_unix: number
  launch_date_utc: Date
  launch_date_local: Date
  is_tentative: boolean
  tentative_max_precision: string
  tbd: boolean
  launch_window?: any
  rocket: Rocket
  ships: string[]
  telemetry: Telemetry
  launch_site: LaunchSite
  launch_success: boolean
  links: Links
  details?: any
  upcoming: boolean
  static_fire_date_utc: Date
  static_fire_date_unix: number
  timeline?: any
  crew?: any
}

export async function getLaunches() {
  const res = await fetch(
    `https://api.spacexdata.com/v3/launches?${new URLSearchParams([
      [
        'filter',
        'flight_number,mission_name,details,upcoming,launch_date_local,links',
      ],
      ['limit', '25'],
      ['sort', 'launch_date_local'],
      ['order', 'desc'],
      ['offset', '1'], // Broken data in the API
    ])}`
  )

  return (await res.json()) as Launch[]
}

export async function getLaunch(id: string) {
  const res = await fetch(`https://api.spacexdata.com/v3/launches/${id}`)
  if (res.status !== 200) {
    throw new Error('Launch not found. Call Elon please...')
  }
  return (await res.json()) as Launch
}
