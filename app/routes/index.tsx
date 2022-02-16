import { LoaderFunction, redirect } from 'remix'

export const loader: LoaderFunction = async (): Promise<Response> => {
  return redirect('/launches/')
}
