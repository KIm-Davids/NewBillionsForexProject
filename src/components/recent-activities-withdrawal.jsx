'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const RecentActivitiesWithdraw = () => {
    const [withdrawals, setWithdrawals] = useState([]);

    const fetchWithdrawals = async () => {
        try {
            const encodedEmail = encodeURIComponent("admin10k4u1234@gmail.com");
            const response = await fetch(`https://billions-backend-1.onrender.com/getAllWithdrawProfit?email=${encodedEmail}`);
            const data = await response.json();

            // const data = await response.json();
            console.log("Pending Withdrawals data:", data);
            if (response.ok) {
                //         if (data.withdrawals && data.withdrawals.length > 0) {
                //             // Handle and display the pending withdrawal data
                //             setWithdrawals(data.withdrawals);
                //         } else {
                //             setWithdrawals([]);
                //         }
                //     } else {
                //         console.error("Error fetching withdrawals:", data.message);
                //     }
                //
                //
                if (Array.isArray(data.withdrawals)) {
                    const validWithdrawals = data.withdrawals.filter(
                        (w) => w && w.created_at && !isNaN(new Date(w.created_at).getTime())
                    );
                    const sortedWithdrawals = validWithdrawals.sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    );
                    setWithdrawals(sortedWithdrawals);
                } else {
                    console.error('Expected an array but got:', data);
                    setWithdrawals([]);
                }
            }
        }  catch (err) {
            console.error("Failed to fetch withdrawal data", err);
        }
    }

    const handleConfirm = async (email, withdrawId) => {
        try {
            await fetch('https://billions-backend-1.onrender.com/confirmDailyProfit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, withdrawId: withdrawId  }),
            });
            fetchWithdrawals(); // Reload the withdrawals after confirming
        } catch (error) {
            console.error('Error confirming withdrawal:', error);
        }
    };

    const handleRejectWithdraw = async (email, withdraw_id) => {
        try {
            await fetch('https://billions-backend-1.onrender.com/rejectWithdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, withdraw_id }),
            });

            console.log("Rejected withdrawal ID:", withdraw_id);
            console.log("Rejected withdrawal ID:", withdraw_id);
            fetchWithdrawals(); // Refresh the table/list
        } catch (error) {
            console.error('Error rejecting withdrawal:', error);
        }
    };


    useEffect(() => {
        fetchWithdrawals(); // Fetch withdrawals when component mounts
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Wallet Type</TableHead>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.email}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={'placeholder.svg'} alt={withdrawal.email} />
                                    <AvatarFallback>{withdrawal.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <div className="font-medium">{withdrawal.email}</div>
                                    <div className="text-xs text-muted-foreground">{withdrawal.email}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>${withdrawal.amount}</TableCell>
                        <TableCell className="capitalize">{withdrawal.status}</TableCell>
                        <TableCell>{new Date(withdrawal.created_at).toLocaleString()}</TableCell>
                        <TableCell>{withdrawal.wallet_type}</TableCell>
                        <TableCell>{withdrawal.withdrawAddress}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <button onClick={() => handleConfirm(withdrawal.email, withdrawal.withdrawId)} title="Confirm">
                                    <CheckCircle className="text-green-600 hover:scale-110 transition-all" />
                                </button>
                                <button onClick={() => handleRejectWithdraw(withdrawal.email, withdrawal.withdrawId)} title="Reject">
                                    <XCircle className="text-red-600 hover:scale-110 transition-all" />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
