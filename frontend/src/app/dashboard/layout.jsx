import ProtectedLayout from "@/components/protectedLayout"



export default function DashboardLayout({ children }) {
  return (
    <ProtectedLayout>
      {children}
    </ProtectedLayout>
  )
}
