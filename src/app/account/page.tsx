
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/session";

// Mock data, to be replaced with real data from your database
const mockOrders = [
  { id: "ORD-2024-001", date: "2024-07-15", status: "Delivered", total: 89999, items: "Ultrabook X1" },
  { id: "ORD-2024-002", date: "2024-07-20", status: "Shipped", total: 3499, items: "PowerBank 20K" },
  { id: "ORD-2024-003", date: "2024-07-22", status: "Processing", total: 79999, items: "Galaxy Z10" },
];

export default async function AccountPage() {
  const user = await getSession();

  // Middleware should handle this, but it's good practice to double-check
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container py-12">
      <div className="text-left mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">My Account</h1>
        <p className="text-lg text-muted-foreground mt-2">View your profile information and order history.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center p-6">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold font-headline mb-6">Order History</h2>
          <div className="space-y-6">
            {mockOrders.length > 0 ? mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <CardTitle className="text-lg font-semibold">Order #{order.id}</CardTitle>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="w-fit">
                      {order.status}
                    </Badge>
                  </div>
                  <CardDescription>Date: {order.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4"/>
                  <div>
                    <p className="font-medium">{order.items}</p>
                  </div>
                  <p className="text-lg font-bold mt-4 text-right">{formatPrice(order.total)}</p>
                </CardContent>
              </Card>
            )) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  You have not placed any orders yet.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
