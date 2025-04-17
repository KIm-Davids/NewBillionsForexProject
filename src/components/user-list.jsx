'use client';

import { useState, useEffect } from 'react';
import { Ban, Check, MoreHorizontal, UserCog } from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

// Get user data




export const UserList = ({ searchQuery }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [suspendedUsers, setSuspendedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredUsers = users.filter(
    (users) => users.username.toLowerCase().includes(searchQuery.toLowerCase())
      || users.email.toLowerCase().includes(searchQuery.toLowerCase())
      || users.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const API_URL = 'https://billions-backend-1.onrender.com';


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch(`https://billions-backend-1.onrender.com/get/users`, {
  //         credentials: 'include',
  //       }); // 👈 Replace with your actual endpoint
  //       if (!res.ok) throw new Error('Failed to fetch');
  //       const data = await res.json();
  //       setUsers(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.error('Error fetching users:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchUsers();
  // }, []);


  // useEffect(() => {
  //   const fetchTransaction = async () => {
  //     try {
  //       const res = await fetch(`https://billions-backend-1.onrender.com/get/transaction`, {
  //         credentials: 'include',
  //       }); // 👈 Replace with your actual endpoint
  //       if (!res.ok) throw new Error('Failed to fetch');
  //       const data = await res.json();
  //       console.log(data.transactions);
  //       setTransaction(data.transactions);
  //     } catch (err) {
  //       console.error('Error fetching transaction:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchTransaction();
  // }, []);




  const handleViewDetails = (users, transaction) => {
    setSelectedUser(users);
    setTransaction(transaction);
    setIsDialogOpen(true);
  };

  // const handleTransactionViewDetails = (transaction) => {
  //   setSelectedUser(transaction);
  //   setIsDialogOpen(true);
  // };

  const handleSuspendUser = (userId) => {
    if (suspendedUsers.includes(userId)) {
      setSuspendedUsers(suspendedUsers.filter((id) => id !== userId));
      //Send values to the backend
    } else {
      setSuspendedUsers([...suspendedUsers, userId]);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>UserName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Deposit</TableHead>
            <TableHead>Withdraw due date</TableHead>
            <TableHead>package type</TableHead>
            <TableHead>Package Status</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((users) => {
            const userTransaction = transaction?.find?.(tx => tx.userId === users.id);

            return (
                <TableRow key={users.id} className={suspendedUsers.includes(users.id) ? 'opacity-50' : ''}>
                  <TableCell className="font-medium">{users.username}</TableCell>
                  <TableCell>{users.email}</TableCell>
                  <TableCell>{userTransaction?.amount ?? '—'}</TableCell>
                  <TableCell>{userTransaction.withdrawDueDate ?? '—'}</TableCell>
                  <TableCell>{userTransaction?.packageType ?? '—'}</TableCell>
                  <TableCell>
                    <Badge variant={userTransaction?.status === 'Pending' ? 'success' : 'secondary'}>
                      {userTransaction?.status === 'Pending' ? <Check className="mr-1 h-3 w-3" /> : <Ban className="mr-1 h-3 w-3" />}
                      {userTransaction?.status ?? '—'}
                    </Badge>
                  </TableCell>
                  <TableCell>{userTransaction?.transactionType ?? '—'}</TableCell>
                  <TableCell>
                    {users.CreatedAt ? new Date(users.CreatedAt).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(users, userTransaction)}>
                          <UserCog className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSuspendUser(users.id)}>
                          <Ban className="mr-2 h-4 w-4" />
                          {suspendedUsers.includes(users.id) ? 'Unsuspend User' : 'Suspend User'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
            )
          })}

        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the selected user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="col-span-3">{selectedUser.name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="col-span-3">{selectedUser.email}</span>
                </div>
                {/*//Total deposit amount here*/}

                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Total Amount Deposited:</span>
                  <span className="col-span-3">{selectedUser.amount}</span>
                </div>

                {/*//Total withdraw amount here*/}
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Total Amount Withdraw:</span>
                  <span className="col-span-3">{selectedUser.amount}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Withdraw due Date:</span>
                  <span className="col-span-3">{selectedUser.withdrawDueDate}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Withdraw due Date:</span>
                  <span className="col-span-3">
                  <Badge variant={selectedUser.status === 'Online' ? 'success' : 'secondary'}>
                    {selectedUser.status}
                  </Badge>
                </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Last Active:</span>
                  <span className="col-span-3">{selectedUser.lastActive}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Registered:</span>
                  <span className="col-span-3">{selectedUser.registeredDate}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="col-span-3">
                  {suspendedUsers.includes(selectedUser.id) ? (
                      <Badge variant="destructive">Suspended</Badge>
                  ) : (
                      <Badge variant="success">Active</Badge>
                  )}
                </span>
                </div>
              </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
