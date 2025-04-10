import { Clock, LogIn, LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../customer_components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../customer_components/ui/table"

// Mock activity data
const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Login",
    timestamp: "2 minutes ago",
    icon: LogIn,
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Updated Profile",
    timestamp: "15 minutes ago",
    icon: User,
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Logout",
    timestamp: "1 hour ago",
    icon: LogOut,
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Changed Settings",
    timestamp: "3 hours ago",
    icon: Settings,
  },
  {
    id: 5,
    user: {
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "Login",
    timestamp: "5 hours ago",
    icon: LogIn,
  },
]

export function RecentActivities() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">{activity.user.name}</div>
                  <div className="text-xs text-muted-foreground">{activity.user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <activity.icon className="h-4 w-4 text-muted-foreground" />
                <span>{activity.action}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{activity.timestamp}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
