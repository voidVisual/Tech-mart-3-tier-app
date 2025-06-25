import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

const mockUser = {
  name: "Ravi Kumar",
  email: "ravi.kumar@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
};

const mockOrders = [
  { id: "ORD-2024-001", date: "2024-07-15", status: "Delivered", total: 89999, items: "Ultrabook X1" },
  { id: "ORD-2024-002", date: "2024-07-20", status: "Shipped", total: 3499, items: "PowerBank 20K" },
  { id: "ORD-2024-003", date: "2024-07-22", status: "Processing", total: 79999, items: "Galaxy Z10" },
];

export default function AccountPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">My Account</h1>
        <p className="text-lg text-muted-foreground mt-2">View your profile information and order history.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} data-ai-hint="person portrait"/>
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{mockUser.name}</CardTitle>
              <CardDescription>{mockUser.email}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order History</CardTitle>
              <CardDescription>A list of your recent purchases.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                       <TableCell>{order.items}</TableCell>
                      <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
