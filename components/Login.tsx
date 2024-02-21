import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Login( {onLogin} : {onLogin: (email: string, password: string) => void}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <form onSubmit={handleLogin}>
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="ml-auto" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
