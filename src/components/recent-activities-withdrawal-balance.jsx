'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const RecentActivitiesWithdraw = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [selectedWallet, setSelectedWallet] = useState('');

    const fetchWithdrawals = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            const encodedEmail = encodeURIComponent(userEmail || '');
            const response = await fetch(`https://billions-backend-1.onrender.com/getAllWithdrawProfit?email=${encodedEmail}`);
            const data = await response.json();

            if (response.ok && Array.isArray(data.withdrawals)) {
                const sortedWithdrawals = data.withdrawals
                    .filter(w => w && w.created_at && !isNaN(new Date(w.created_at).getTime()))
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setWithdrawals(sortedWithdrawals);
            } else {
                setWithdrawals([]);
            }
        } catch (err) {
            console.error("Failed to fetch withdrawal data", err);
        }
    };

    const handleWithdraw = async () => {
        const userEmail = localStorage.getItem("userEmail");

        try {
            const response = await fetch(`https://billions-backend-1.onrender.com/getAllWithdrawProfit?email=${encodedEmail}`);
                if (response.ok && Array.isArray(data.withdrawals)) {
                const sortedWithdrawals = data.withdrawals
                    .filter(w => w && w.created_at && !isNaN(new Date(w.created_at).getTime()))
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setWithdrawals(sortedWithdrawals);
            } else {
                setWithdrawals([]);
            }
        } catch (err) {
                console.error("Failed to fetch withdrawal data", err);
            }
        };

    const handleConfirm = async (email, withdrawId) => {
        try {
            await fetch('https://billions-backend-1.onrender.com/confirmDailyProfit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, withdrawId: parseInt(withdrawId, 10) }),
            });
            fetchWithdrawals();
        } catch (error) {
            console.error('Error confirming withdrawal:', error);
        }
    };

    const handleRejectWithdraw = async (email, withdrawId) => {
        try {
            await fetch('https://billions-backend-1.onrender.com/rejectWithdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, withdrawId: parseInt(withdrawId, 10) }),
            });
            fetchWithdrawals();
        } catch (error) {
            console.error('Error rejecting withdrawal:', error);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Amount"
                    className="border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                    placeholder="Wallet Type"
                    className="border px-3 py-2 rounded-md"
                />
                <button
                    onClick={handleWithdraw}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Withdrawal
                </button>
            </div>

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
                        <TableRow key={withdrawal.withdrawId}>
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
        </div>
    );
};
