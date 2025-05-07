'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export const RecentActivitiesReferral = () => {
    const [pendingWithdrawals, setPendingWithdrawals] = useState([]);


    const API_URL = 'http://localhost:8080';
    // const API_URL = 'https://billions-backend-1.onrender.com';

    useEffect(() => {
        fetchPendingWithdrawals(); // Fetch withdrawals when component mounts
    }, []);


    const fetchPendingWithdrawals = async () => {
        try {

            const encodedEmail = encodeURIComponent("admin10k4u1234@gmail.com");
            const response = await fetch(`${API_URL}/fetchReferWithdrawal?email=${encodedEmail}`);
            const data = await response.json();

            // Ensure the backend response is as expected
            if (response.ok) {
                console.log(data.pending_withdrawals)

                // Check if 'pending_withdrawals' exists in the response data
                if (data.pending_withdrawals && Array.isArray(data.pending_withdrawals)) {
                    const validWithdrawals = data.pending_withdrawals.filter(
                        (w) => w && w.createdAt && !isNaN(new Date(w.createdAt).getTime())
                    );

                    const sortedWithdrawals = validWithdrawals.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setPendingWithdrawals(sortedWithdrawals);  // Set the state with the sorted withdrawals
                } else {
                    console.error('Expected an array but got:', data);
                    setPendingWithdrawals([]);  // Set an empty array if the response isn't as expected
                }
            } else {
                console.error("Error fetching data:", data.error || "Unknown error");
                setPendingWithdrawals([]);  // Handle the case where the response is not successful
            }
        } catch (err) {
            console.error("Failed to fetch withdrawal data", err);
            setPendingWithdrawals([]);  // Handle network or other errors
        }
    }



    const handleReferConfirm = async (email,  withdrawId) => {
        try {
            const response = await fetch(`${API_URL}/confirmReferWithdrawal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email,withdrawId: parseInt(withdrawId, 10), }),
            });
            console.log(email)
            console.log(withdrawId)

            const data = response.json();
            console.log(data)

            fetchPendingWithdrawals(); // Reload the withdrawals after confirming
        } catch (error) {
            console.error('Error confirming withdrawal:', error);
        }
    };

    const handleRejectWithdraw = async (email,  withdrawId) => {
        try {
            await fetch(`${API_URL}/rejectReferWithdrawal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email: email, withdrawId: parseInt(withdrawId, 10),  }),
            });

            console.log("Rejected withdrawal ID:", withdrawId);
            console.log("Rejected withdrawal ID:", withdrawId);
            fetchPendingWithdrawals(); // Refresh the table/list
        } catch (error) {
            console.error('Error rejecting withdrawal:', error);
        }
    };



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
                {pendingWithdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.withdrawId}> {/* Use withdrawId as key */}
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
                        <TableCell>${withdrawal.amount}</TableCell> {/* Ensure this field exists in your withdrawal object */}
                        <TableCell className="capitalize">{withdrawal.status}</TableCell>
                        <TableCell>{new Date(withdrawal.createdAt).toLocaleString()}</TableCell> {/* Ensure 'createdAt' exists */}
                        <TableCell>{withdrawal.walletType}</TableCell> {/* Ensure 'walletType' exists */}
                        <TableCell>{withdrawal.withdrawAddress}</TableCell> {/* Ensure 'withdrawAddress' exists */}
                        <TableCell>
                            <div className="flex gap-2">
                                <button onClick={() => handleReferConfirm(withdrawal.email, withdrawal.withdrawId)} title="Confirm">
                                    <CheckCircle className="text-green-600 hover:scale-110x  transition-all" />
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
