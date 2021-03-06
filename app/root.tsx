import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import type { MetaFunction } from 'remix'
import styles from './tailwind.css'
import { ErrorBoundaryComponent } from '@remix-run/server-runtime/routeModules'

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' }
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-gray-100'>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Oops...</h1>
        <p>{error.message}</p>
        <Scripts />
      </body>
    </html>
  )
}
