"use client"

import {useEffect, useState} from "react"
import { Info } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
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
import { FaSyncAlt } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';



export default function Dashboard() {
    const [walletVisible, setWalletVisible] = useState(false)
    const [depositAmount, setDepositAmount] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [depositName, setDepositName] = useState("");
    const [hash, setHash] = useState("");

    const [balance, setBalance] = useState(null);
    const [fetchedPackage, setFetchedPackage] = useState("");

    const [profits, setProfits] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [withdrawName, setWithdrawName] = useState("");
    const [withdrawWallet, setWithdrawWallet] = useState("");
    const [withdrawDescription, setWithdrawDescription] = useState("");
    const [availableBalance, setAvailableBalance] = useState(2000);
    const [lastUpdated, setLastUpdated] = useState("");
    const [packageType, setPackageType] = useState("Pro package");
    const [responseMessage, setResponseMessage] = useState("");
    const [walletType, setWalletType] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [referralCode, setReferralCode] = useState('');
    const [balanceData, setBalanceData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [withdrawDate, setWithdrawDate] = useState("");
    const [bonusAmount, setBonusAmount] = useState(0);


    const [referralCount, setReferralCount] = useState(0);

    const [dailyProfit, setDailyProfit] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [pendingWithdrawals, setPendingWithdrawals] = useState(0);

    const maskedWallet = "••••••••••••••••••••••••••••••••••••••••"

  const firstWallet = "TAJ5SCiy5tr3QF89nVaBi78XJwhXbu1xMm"
  const secondWallet = "0xc9AcefB4adeFEf06Ec62fbB46F0644261ee8E722"
  const thirdWallet = "0xc9AcefB4adeFEf06Ec62fbB46F0644261ee8E722"
  const fourthWallet = "GDax5QyFX1o3sBbLuMRrF2HcXHZVb8AVQB7qBQjTQKe7"

  const firstWalletName = "USDT TRC20"
  const secondWalletName = "USDT BEP20"
  const thirdWalletName = "USDT ERC20"
  const fourthWalletName = "USDC SOL"


    useEffect(() => {
        const fetchBalanceAndProfits = async () => {
            try {
                setLoading(true);
                const savedEmail = localStorage.getItem('userEmail');

                if (!savedEmail) {
                    console.error("No email found in localStorage");
                    return;
                }
                const response = await fetch('https://billions-backend-1.onrender.com/getUserInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: savedEmail}),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const balanceData = await response.json();
                console.log("User Info Response:", balanceData);

                if (balanceData.balance) {
                    setBalance(parseFloat(balanceData.balance).toFixed(2));
                }
                if (balanceData.packages) {
                    setFetchedPackage(balanceData.packages);
                }
                setLastUpdated(new Date().toLocaleString());
            } catch (err) {
                console.error("Failed to fetch balance", err);
            } finally {
                setLoading(false);
            }
        };

        setIsClient(true);
        fetchBalanceAndProfits();
    }, []);


    useEffect(() => {
        const fetchReferralCode = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) {
                    console.error("No user email found in localStorage");
                    return;
                }

                const response = await fetch("https://billions-backend-1.onrender.com/getReferrerCode", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: userEmail}),
                });

                const data = await response.json();
                console.log("Referral code response:", data);

                if (response.ok && data.referral_code) {
                    setReferralCode(data.referral_code);
                    localStorage.setItem("referralCode", data.referral_code);
                } else {
                    console.warn("Referral code not found or error from backend:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch referral code:", error);
            }
        };

        fetchReferralCode();
    }, []);





    // useEffect(() => {
    //     setIsClient(true);
    // }, []);
    //
    // if (!isClient) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
    //         </div>
    //     );
    // }

// Correct placement of the useEffect hook
    const Dashboard = () => {
        useEffect(() => {
            // Fetch the daily profits data from the backend


            fetchProfits();
        }, []); // The empty dependency array ensures this only runs once

    }


    const packageAmounts = {
        "Test package": 100,
        "Pro package": 500,
        "Premium package": 1000,
    };

    // useEffect(() => {
    //     setPackageType("Pro package");
    // }, []);


    const isAmountValid = !isNaN(parseFloat(depositAmount)) && parseFloat(depositAmount) >= 100;

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

    // Generate unique userId using UUID
    const generateUniqueUserId = () => {
        const newUserId = uuidv4(); // Generate a unique UUID
        localStorage.setItem('userId', newUserId); // Save the new userId to localStorage
        setUserId(newUserId); // Update state with the new userId
        return newUserId;
    };

    const toggleWalletVisibility = () => {
    setWalletVisible(!walletVisible)
  }


    const generateReferralCode = () => {
        const prefix = 'USR';
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${prefix}-${randomPart}`;
    };


    return (
        <div className="flex min-h-screen flex-col md:flex-row">

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

                    <div className="mt-4">
                        <button
                            onClick={async () => {

                                try {


                                    try {
                                        const userEmail = localStorage.getItem('userEmail')
                                        const response = await fetch('https://billions-backend-1.onrender.com/fundReferrer', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ email: userEmail }),
                                        });

                                        console.log(userEmail)

                                        const data = await response.json();
                                        console.log("About referrer here", data)


                                        if (!response.ok) {
                                            throw new Error(data.error || 'Failed to fetch bonus');
                                        }
                                        setBonusAmount(data.total_bonus);
                                    } catch (err) {
                                        console.error("Check here", err)
                                    }



                                try {
                                        const amount = parseFloat(withdrawAmount);
                                        const userEmail = localStorage.getItem('userEmail');

                                        if (!userEmail || isNaN(amount) || amount < 0) {
                                            console.error("Invalid email or amount", { userEmail, amount });
                                            return;
                                        }

                                        console.log("Sending withdrawal request:", {
                                            email: userEmail,
                                            amount: amount,
                                        });

                                        const res = await fetch('https://billions-backend-1.onrender.com/getWithdrawProfit', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ email: userEmail, amount: amount }),
                                        });

                                        const data = await res.json();
                                        console.log("Net Profit Data:", data);

                                    if (data.withdrawal !== undefined) {
                                        const formattedWithdrawal = parseFloat(data.withdrawal).toFixed(2);
                                        setProfits(formattedWithdrawal);
                                    }


                                        if (!res.ok) {
                                            throw new Error("Failed to fetch referral bonus.");
                                        }
                                    } catch (error) {
                                        console.error("Somethings up here", error);
                                    }



                                    try {
                                        // Fetch the referral code from localStorage
                                        const referrerId = localStorage.getItem('referralCode');

                                        // Check if the referral code exists in localStorage
                                        if (!referrerId) {
                                            console.error("Referrer ID is missing from localStorage.");
                                            return;
                                        }

                                        const userEmail = localStorage.getItem('userEmail')
                                        console.log(referralCode)

                                        // Make the POST request to your backend API
                                        const res = await fetch('https://billions-backend-1.onrender.com/getReferBonus', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({email: userEmail}),
                                        });

                                        // Parse the response
                                        const data = await res.json();

                                        console.log('Referral Bonuses:', data);

                                        if (!res.ok) {
                                            throw new Error("Failed to fetch referral bonus details.");
                                        }
                                        // Handle the response
                                        if (data.bonus_amount) {
                                            console.log('Referral Bonuses:', data.bonus_amount);
                                            // Here you can display the bonuses or use them in the UI
                                        } else {
                                            console.error("No bonuses found or an error occurred.", data);
                                        }
                                    } catch (error) {
                                        console.error("Error fetching referral bonuses:", error);
                                    }


                                    const fetchReferralCode = async () => {
                                        const email = localStorage.getItem("userEmail");

                                        if (!email) {
                                            console.error("No user email found in localStorage.");
                                            return;
                                        }
                                    }

                                    try {
                                        const userEmail = localStorage.getItem('userEmail')
                                        const response = await fetch("https://billions-backend-1.onrender.com/getReferrerCode", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({email: userEmail}),
                                        });

                                        const data = await response.json();

                                        console.log(data)
                                        if (response.ok && data.referral_code) {
                                            setReferralCode(data.referral_code);
                                            localStorage.setItem("referralCode", data.referral_code);
                                        } else {
                                            console.warn("Referral code not found or error from backend:", data.error);
                                        }
                                    } catch (error) {
                                        console.error("Failed to fetch referral code:", error);
                                    }

                                    await fetchReferralCode();
                                    let theUserEmail = localStorage.getItem("userEmail");

                                    try {
                                        const res = await fetch('https://billions-backend-1.onrender.com/getReferCount', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({email: theUserEmail}),
                                        });

                                        if (!res.ok) {
                                            throw new Error("Failed to fetch referral count.");
                                        }

                                        const data = await res.json();
                                        console.log("Referral Count Data:", data);

                                        // Use the referral count from the response
                                        if (data.referral_count !== undefined) {
                                            setReferralCount(data.referral_count);  // Update the state with the referral count
                                        }

                                    } catch (error) {
                                        console.error("Error fetching referral count:", error);
                                    }



                                    // const data = await res.json();


                                        //     if (data.bonus_amount) {
                                        //         setBonusAmount(data.bonus_amount);
                                        //     } else {
                                        //         console.error("No bonus available or an error occurred.", data);
                                        //     }
                                        // } catch (error) {
                                        //     console.error("Failed to fetch referral bonus. Please try again later.");
                                        // }


                                        //     fetch("https://billions-backend-1.onrender.com/getDailyProfit", {
                                        //         method: "POST",
                                        //         headers: {
                                        //             "Content-Type": "application/json",
                                        //         },
                                        //         body: JSON.stringify({email: userEmail}),
                                        //     })
                                        //         .then(async (res) => {
                                        //             const text = await res.text();
                                        //             console.log("RAW RESPONSE TEXT:", text); // 🔍 Look at this in the browser console
                                        //             // return JSON.parse(text);
                                        //         })
                                        //         .then((data) => {
                                        //             console.log("Parsed JSON:", data);
                                        //         })
                                        //         .catch((err) => {
                                        //             console.error("Error fetching daily profit:", err);
                                        //         });
                                        // } catch (error) {
                                        //     console.error("Something happened here", error)
                                        // }


                                        //DAily Profit
                                        try {
                                            const userEmail = localStorage.getItem("userEmail");
                                            
                                            // Fetch daily profit
                                            const dailyResponse = await fetch('https://billions-backend-1.onrender.com/getDailyProfit', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({email: userEmail}),
                                            });

                                            const profitData = await dailyResponse.json();
                                            
                                            if (dailyResponse.ok) {
                                                setDailyProfit(parseFloat(profitData.daily_profit).toFixed(2));
                                                setNetProfit(parseFloat(profitData.net_profit).toFixed(2));
                                                setPendingWithdrawals(parseFloat(profitData.pending_withdrawals).toFixed(2));
                                                setProfits(parseFloat(profitData.net_profit).toFixed(2)); // Postavljamo glavni profits display na net_profit
                                            }
                                        } catch (err) {
                                            console.error("Error fetching daily profit:", err);
                                        }




                                        // Function to generate a random referral code
                                        const generateReferralCode = () => {
                                            return Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g., "A1B2C3"
                                        };


                                        if (typeof window !== 'undefined') {
                                            const savedEmail = localStorage.getItem('userEmail');
                                            // localStorage.setItem('referralCode', referralCode);
                                            const response = await fetch('https://billions-backend-1.onrender.com/getUserInfo', {
                                                method: 'POST',
                                                // credentials: "include",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({email: savedEmail.toString()}), // Send email in the body
                                            });
                                            console.log(email)
                                            const balanceData = await response.json();
                                            console.log("User Info Response:", balanceData.packages);
                                            setBalance(parseFloat(balanceData.balance).toFixed(2));

                                            setFetchedPackage(balanceData.packages);
                                            setLastUpdated(new Date().toLocaleString()); // You can set the current time as the last updated
                                        }

                                    } catch (err) {
                                        console.error("Failed to fetch balance", err);
                                    } finally {
                                        setLoading(false);
                                    }
                                }

                            } // Trigger the fetchBalance function when clicked

                            className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 flex items-center justify-center"
                        >
                            {/* Display the refresh icon */}
                            <FaSyncAlt className="text-white" size={20}/>
                        </button>
                    </div>

                </div>


                {/* Balance and Package Info */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Current Balance</CardDescription>
                            <CardTitle className="text-3xl">
                                {balance !== null ? `$${balance}` : "Loading..."}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground"> Last
                                updated: {lastUpdated || "Fetching..."}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Profits</CardDescription>
                            <CardTitle className="text-3xl font-bold text-green-600">
                                ${netProfit}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Daily Profit:</span>
                                    <span className="text-green-500">${dailyProfit}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Pending Withdrawals:</span>
                                    <span className="text-yellow-500">${pendingWithdrawals}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Net Profit:</span>
                                    <span className="text-blue-500">${netProfit}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Current Package</CardDescription>
                            <CardTitle>{fetchedPackage ? fetchedPackage : "No Package!"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge  className="bg-green-500 text-white rounded-full px-3 py-1">Active</Badge>
                            <p className="text-xs text-muted-foreground mt-1"></p>
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


                    <Card>
                        <CardHeader>
                            <CardTitle>Referral Code</CardTitle>
                            <CardDescription>SHARE THIS CODE WITH YOUR FRIENDS & GET 5% OF WHAT THEY
                                INVESTED</CardDescription>
                        </CardHeader>
                        <CardHeader>
                            <p className="text-3xl">Referral Profit</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-green-500 text-xl">${bonusAmount.toFixed(2)}</p>
                        </CardContent>
                        <CardContent>
                            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                <code className="text-sm font-mono">
                                    {referralCode || "Loading code..."}
                                </code>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(referralCode, "Referral code copied to clipboard")}
                                    disabled={!referralCode}
                                >
                                    <Copy size={14}/>
                                </Button>
                            </div>
                            <p>You've referred {referralCount} user{referralCount !== 1 ? "s" : ""} so far</p>
                        </CardContent>
                    </Card>
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
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
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
                                            Amount must not be less than $100
                                        </p>
                                    )}
                                </div>


                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Email</Label>
                                    <div className="relative w-72">

                                        <Input
                                            id="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                    <Label htmlFor="withdraw-description">For every deposit you gain 1% profit everyday</Label>
                                    {/*<div className="relative w-72">*/}
                                    {/*    <select*/}
                                    {/*        id="packageType"*/}
                                    {/*        value={packageType}*/}
                                    {/*        onChange={(e) => setPackageType(e.target.value)}*/}
                                    {/*        className="w-full p-2 rounded-lg bg-grey text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                                    {/*        required*/}
                                    {/*    >*/}
                                    {/*        <option value="Pro package">Pro package</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
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

                            {responseMessage && (
                                <div className="mt-4 flex items-center gap-3 p-4 rounded-md shadow-sm">
                                    <Info className="w-5 h-5 text-secondary-white dark:text-yellow-300" />
                                    <p className="text-sm font-medium text-yellow-700 dark:text-yellow-200">
                                        {responseMessage}
                                    </p>
                                </div>
                            )}
                            <CardFooter>
                                <Button
                                    disabled={!email || !hash || !depositAmount || parseFloat(depositAmount) < 100}
                                    className="w-full border border-green-500 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={async () => {
                                        const amountValue = parseFloat(depositAmount);

                                        // if (!packageType) {
                                        //     setResponseMessage("❌ Please select a package.");
                                        //     return;
                                        // }

                                        // if (!isAmountValid) {
                                        //     setResponseMessage(`❌ Amount must be at least $100`);
                                        //     return;
                                        // }

                                        try {
                                            console.log(email)
                                            const response = await fetch("https://billions-backend-1.onrender.com/deposit", {
                                                method: "POST",
                                                credentials: 'include',
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    // userID: userId, // Pass the userId in the request
                                                    email: email,
                                                    amount: amountValue,
                                                    hash: hash,
                                                    status: 'pending',
                                                    packageType: packageType,
                                                }),
                                            });
                                            setResponseMessage("Transaction Processing ...")

                                            if (response.ok) {

                                                setResponseMessage("✅ Transaction request sent successfully!");
                                                // setAvailableBalance(prev => prev + amountValue);
                                            } else {
                                                // Handle the case where the response was not successful
                                                // const errorMessage = data?.error || "Something went wrong.";
                                                setResponseMessage(`❌ ${errorMessage}`);
                                            }
                                        } catch (error) {
                                            console.error("Request error:", error);
                                            setResponseMessage("❌ Network error. Please try again.");
                                        }

                                    }}
                                >
                                    Invest Funds
                                </Button>

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
                                            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="withdraw-name">Your Email</Label>
                                    <div className="relative w-72">
                                        <Input
                                            id="withdraw-name"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        {netProfit ? `$${netProfit}` : "Loading..."}
                                    </span>
                                </div>
                            </CardContent>

                            {responseMessage && (
                                <div className="mt-4 flex items-center gap-3 p-4 rounded-md shadow-sm">
                                    <Info className="w-5 h-5 text-secondary-white dark:text-yellow-300" />
                                    <p className="text-sm font-medium text-yellow-700 dark:text-yellow-200">
                                        {responseMessage}
                                    </p>
                                </div>
                            )}

                            <CardFooter>
                                <Button
                                    className="w-full border-yellow-500 border hover:bg-white/10"
                                    onClick={async () => {
                                        console.log('Withdraw from Balance button clicked');
                                        const amount = parseFloat(withdrawAmount);

                                        if (isNaN(amount) || amount <= 0) {
                                            setResponseMessage("❌ Please enter a valid amount.");
                                            return;
                                        }

                                        if (amount > balance) {
                                            setResponseMessage("❌ You don't have enough balance for this withdrawal.");
                                            return;
                                        }
                                        try {
                                            // const userEmail = localStorage.getItem("userEmail")
                                            const response = await fetch("https://billions-backend-1.onrender.com/withdrawBalance", {
                                                method: "POST",
                                                credentials: 'include',
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    withdrawAddress: withdrawWallet,
                                                    email: email,
                                                    walletType: walletType,
                                                    status: 'pending',
                                                    amount: amount,
                                                    description: withdrawDescription,
                                                    packageType: packageType,
                                                }),
                                            });

                                            let data = null;
                                            data = await response.json();
                                            console.log("User email", packageType)
                                            console.log("Server response:", data.unlock_date);
                                            if (response.ok) {
                                                try {
                                                    console.log("Server response:", data);
                                                    setResponseMessage("✅ Transaction request sent successfully!");
                                                    // setBalance(prev => prev - amount);
                                                } catch (err) {
                                                    console.error("Failed to parse JSON:", err);
                                                    setResponseMessage("❌ Error: Invalid response format.");
                                                    return;
                                                }
                                            } else {
                                                const errorMessage = data?.error || "Something went wrong.";
                                                setResponseMessage(`❌ ${errorMessage} until ${data.unlock_date}`);
                                            }
                                        } catch (error) {
                                            console.error("Request error:", error);
                                            setResponseMessage("❌ Network error. Please try again.");
                                        }
                                    }}
                                >
                                    Withdraw from Balance
                                </Button>

                                <Button
                                    className="w-full border-green-500 border hover:bg-white/10"
                                    onClick={async () => {
                                        console.log('Withdraw from Profits button clicked');
                                        const amount = parseFloat(withdrawAmount);

                                        if (isNaN(amount) || amount <= 0) {
                                            setResponseMessage("❌ Please enter a valid amount.");
                                            return;
                                        }

                                        if (amount > profits) {
                                            setResponseMessage("❌ You don't have enough profits for this withdrawal.");
                                            return;
                                        }
                                        try {

                                            console.log({
                                                email,
                                                walletType,
                                                status: 'pending',
                                                amount,
                                                description: withdrawDescription
                                            });

                                            const response = await fetch("https://billions-backend-1.onrender.com/withdrawProfit", {
                                                method: "POST",
                                                credentials: 'include',
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    withdrawAddress: withdrawWallet,
                                                    email: email,
                                                    walletType: walletType,
                                                    status: 'pending',
                                                    amount: amount,
                                                    description: withdrawDescription,
                                                }),
                                            });

                                            let data = null;
                                            if (response.ok) {
                                                try {
                                                    data = await response.json();
                                                    console.log("Server response:", data);

                                                    setResponseMessage("✅ Transaction request sent successfully!");
                                                    // setProfits(prev => prev - amount);
                                                } catch (err) {
                                                    console.error("Failed to parse JSON:", err);
                                                    setResponseMessage("❌ Error: Invalid response format.");
                                                    return;
                                                }
                                            } else {
                                                const errorMessage = data?.error || "Something went wrong.";
                                                setResponseMessage(`❌ ${errorMessage}`);
                                            }
                                        } catch (error) {
                                            console.error("Request error:", error);
                                            setResponseMessage("❌ Network error. Please try again.");
                                        }
                                    }}
                                >
                                    Withdraw from Profits
                                </Button>
                                <Button className="w-full border-cyan-700 border hover:bg-white/10"
                                >
                                    Withdraw from Referral Profits
                                </Button>
                            </CardFooter>

                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}