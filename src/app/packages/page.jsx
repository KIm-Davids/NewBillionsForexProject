"use client"

import { Bell, Check, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PackagesPage() {
  return (
    <div className="flex flex-col p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Packages</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <Bell size={16} />
          </Button>
        </div>
      </div>

      {/* Current Package */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Current Package</CardTitle>
          <CardDescription>Premium Plan - Active until May 10, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Package Details</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  <span>Unlimited transactions</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  <span>Lower transaction fees (0.5%)</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                  <span>Higher withdrawal limits ($10,000/day)</span>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing cycle:</span>
                  <span>Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing date:</span>
                  <span>May 10, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment method:</span>
                  <span className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Card ending in 4242
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Monthly fee:</span>
                  <span>$49.99</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">Change Billing Cycle</Button>
          <Button variant="outline">Update Payment Method</Button>
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
          >
            Cancel Subscription
          </Button>
        </CardFooter>
      </Card>

      {/* Available Packages */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Packages</h2>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">Yearly Billing (Save 20%)</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Basic Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Plan</CardTitle>
                  <CardDescription>For individuals just getting started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    $19.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 min-h-[200px]">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Up to 50 transactions/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Standard customer support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Standard transaction fees (1.5%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Withdrawal limit: $2,000/day</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Downgrade
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Premium Plan</CardTitle>
                    <Badge>Current Plan</Badge>
                  </div>
                  <CardDescription>Perfect for active users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    $49.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 min-h-[200px]">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Unlimited transactions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Lower transaction fees (0.5%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Withdrawal limit: $10,000/day</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise Plan</CardTitle>
                  <CardDescription>For businesses with high volume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    $99.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 min-h-[200px]">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Unlimited transactions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Enterprise analytics & reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Lowest transaction fees (0.25%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Unlimited withdrawal limit</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Multi-user access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upgrade</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Basic Plan Yearly */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Plan</CardTitle>
                  <CardDescription>For individuals just getting started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    $191.90<span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Save $48 compared to monthly</div>
                  <ul className="space-y-2 min-h-[200px]">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Up to 50 transactions/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Standard customer support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Standard transaction fees (1.5%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Withdrawal limit: $2,000/day</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Downgrade
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan Yearly */}
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Premium Plan</CardTitle>
                    <Badge>Current Plan</Badge>
                  </div>
                  <CardDescription>Perfect for active users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    $479.90<span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Save $120 compared to monthly</div>
                  <ul className="space-y-2 min-h-[200px]">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Unlimited transactions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Lower transaction fees (0.5%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Withdrawal limit: $10,000/day</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan Yearly */}
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise Plan</CardTitle>
                  <CardDescription>For businesses with high volume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    $959.90<span className="text-sm font-normal text-muted-foreground">/year</span>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Save $240 compared to monthly</div>
                  <ul className="space-y-2 min-h-[200px]">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Unlimited transactions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Enterprise analytics & reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Lowest transaction fees (0.25%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Unlimited withdrawal limit</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>Multi-user access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      <span>API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upgrade</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Custom Package */}
      <Card>
        <CardHeader>
          <CardTitle>Need a Custom Solution?</CardTitle>
          <CardDescription>
            Contact our sales team for a tailored package that meets your specific needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our enterprise solutions can be customized to fit your business requirements. Whether you need higher
            transaction limits, custom integrations, or specialized reporting, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Dedicated Account Manager</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized support from a dedicated account manager who understands your business needs.
              </p>
            </div>
            <div className="flex-1 p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Custom API Integration</h3>
              <p className="text-sm text-muted-foreground">
                Seamlessly integrate our platform with your existing systems through custom API development.
              </p>
            </div>
            <div className="flex-1 p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Volume Discounts</h3>
              <p className="text-sm text-muted-foreground">
                Benefit from reduced transaction fees based on your volume and business requirements.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">Schedule a Consultation</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
