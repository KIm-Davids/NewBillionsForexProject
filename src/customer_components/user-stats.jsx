import { ArrowDown, ArrowUp, Users, UserCheck, UserMinus, UserPlus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../customer_components/ui/card"

export function UserStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-purple-700/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,248</div>
          <p className="text-xs text-muted-foreground">+180 from last month</p>
        </CardContent>
      </Card>
      <Card className="border-purple-700/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <UserCheck className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">624</div>
          <div className="flex items-center text-xs text-green-500">
            <ArrowUp className="mr-1 h-3 w-3" />
            <span>12% increase</span>
          </div>
        </CardContent>
      </Card>
      <Card className="border-purple-700/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Signups</CardTitle>
          <UserPlus className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <div className="flex items-center text-xs text-green-500">
            <ArrowUp className="mr-1 h-3 w-3" />
            <span>8% increase</span>
          </div>
        </CardContent>
      </Card>
      <Card className="border-purple-700/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
          <UserMinus className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <div className="flex items-center text-xs text-red-500">
            <ArrowDown className="mr-1 h-3 w-3" />
            <span>3% decrease</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
