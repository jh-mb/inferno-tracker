import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const number = Number(formData.get("number"));
  const client = formData.get("client")?.toString();

  // Se obtiene la cantidad de productos enviados (si es dinámico)
  const products: string[] = [];
  let index = 0;
  while (formData.get(`product-${index}`)) {
    const product = formData.get(`product-${index}`)?.toString();
    const quantity = formData.get(`quantity-${index}`)?.toString();

    if (product && quantity) {
      products.push(`${quantity}x ${product}`);
    }
    index++;
  }

  if (!client || !number || products.length === 0) {
    return;
  }

  const newTask = await prisma.tracker.create({
    data: {
      number: 106,
      client: "Javi",
      products: ["1xbanco"],
      status: "preparacion",
      number_viacargo: 0,
    },
  });

  console.log(newTask);
  redirect("/");
}
