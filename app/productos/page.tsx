"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  const products = [
    { _id: "1", model: "iPhone 12", condition: "new", price: 100, memory: 16 },
    { _id: "2", model: "iPhone 13", condition: "used", price: 200, memory: 64 },
    { _id: "3", model: "iPhone 14", condition: "new", price: 300, memory: 128 },
    {
      _id: "4",
      model: "iPhone 15",
      condition: "used",
      price: 400,
      memory: 256,
    },
    { _id: "5", model: "iPhone SE", condition: "new", price: 150, memory: 32 },
    { _id: "6", model: "iPhone XR", condition: "used", price: 180, memory: 64 },
  ];

  return (
    <div className="flex flex-1 justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {products.slice(0, 6).map((product) => (
          <Card
            key={product._id}
            className="flex flex-col h-auto overflow-hidden"
          >
            {/* 🔹 Imagen más pequeña */}
            <div className="relative w-full pt-[80%]">
              <div className="absolute inset-0 bg-gray-200 rounded-t-md"></div>
            </div>

            <div className="flex flex-col flex-1 p-3">
              <CardHeader className="p-2 pb-0">
                <h3 className="font-medium text-base line-clamp-1">
                  {product.model}
                </h3>
              </CardHeader>

              <CardContent className="p-2 pt-1 flex-1">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {product.condition}
                  </Badge>
                  <span className="text-xs text-muted-foreground ">
                    {product.memory} GB
                  </span>
                </div>
                <p className="font-bold text-lg mt-1">${product.price}</p>
              </CardContent>

              <CardFooter className="p-2 pt-0 mt-auto">
              <Link href={`/product/${product._id}`} passHref className="">
                  <Button className="w-full text-sm h-8">Ver detalles</Button>
                </Link>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
