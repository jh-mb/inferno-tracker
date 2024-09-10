"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
  Row,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ShippingData {
  id: number;
  number: number;
  client: string;
  products: string[];
  status: string;
  number_viacargo: string;
}

// Definir las columnas
export const columns: ColumnDef<ShippingData>[] = [
  {
    accessorKey: "number",
    header: "N° Envio",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "products",
    header: "Productos",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "number_viacargo",
    header: "Via cargo",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => <UpdateButton row={row} />,
  },
];

export function DataTableDemo({ data }: { data: ShippingData[] }) {
  const table = useReactTable<ShippingData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("client")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Componente para actualizar los datos con el modal
function UpdateButton({ row }: { row: Row<ShippingData> }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<ShippingData>({
    id: row.original.id,
    number: row.original.number,
    client: row.original.client,
    products: row.original.products,
    status: row.original.status,
    number_viacargo: row.original.number_viacargo,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataNew = new FormData(e.currentTarget);
    const number = formDataNew.get("number");
    const client = formDataNew.get("client");
    const product = [formDataNew.get("products")];
    const status = formDataNew.get("status");
    const number_viacargo = formDataNew.get("number_viacargo");

    try {
      const res = await fetch("/api/task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          number,
          client,
          product,
          status,
          number_viacargo,
        }),
      });

      if (res.ok) {
        console.log("Task updated: ", res.status);
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    }

    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Actualizar</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Envío</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number">N° Envio</Label>
                <Input
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client">Cliente</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="products">Productos</Label>
                <Input
                  id="products"
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status">Estado</Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number_viacargo">Via Cargo</Label>
                <Input
                  id="number_viacargo"
                  name="number_viacargo"
                  value={formData.number_viacargo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
