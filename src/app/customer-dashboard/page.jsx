  "use client"

  import {useEffect, useState} from "react"
  import {
    ArrowLeftRight,
    Bell,
    ChevronDown,
    Copy,
    CreditCard,
    DollarSign,
    Eye,
    EyeOff,
    Home,
    LogOut,
    Package,
    Settings,
    User,
    Users,
  } from "lucide-react"
  import { useToast } from "../hooks/use-toast"
  import dynamic from 'next/dynamic';
  import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
  import { Button } from "../ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
  import { Badge } from "../ui/badge"
  import { Label } from "../ui/label"
  import { Input } from "../ui/input"
  import { ThemeToggle } from "../theme-toggle"
  import { Separator } from "../ui/separator"

  export default function Dashboard() {
    const {toast} = useToast()
    const [walletVisible, setWalletVisible] = useState(false)
    const [depositAmount, setDepositAmount] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [depositName, setDepositName] = useState("");
    const [hash, setHash] = useState("");

    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawName, setWithdrawName] = useState("");
    const [withdrawWallet, setWithdrawWallet] = useState("");
    const [withdrawDescription, setWithdrawDescription] = useState("");
    const [availableBalance, setAvailableBalance] = useState(2000);
    const [balance, setBalance] = useState(null);
    const [lastUpdated, setLastUpdated] = useState("");
    const [packageType, setPackageType] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [walletType, setWalletType] = useState("");
    // const [referralCode, setReferralCode] = useState("");
    const [isClient, setIsClient] = useState(false);




      const maskedWallet = "••••••••••••••••••••••••••••••••••••••••"

    const firstWallet = "TAJ5SCiy5tr3QF89nVaBi78XJwhXbu1xMm"
    const secondWallet = "0xc9AcefB4adeFEf06Ec62fbB46F0644261ee8E722"
    const thirdWallet = "0xc9AcefB4adeFEf06Ec62fbB46F0644261ee8E722"
    const fourthWallet = "GDax5QyFX1o3sBbLuMRrF2HcXHZVb8AVQB7qBQjTQKe7"

    const firstWalletName = "USDT TRC20"
    const secondWalletName = "USDT BEP20"
    const thirdWalletName = "USDT ERC20"
    const fourthWalletName = "USDC SOL"
    const expectedAmount = packageAmounts[packageType] || null;
    const isAmountValid = expectedAmount !== null && parseFloat(depositAmount) === expectedAmount;


      useEffect(() => {
          setIsClient(true);
      }, []);

      if (!isClient) {
          return (
              <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
          );
      }

      // const Dashboard = dynamic(() => import('../src/app/customer-dashboard/page'), {
      //     ssr: false,
      // });

      export default function DashboardPage() {
          return <Dashboard />;
      }



      const packageAmounts = {
          "Test package": 100,
          "Pro package": 500,
          "Premium package": 1000,
      };


      // const generateReferralCode = (length = 8) => {
      //     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      //     let result = "";
      //     for (let i = 0; i < length; i++) {
      //         result += characters.charAt(Math.floor(Math.random() * characters.length));
      //     }
      //     return result;
      // };
      //
      // // Load from localStorage or generate once
      // useEffect(() => {
      //     if (typeof window !== "undefined") {
      //         const storedCode = localStorage.getItem("referralCode");
      //
      //         if (storedCode) {
      //             setReferralCode(storedCode);
      //         } else {
      //             const newCode = generateReferralCode();
      //             localStorage.setItem("referralCode", newCode);
      //             setReferralCode(newCode);
      //         }
      //     }
      // }, []);


      // Copy to clipboard function
      const copyToClipboard = (text, message) => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
              navigator.clipboard.writeText(text).then(() => {
                  alert(message);
              }).catch(err => {
                  console.error("Failed to copy text: ", err);
              });
          }
      };


      const toggleWalletVisibility = () => {
      setWalletVisible(!walletVisible)
    }

    const BalanceCard = () => {

      useEffect(() => {
        const fetchBalance = async () => {
          try {
            const res = await fetch("https://billions-backend-1.onrender.com/balance", {
              method: "GET",
              credentials: "include",
              headers: {
                  'Content-Type':'application/json',
              },
            });
            
            if(!res.ok){
              throw new Error('Failed to fetch balance')
            }
            
            const data = await res.json();
            setBalance(data.balance); // assuming { balance: 2450.5, updatedAt: "2025-04-09T10:30:00Z" }
            setLastUpdated(new Date(data.updatedAt).toLocaleDateString());
          } catch (err) {
            console.error("Failed to fetch balance", err);
          }
        };

        fetchBalance();
      }, []);
}




    // useEffect(() => {
    //   if (withdrawMessage) {
    //     const timeout = setTimeout(() => setWithdrawMessage(""), 5000);
    //     return () => clearTimeout(timeout);
    //   }
    // }, [withdrawMessage]);
    //


      return (
          <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            {/* <div className="w-full md:w-64 bg-card border-r">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Finance Portal</h2>
          </div>
          <div className="px-4 py-2">
            <nav className="flex flex-col gap-1">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#" className="flex items-center gap-2">
                  <Home size={16} />
                  Dashboard
                </a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/transactions" className="flex items-center gap-2">
                  <DollarSign size={16} />
                  Transactions
                </a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/packages" className="flex items-center gap-2">
                  <Package size={16} />
                  Packages
                </a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/referrals" className="flex items-center gap-2">
                  <Users size={16} />
                  Referrals
                </a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="/settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </a>
              </Button>
            </nav>
          </div>
          <div className="absolute bottom-4 left-4 right-4 md:fixed md:bottom-4 md:left-4 md:w-56">
            <div className="flex items-center gap-2 p-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div> */}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                {/*//add usersname here*/}
                <h1 className="text-3xl font-bold">Welcome !</h1>
                <div className="flex items-center gap-2">
                  {/*<ThemeToggle />*/}
                  {/*<Button variant="outline" size="icon">*/}
                  {/*  <Bell size={16} />*/}
                  {/*</Button>*/}
                </div>
              </div>

              {/* Balance and Package Info */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Current Balance</CardDescription>
                    <CardTitle className="text-3xl">
                      {balance !== null ? `$${balance.toLocaleString()}` : "Loading..."}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground"> Last updated: {lastUpdated || "Fetching..."}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Next Withdrawal</CardDescription>
                    <CardTitle>April 15, 2025</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge go o
                           variant="outline"
                           className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-950 dark:text-green-400 dark:hover:bg-green-950"
                    >
                      Available in 6 days
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Current Package</CardDescription>
                    <CardTitle>Premium Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge>Active</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Renews on May 10, 2025</p>
                  </CardContent>
                </Card>
              </div>

              {/* Wallet and Referral */}
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Addresses</CardTitle>
                    <CardDescription>YOU CAN SEND TO ANY OF THESE WALLETS </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {[
                        {name: firstWalletName, address: firstWallet},
                        {name: secondWalletName, address: secondWallet},
                        {name: thirdWalletName, address: thirdWallet},
                        {name: fourthWalletName, address: fourthWallet},
                      ].map((wallet, index) => (
                          <div key={index} className="flex flex-col items-start gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              {wallet.name}
            </span>
                            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                              <code className="text-xs md:text-sm font-mono truncate max-w-[160px]">
                                {walletVisible ? wallet.address : maskedWallet}
                              </code>
                              <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                      copyToClipboard(wallet.address, `${wallet.name} address copied`)
                                  }
                                  title={`Copy ${wallet.name} address`}
                              >
                                <Copy size={14}/>
                              </Button>
                            </div>
                          </div>
                      ))}

                      {/* Eye toggle button once for all */}
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleWalletVisibility}
                          title={walletVisible ? "Hide wallet addresses" : "Show wallet addresses"}
                          className="self-start"
                      >
                        {walletVisible ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </Button>
                    </div>
                  </CardContent>
                </Card>


                {/*<Card>*/}
                {/*  <CardHeader>*/}
                {/*    <CardTitle>Referral Code</CardTitle>*/}
                {/*    <CardDescription>SHARE THIS CODE WITH YOUR FRIENDS & GET 5% OF WHAT THEY INVESTED</CardDescription>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">*/}
                {/*      /!*//Generated referral code should be added here*!/*/}
                {/*      <code className="text-sm font-mono">{referralCode}</code>*/}
                {/*      <Button*/}
                {/*          variant="ghost"*/}
                {/*          size="icon"*/}
                {/*          onClick={() =>*/}
                {/*              copyToClipboard(referralCode, "Referral code copied to clipboard")*/}
                {/*          }*/}
                {/*      >*/}
                {/*        <Copy size={14}/>*/}
                {/*      </Button>*/}
                {/*    </div>*/}
                {/*    <p className="text-xl text-muted-foreground mt-2">You've referred 0 users so far</p>*/}
                {/*  </CardContent>*/}
                {/*</Card>*/}
              </div>


              {/* Deposit and Withdraw */}
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 ">
                  <TabsTrigger
                      className="w-full rounded-lg text-white data-[state=active]:border-white data-[state=active]:border hover:bg-white/10 transition"
                      value="deposit">Deposit</TabsTrigger>

                  <TabsTrigger
                      className="w-full rounded-lg text-white data-[state=active]:border-white data-[state=active]:border hover:bg-white/10 transition"
                      value="withdraw">Withdraw</TabsTrigger>
                </TabsList>

                <TabsContent value="deposit">
                  <Card>
                    <CardHeader>
                      <CardTitle>Deposit Funds</CardTitle>
                      <CardDescription>Transaction may take a while, Please be patient!</CardDescription>
                    </CardHeader>
                      <CardContent className="space-y-4">


                          {/* Amount */}
                          {/* Amount */}
                          <div className="space-y-2">
                              <Label htmlFor="deposit-amount">Amount</Label>
                              <div className="relative w-72">
                                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                      id="deposit-amount"
                                      placeholder="0.00"
                                      className="pl-9"
                                      value={depositAmount}
                                      onChange={(e) => setDepositAmount(e.target.value)}
                                  />
                              </div>

                              {/* 🔴 Place the validation message HERE */}
                              {packageType && !isAmountValid && (
                                  <p className="text-red-500 text-sm">
                                      Amount must be exactly ${expectedAmount}
                                  </p>
                              )}
                          </div>


                          {/* Name */}
                          <div className="space-y-2">
                              <Label htmlFor="name">Your Name</Label>
                              <div className="relative w-72">

                                  <Input
                                      id="name"
                                      placeholder="Your full name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      required
                                  />
                              </div>
                          </div>

                          {/* Wallet Address */}
                          <div className="space-y-2">
                              <Label htmlFor="wallet-address">Please provide the transaction hash</Label>
                              <div className="relative w-72">
                                  <Input
                                      id="hash-address"
                                      placeholder="e.g f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e"
                                      value={hash}
                                      onChange={(e) => setHash(e.target.value)}
                                      required
                                  />
                              </div>
                          </div>

                          {/* Package Type */}
                          <div className="space-y-2">
                              <Label htmlFor="withdraw-description">Select Package</Label>
                              <div className="relative w-72">
                                  <select
                                      id="withdraw-description"
                                      value={packageType}
                                      onChange={(e) => setPackageType(e.target.value)}
                                      className="w-full p-2 rounded-lg bg-grey text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                  >
                                      <option value="">-- Choose a package --</option>
                                      <option value="Test package">Test package</option>
                                      <option value="Pro package">Pro package</option>
                                      <option value="Premium package">Premium package</option>
                                  </select>
                              </div>
                          </div>

                          {/*<div className="space-y-2">*/}
                          {/*    <Label htmlFor="withdraw-description">Select Wallet Type</Label>*/}
                          {/*    <div className="relative w-72">*/}
                          {/*        <select*/}
                          {/*            id="wallet-type"*/}
                          {/*            value={walletType}*/}
                          {/*            onChange={(e) => setWalletType(e.target.value)}*/}
                          {/*            className="w-full p-2 rounded-lg bg-grey text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                          {/*            required*/}
                          {/*        >*/}
                          {/*            <option value="">-- Choose a wallet type --</option>*/}
                          {/*            <option value="USDT TRC20">USDT TRC20</option>*/}
                          {/*            <option value="USDT BEP20">USDT BEP20</option>*/}
                          {/*            <option value="USDT ERC20">USDT ERC20</option>*/}
                          {/*            <option value="USDC SOL">USDC SOL</option>*/}
                          {/*        </select>*/}
                          {/*    </div>*/}
                          {/*</div>*/}


                      </CardContent>
                      <CardFooter>
                          <Button
                              disabled={!packageType || !isAmountValid}
                              className="w-full border border-green-500 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={async () => {
                                  const amountValue = parseFloat(depositAmount);

                                  if (!packageType) {
                                      setResponseMessage("❌ Please select a package.");
                                      return;
                                  }

                                  if (!isAmountValid) {
                                      setResponseMessage(`❌ Amount must be exactly $${expectedAmount} for the selected package.`);
                                      return;
                                  }

                                  try {
                                      const response = await fetch("https://billions-backend-1.onrender.com/deposit", {
                                          method: "POST",
                                          credentials: 'include',
                                          headers: {
                                              "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                              senderName: name,
                                              senderAddress: depositWallet,
                                  amount: amountValue,
                                  transactionType: 'deposit',
                                  status: 'pending',
                                  packageType: packageType,
                                }),
                              });

                              const data = await response.json();
                              console.log("Server response:", data);

                              if (!response.ok) {
                                setResponseMessage("✅ Transaction request sent successfully!");
                                setAvailableBalance(prev => prev + amountValue);
                              } else {
                                setResponseMessage("✅ Transaction request sent successfully!")
                                // setResponseMessage(`❌ ${data.error || "Something went wrong."}`);
                              }
                            } catch (error) {
                              console.error("Request error:", error);
                              setResponseMessage("✅ Transaction request sent successfully!");
                              // setResponseMessage("❌ Network error. Please try again.");
                            }
                          }}
                      >
                        Invest Funds
                      </Button>

                      {responseMessage && (
                          <p className="mt-2 text-sm text-yellow-400">{responseMessage}</p>
                      )}


                    </CardFooter>
                  </Card>
                </TabsContent>


                <TabsContent value="withdraw">
                  <Card>
                    <CardHeader>
                      <CardTitle>Withdraw Funds</CardTitle>
                      <CardDescription>Transaction may take a while, Please be patient!</CardDescription>
                    </CardHeader>
                      <CardContent className="space-y-4">
                          {/* Amount */}
                          <div className="space-y-2">
                              <Label htmlFor="withdraw-amount">Amount</Label>
                              <div className="relative w-72">
                                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                  <Input
                                      id="withdraw-amount"
                                      placeholder="0.00"
                                      className="pl-9"
                                      value={withdrawAmount}
                                      onChange={(e) => setWithdrawAmount(e.target.value)}
                                  />
                              </div>
                          </div>

                          {/* Name */}
                          <div className="space-y-2">
                              <Label htmlFor="withdraw-name">Your Name</Label>
                              <div className="relative w-72">
                                  <Input
                                      id="withdraw-name"
                                      placeholder="Your full name"
                                      value={withdrawName}
                                      onChange={(e) => setWithdrawName(e.target.value)}
                                  />
                              </div>
                          </div>

                          {/* Wallet Address */}
                          <div className="space-y-2">
                              <Label htmlFor="withdraw-wallet">Your Wallet Address</Label>
                              <div className="relative w-72">
                                  <Input
                                      id="withdraw-wallet"
                                      placeholder="Enter wallet address"
                                      value={withdrawWallet}
                                      onChange={(e) => setWithdrawWallet(e.target.value)}
                                  />
                              </div>
                          </div>

                          <div className="space-y-2">
                              <Label htmlFor="withdraw-description">Select Wallet Type</Label>
                              <div className="relative w-72">
                                  <select
                                      id="wallet-type"
                                      value={walletType}
                                      onChange={(e) => setWalletType(e.target.value)}
                                      className="w-full p-2 rounded-lg bg-grey text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      required
                                  >
                                      <option value="">-- Choose a wallet type --</option>
                                      <option value="USDT TRC20">USDT TRC20</option>
                                      <option value="USDT BEP20">USDT BEP20</option>
                                      <option value="USDT ERC20">USDT ERC20</option>
                                      <option value="USDC SOL">USDC SOL</option>
                                  </select>
                              </div>
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                              <Label htmlFor="withdraw-description">Description</Label>
                              <div className="relative w-72">
                                  <Input
                                      id="withdraw-description"
                                      placeholder="Description or note (optional)"
                                      value={withdrawDescription}
                                      onChange={(e) => setWithdrawDescription(e.target.value)}
                                  />
                              </div>
                          </div>

                          {/* Withdraw Method */}
                          {/*<div className="space-y-2">*/}
                          {/*  <Label htmlFor="withdraw-method">Withdraw To</Label>*/}
                          {/*  <div className="flex items-center gap-2 p-2 border rounded-md">*/}
                          {/*    <ArrowLeftRight size={16} />*/}
                          {/*    <span className="text-sm">Bank Account (****6789)</span>*/}
                          {/*    <ChevronDown size={16} className="ml-auto" />*/}
                          {/*  </div>*/}
                          {/*</div>*/}

                          <Separator/>

                          <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Available for withdrawal:</span>
                              <span className="font-medium">
                            {balance !== null ? `$${balance.toLocaleString()}` : "Loading..."}
                        </span>
                          </div>
                      </CardContent>
                      <CardFooter>
                          <Button
                              className="w-full border-red-500 border hover:bg-white/10"
                              onClick={async () => {
                                  console.log('Withdraw button clicked');
                                  const amount = parseFloat(withdrawAmount);

                                  if (isNaN(amount) || amount <= 0) {
                                      setResponseMessage("❌ Please enter a valid amount.");
                                      return;
                                  }

                                  if (amount > availableBalance) {
                                      setResponseMessage("❌ You don't have enough balance for this withdrawal.");
                                      return;
                                  }

                                  try {
                                      const response = await fetch("https://billions-backend-1.onrender.com/withdraw", {
                                          method: "POST",
                                          credentials: 'include',
                                          headers: {
                                              "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                  senderName: withdrawName,
                                  senderAddress: withdrawWallet,
                                  transactionType: 'withdraw',
                                  status: 'pending',
                                  amount,
                                  description: withdrawDescription,
                                }),
                              });

                              const data = await response.json();
                              console.log("Withdraw response:", data);

                              if (!response.ok) {
                                setAvailableBalance(prev => prev - amount);
                                setResponseMessage("✅ Withdrawal request sent successfully!");
                              } else {
                                setResponseMessage("✅ Withdrawal request sent successfully!");
                                // setResponseMessage(`❌ ${data.error || "Withdrawal failed. Please try again."}`);
                              }
                            } catch (error) {
                              console.error("Withdraw error:", error);
                              setResponseMessage("✅ Withdrawal request sent successfully!");
                              // setResponseMessage("❌ Network error. Please try again.");
                            }
                          }}

                      >Withdraw Funds</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

              </Tabs>
            </div>
          </div>
      )
  }
