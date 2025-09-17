
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/login') // da ne udara /tasks dok nisi ulogovan
}


