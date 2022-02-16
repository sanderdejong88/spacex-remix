import { Form, useActionData, useSubmit, useTransition } from '@remix-run/react'
import { ActionFunction, redirect } from 'remix'
import { FormEventHandler, useState } from 'react'

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()
  const email = body.get('email')
  const password = body.get('password')

  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
    return redirect('/')
  }

  return {
    error: 'Username or password is wrong...',
  }
}

export default function () {
  const actionData = useActionData()
  const submit = useSubmit()
  const transition = useTransition()

  const hasPostError = !!actionData?.error
  const [errorHidden, setErrorHiden] = useState<boolean>(false)

  const hideError = () => {
    if (hasPostError) {
      setErrorHiden(true)
    }
  }

  const submitForm: FormEventHandler = (event) => {
    setErrorHiden(false)
    submit(event.currentTarget as HTMLFormElement)
  }

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-40 w-auto' src='/iO.svg' alt='Workflow' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <Form className='mt-8 space-y-6' method='post' onSubmit={submitForm}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                required
                autoComplete='off'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                onChange={hideError}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                autoComplete='off'
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                onChange={hideError}
              />
            </div>
          </div>
          <p>{transition.state}</p>

          {actionData?.error && !errorHidden && (
            <p className='bg-red-300 p-3'>{actionData.error}</p>
          )}

          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Sign in
          </button>
        </Form>
      </div>
    </div>
  )
}
