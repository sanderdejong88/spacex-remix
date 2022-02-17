import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getLaunches, Launch } from '~/spacex/launches'
import { LoaderFunction } from 'remix'

type LoaderData = {
  launches: Launch[]
}

export const loader: LoaderFunction = async (): Promise<
  Response | LoaderData
> => {
  const launches = await getLaunches()

  return {
    launches,
  }
}

export default function Index() {
  const { launches } = useLoaderData<LoaderData>()

  return (
    <div className='grid grid-cols-5 gap-3'>
      <div className='p-3'>
        <ol className='relative border-l border-gray-200 dark:border-gray-700'>
          {launches.map((launch: Launch) => (
            <li
              key={launch.flight_number}
              className='mb-2 ml-4 hover:bg-gray-100 px-1 py-2'
            >
              <Link
                prefetch='intent'
                to={`/launches/${launch.flight_number.toString()}`}
              >
                <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                  {launch.launch_date_local &&
                    new Date(launch.launch_date_local).toDateString()}
                </time>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {launch.mission_name}
                </h3>
                <p className='mb-1 text-base font-normal text-gray-500 dark:text-gray-400 line-clamp-3'>
                  {launch.details}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <div className='col-span-4 p-3'>
        <Outlet />
      </div>
    </div>
  )
}
