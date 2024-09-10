// /src/app/api/task/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de importar correctamente tu instancia de Prisma

// Manejo del método POST
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number, client, products } = body;

    console.log(number, client, products, "soy el create");

    // Validación de campos requeridos
    if (!client || !number || products.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Creación de la nueva tarea en la base de datos
    const newTask = await prisma.tracker.create({
      data: {
        number: Number(number),
        client,
        products,
        status: "preparación",
        number_viacargo: "-",
      },
    });

    // Respuesta exitosa
    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number");
  console.log(number);
  try {
    const tracker = await prisma.tracker.findMany({
      where: {
        number: Number(number),
      },
    });

    console.log(tracker);
    return NextResponse.json(tracker, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

// Manejo del método PUT para actualizar una tarea
export async function PUT(request: Request) {
  console.log("entrada 1");
  try {
    console.log("entrada 2");
    const body = await request.json();
    const { id, client, products, status, number_viacargo } = body;

    console.log(id, "soy el id en el route.ts");

    // Validación de campos requeridos
    // if (!number || !client || !number) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 }
    //   );
    // }

    //Verificación de si la tarea existe
    const existingTask = await prisma.tracker.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Actualización de la tarea en la base de datos

    const updatedTask = await prisma.tracker.update({
      where: { id: id },
      data: {
        client: client !== undefined ? client : existingTask.client,
        products: products !== undefined ? products : existingTask.products,
        status: status !== undefined ? status : existingTask.status,
        number_viacargo:
          number_viacargo !== undefined
            ? number_viacargo
            : existingTask.number_viacargo,
      },
    });

    // Respuesta exitosa
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
