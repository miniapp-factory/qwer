"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface CartItem {
  name: string;
  price: number;
}

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    const parsedPrice = parseFloat(price);
    if (!name || isNaN(parsedPrice)) return;
    setItems([...items, { name, price: parsedPrice }]);
    setName("");
    setPrice("");
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={addItem}>Add</Button>
        </div>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <span className="font-semibold">Total: ${total.toFixed(2)}</span>
      </CardFooter>
    </Card>
  );
}
