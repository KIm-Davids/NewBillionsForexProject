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
  const [newBalance, setNewBalance] = useState('');
  const [newProfit, setNewProfit] = useState('');
  const [oldProfits, setOldProfits] = useState('');

  const filteredUsers = users.filter(
    (users) => users.username.toLowerCase().includes(searchQuery.toLowerCase())
      || users.email.toLowerCase().includes(searchQuery.toLowerCase())
      || users.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const API_URL = 'https://billions-backend-1.onrender.com';
  // const API_URL = 'http://localhost:8080';


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/fetch/users`, {
          method: 'GET',
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch users');

        const data = await res.json();
        setUsers(data.users); // 👈 Correctly access the users array
        console.log(data.users);
        console.log(data.users.profits);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const fetchUsersProfit = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/fetch/user-profits`);
  //       if (!res.ok) throw new Error('Failed to fetch users');
  //       const data = await res.json();
  //       setUsers(data.users);
  //     } catch (err) {
  //       console.error('Error fetching users:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchUsersProfit();
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
            {/*<TableHead>Deposit Amount</TableHead>*/}
            <TableHead>Balance</TableHead>
            <TableHead>Profit Amount</TableHead>
            <TableHead>Referral Id</TableHead>
            <TableHead>Referred By</TableHead>
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
                  <TableCell>{users?.balance ?? '—'}</TableCell>
                  <TableCell>
                    {users.profits?.length > 0
                        ? <span>{[...users.profits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].newProfit}</span>
                        : '—'}
                  </TableCell>
                  {/*<TableCell>{userTransaction.withdrawDueDate ?? '—'}</TableCell>*/}
                  <TableCell>{users?.referrerId ?? '—'}</TableCell>
                  <TableCell>
                    {/*<TableCell></TableCell>*/}
                    {users?.referred_by ?? '—'}
                    {/*<Badge variant={userTransaction?.status === 'Pending' ? 'success' : 'secondary'}>*/}
                    {/*  {userTransaction?.status === 'Pending' ? <Check className="mr-1 h-3 w-3" /> : <Ban className="mr-1 h-3 w-3" />}*/}
                    {/*  {userTransaction?.status ?? '—'}*/}
                    {/*</Badge>*/}
                  </TableCell>
                  <TableCell>
                    {users.createdAt ? new Date(users.createdAt).toLocaleDateString() : '—'}
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
                  <span className="col-span-3">{selectedUser.username}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="col-span-3">{selectedUser.email}</span>
                </div>
                {/*//Total deposit amount here*/}

                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Total Balance:</span>
                  <span className="col-span-3">{selectedUser.balance}</span>
                </div>

                {/*//Total withdraw amount here*/}
                {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                {/*  <span className="text-sm font-medium">Total Amount Withdraw:</span>*/}
                {/*  <span className="col-span-3">{selectedUser.amount}</span>*/}
                {/*</div>*/}
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium" htmlFor="balance">Balance:</label>
                  <input
                      id="balance"
                      className="col-span-3 border border-blue-500 text-white rounded-md p-2"
                      type="number"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm font-medium" htmlFor="profit">Profit:</label>
                  <input
                      id="profit"
                      className="col-span-3 border border-blue-500 text-white rounded-md p-2"
                      type="number"
                      value={newProfit}
                      onChange={(e) => setNewProfit(e.target.value)}
                  />
                </div>
                {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                {/*  <span className="text-sm font-medium">Withdraw due Date:</span>*/}
                {/*  <span className="col-span-3">{selectedUser.withdrawDueDate}</span>*/}
                {/*</div>*/}
                {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                {/*  <span className="text-sm font-medium">Withdraw due Date:</span>*/}
                {/*  <span className="col-span-3">*/}
                {/*  <Badge variant={selectedUser.status === 'Online' ? 'success' : 'secondary'}>*/}
                {/*    {selectedUser.status}*/}
                {/*  </Badge>*/}
                {/*</span>*/}
                {/*</div>*/}
                {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                {/*  <span className="text-sm font-medium">Last Active:</span>*/}
                {/*  <span className="col-span-3">{selectedUser.lastActive}</span>*/}
                {/*</div>*/}
                {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                {/*  <span className="text-sm font-medium">Registered:</span>*/}
                {/*  <span className="col-span-3">{selectedUser.createdAt}</span>*/}
                {/*</div>*/}
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="col-span-3">
                  {suspendedUsers.includes(selectedUser.email) ? (
                      <Badge variant="destructive">Suspended</Badge>
                  ) : (
                      <Badge variant="success">Active</Badge>
                  )}
                </span>
                </div>
              </div>

          )}
          <Button
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              onClick={async () => {
                try {
                  const res = await fetch(`${API_URL}/add-to-profits`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: selectedUser.email,
                      balance: parseFloat(newBalance),
                      newProfit: parseFloat(newProfit),
                    }),
                  });
                  if (!res.ok) throw new Error('Failed to update user');
                  alert('User updated successfully!');
                  setIsDialogOpen(false);
                } catch (err) {
                  console.error('Update error:', err);
                  alert('Failed to update user data');
                }
              }}
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
