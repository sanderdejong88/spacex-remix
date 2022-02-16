import { LoaderFunction } from 'remix'
import { useLoaderData } from '@remix-run/react'
import { getLaunch, Launch } from '~/spacex/launches'
import { getRocket, Rocket } from '~/spacex/rockets'

type LoaderDate = {
  launch: Launch
  rocket: Rocket
}

export const loader: LoaderFunction = async ({ params }) => {
  if (params.id) {
    const launch = await getLaunch(params.id)
    const rocket = await getRocket(launch.rocket.rocket_id)
    return {
      launch,
      rocket,
    }
  }
  return undefined
}

export default function () {
  const { launch, rocket } = useLoaderData<LoaderDate>()

  return (
    <div className='bg-white shadow-lg rounded-lg m-5 p-8'>
      <header className='flex flex-row pb-6 mb-6'>
        {launch.links.mission_patch_small && (
          <img
            src={launch.links.mission_patch_small}
            className='w-40 h-auto mr-4'
            alt='Mission Patch'
          />
        )}
        <div>
          <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
            {launch.launch_date_local &&
              new Date(launch.launch_date_local).toDateString()}
          </time>
          <h1 className='text-5xl font-semibold text-gray-900'>
            {launch.mission_name}
          </h1>
          <p className='mb-1 text-xl font-light text-gray-500 dark:text-gray-400'>
            {launch.details}
          </p>
          <div>
            {launch.links.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target='_blank'
                className='hover:underline'
              >
                <span>Wikipedia</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  className='inline ml-1 align-super'
                >
                  <path d='M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z'></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      </header>
      <div>
        <h2 className='text-2xl font-semibold text-gray-900'>
          {rocket.rocket_name}
        </h2>
        <dl>
          <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Cost per launch
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {rocket.cost_per_launch}
            </dd>
          </div>
          <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Mass</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {rocket.mass.kg}
            </dd>
          </div>
        </dl>
        <div className='container grid grid-cols-10 gap-2 mx-auto'>
          {rocket.flickr_images.map((photo) => (
            <a href={photo} key={photo} target='_blank'>
              <img src={photo} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <h1>O no, o no, o nooooooo</h1>
}
