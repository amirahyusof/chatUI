
import Sidebar from "./sidebar";

export default function Layout({ children }){
  return (
    <div className="flex max-h-screen flex-col">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  )
}