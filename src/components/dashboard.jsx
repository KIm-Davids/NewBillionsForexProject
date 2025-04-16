'use client';

import {useEffect, useState} from 'react';
import { BellRing, ChevronDown, LogOut, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useTheme } from './theme-provider';

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserList } from './user-list';
import { UserStats } from './user-stats';
import { RecentActivities } from './recent-activities';
import {FaSyncAlt} from "react-icons/fa";
import { RecentActivitiesWithdraw } from './recent-activities-withdrawal';

export const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("https://your-backend-url.com/admin/users")
        .then(res => res.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
        });
  }, []);

  const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 rounded">Admin</span>
            <span>Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">

            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mr-4">
                  <FaSyncAlt className="text-white" size={20}/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/*<DropdownMenuItem>*/}
                {/*  <User className="mr-2 h-4 w-4" />*/}
                {/*  Profile*/}
                {/*</DropdownMenuItem>*/}
                {/*<DropdownMenuItem>*/}
                {/*  <Settings className="mr-2 h-4 w-4" />*/}
                {/*  Settings*/}
                {/*</DropdownMenuItem>*/}
                <DropdownMenuItem>
                  {/*<LogOut className="mr-2 h-4 w-4" />*/}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <Button variant="outline" size="sm">*/}
            {/*      Last 7 days <ChevronDown className="ml-2 h-4 w-4" />*/}
            {/*    </Button>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent align="end">*/}
            {/*    <DropdownMenuItem>Last 24 hours</DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>Last 7 days</DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>Last 30 days</DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>Last 3 months</DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>Last year</DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>All time</DropdownMenuItem>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </div>
        </div>

        {/* Stats cards */}
        <UserStats />

        {/* Tabs for different views */}
        <Tabs defaultValue="users">
          <TabsList className="bg-secondary">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="activities">Transaction Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View all user activities here</CardDescription>
              </CardHeader>
              <CardContent>
                <UserList searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Deposits</CardTitle>
                <CardDescription>Monitor recent user deposits that need to be settled</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Daily Profits</CardTitle>
                <CardDescription>Monitor recent user withdrawals from their daily profits</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
              <CardHeader>
                <CardTitle>User Balance withdrawal</CardTitle>
                <CardDescription>Monitor recent user withdrawals their balance</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
      </main>
    </div>
  );
};
