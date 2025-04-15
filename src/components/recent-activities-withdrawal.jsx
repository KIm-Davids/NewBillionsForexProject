'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const RecentActivities = () => {
    const [deposits, setDeposits] = useState([]);

    const fetchDeposits = async () => {
        try {
            const encodedEmail = encodeURIComponent("admin10k4u1234@gmail.com");
            const res = await fetch(`https://billions-backend-1.onrender.com/fetchDeposits?email=${encodedEmail}`);
            // const res = await fetch('https://billions-backend-1.onrender.com/fetchDeposits?email=admin10k4u1234@gmail.com');
            const data = await res.json();
            if (Array.isArray(data.deposits)) {
                setDeposits(data.deposits);
            } else {
                console.error('Expected an array but got:', data);
                setDeposits([]); // fallback to empty to prevent crash
            }
        } catch (error) {
            console.error('Failed to fetch deposits:', error);
        };
    }
    // const handleConfirm = async (depositId) => {
    //   try {
    //     await fetch('https://billions-backend-1.onrender.com/confirm-deposit', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ deposit_id: depositId }),
    //     });
    //     fetchDeposits();
    //   } catch (error) {
    //     console.error('Error confirming deposit:', error);
    //   }
    // };

    // const handleReject = async (depositId) => {
    //   try {
    //     await fetch('https://your-backend.com/reject-deposit', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ deposit_id: depositId }),
    //     });
    //     fetchDeposits();
    //   } catch (error) {
    //     console.error('Error rejecting deposit:', error);
    //   }
    // };

    // if (Array.isArray(deposits)) {
    //   deposits.map(...);
    // } else {
    //   console.error("Expected an array but received:", deposits);
    // }


    useEffect(() => {
        fetchDeposits();
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {deposits.map((deposit) => (
                    <TableRow key={deposit.email}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={'placeholder.svg'} alt={deposit.email} />
                                    <AvatarFallback>{deposit.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <div className="font-medium">{deposit.email}</div>
                                    <div className="text-xs text-muted-foreground">{deposit.user_id}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>${deposit.amount}</TableCell>
                        <TableCell className="capitalize">{deposit.status}</TableCell>
                        <TableCell>{new Date(deposit.created_at).toLocaleString()}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <button onClick={() => handleConfirm(deposit.email)} title="Confirm">
                                    <CheckCircle className="text-green-600 hover:scale-110 transition-all" />
                                </button>
                                <button onClick={() => handleReject(deposit.email)} title="Reject">
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