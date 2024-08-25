import { auth } from "@/auth";


const SettingsPage = async () => {
    const session = await auth()
  return (
    <div>
      {JSON.stringfy(session)}
    </div>
  )
}

export default SettingsPage
