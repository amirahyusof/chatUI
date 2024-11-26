
import Sidebar from "./sidebar";

export default function Layout({ children }){
  return (
    <div className="flex max-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}