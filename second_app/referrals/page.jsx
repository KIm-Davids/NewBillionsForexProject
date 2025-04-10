"use client"

import { useState } from "react"
import { Bell, Copy, Share2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReferralsPage() {
  const { toast } = useToast()
  const [referralLink, setReferralLink] = useState("https://finance-portal.com/ref/JOHN25")

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: message,
    })
  }

  return (
    <div className="flex flex-col p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <Bell size={16} />
          </Button>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Referrals</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">3 pending verification</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Earnings</CardDescription>
            <CardTitle className="text-3xl">$240.00</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">$20 per successful referral</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Reward Tier</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <span>Silver</span>
              <Badge variant="outline" className="text-xs">
                3 more to qualify
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="h-2 mb-2" />
            <div className="text-xs text-muted-foreground">12/15 referrals to next tier</div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link with friends to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input value={referralLink} readOnly className="pr-10" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => copyToClipboard(referralLink, "Referral link copied to clipboard")}
              >
                <Copy size={16} />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 sm:flex-none">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">How it works</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">1. Share Your Link</h4>
                <p className="text-sm text-muted-foreground">
                  Share your unique referral link with friends and colleagues
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">2. Friends Sign Up</h4>
                <p className="text-sm text-muted-foreground">
                  When they sign up using your link, they're connected to your account
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">3. Earn Rewards</h4>
                <p className="text-sm text-muted-foreground">
                  Earn $20 for each friend who completes their first transaction
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Tabs */}
      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="all">All Referrals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Referrals Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">AB</span>
                    </div>
                    <div>
                      <div className="font-medium">Alex Brown</div>
                      <div className="text-xs text-muted-foreground">alex.brown@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Apr 5, 2025</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>12</TableCell>
                <TableCell className="text-green-600 dark:text-green-400">$20.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">SJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-xs text-muted-foreground">sarah.j@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Apr 2, 2025</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>8</TableCell>
                <TableCell className="text-green-600 dark:text-green-400">$20.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">MT</span>
                    </div>
                    <div>
                      <div className="font-medium">Michael Thompson</div>
                      <div className="text-xs text-muted-foreground">michael.t@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Mar 28, 2025</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                  >
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell className="text-muted-foreground">$0.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">EW</span>
                    </div>
                    <div>
                      <div className="font-medium">Emma Wilson</div>
                      <div className="text-xs text-muted-foreground">emma.w@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Mar 25, 2025</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>5</TableCell>
                <TableCell className="text-green-600 dark:text-green-400">$20.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">JD</span>
                    </div>
                    <div>
                      <div className="font-medium">James Davis</div>
                      <div className="text-xs text-muted-foreground">james.d@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Mar 20, 2025</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                  >
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell className="text-muted-foreground">$0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center py-4">
          <div className="text-sm text-muted-foreground">Showing 5 of 12 referrals</div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Missing DollarSign icon import
import { DollarSign } from "lucide-react"
