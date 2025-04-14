'use client';

import { useState } from 'react';
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

export const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              {/*<Input*/}
              {/*  type="search"*/}
              {/*  placeholder="Search users..."*/}
              {/*  className="w-[200px] md:w-[300px] pl-8"*/}
              {/*  value={searchQuery}*/}
              {/*  onChange={(e) => setSearchQuery(e.target.value)}*/}
              {/*/>*/}
            </div>
            {/*<Button variant="ghost" size="icon">*/}
            {/*  /!*<BellRing className="h-5 w-5" />*!/*/}
            {/*  <span className="sr-only">Notifications</span>*/}
            {/*</Button>*/}
            {/*<Button variant="ghost" size="icon" onClick={toggleTheme}>*/}
            {/*  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}*/}
            {/*  <span className="sr-only">Toggle theme</span>*/}
            {/*</Button>*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/*<ButtonclassName="rounded-full">*/}
                  <FaSyncAlt className="text-white" size={20}/>
                {/*</Button>*/}
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
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
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
                <CardTitle>Recent Withdrawal</CardTitle>
                <CardDescription>Monitor recent user withdrawals that need to be settled</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>



      </main>
    </div>
  );
};
