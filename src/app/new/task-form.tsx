"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TaskForm() {
  const [products, setProducts] = useState<
    { name: string; quantity: string }[]
  >([{ name: "", quantity: "" }]);
  const [loading, setLoading] = useState(false);

  // Función para agregar un nuevo campo de producto
  const addProductInput = () => {
    setProducts([...products, { name: "", quantity: "" }]);
  };

  // Función para manejar el cambio en los inputs de productos
  const handleProductChange = (index: number, field: string, value: string) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  // Función para eliminar un campo de producto
  const removeProductInput = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const number = formData.get("number");
    const client = formData.get("client");

    // Crear array de productos con nombre y cantidad
    const productsArray = products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
    }));

    // Hacer la petición POST a la API
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number,
          client,
          products: productsArray.map((p) => `${p.quantity}x ${p.name}`), // Formato esperado
        }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Task created:", result);
        // Redireccionar o limpiar el formulario si es necesario
      } else {
        console.error("Error creating task:", res.status);
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Crear Seguimiento</CardTitle>
          <CardDescription>Poner información del pedido.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="number">Numero de seguimiento</Label>
              <Input
                name="number"
                id="number"
                placeholder="Numero de seguimiento"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="client">Nombre de cliente</Label>
              <Input
                name="client"
                id="client"
                placeholder="Nombre de Cliente"
              />
            </div>

            {/* Mapeo de inputs de productos */}
            {products.map((product, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label htmlFor={`product-${index}`}>Producto {index + 1}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    name={`product-${index}`}
                    id={`product-${index}`}
                    placeholder={`Producto ${index + 1}`}
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    name={`quantity-${index}`}
                    id={`quantity-${index}`}
                    placeholder="0"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(index, "quantity", e.target.value)
                    }
                    className="w-[45px] text-center"
                  />
                  {products.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeProductInput(index)}
                      className="bg-red-600"
                    >
                      -
                    </Button>
                  )}
                  {index === products.length - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addProductInput}
                    >
                      +
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear seguimiento"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
