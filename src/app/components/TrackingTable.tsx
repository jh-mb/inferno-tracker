"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function TrackingTable() {
  const [trackerNumber, setTrackerNumber] = useState("");
  const [trackers, setTrackers] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/task?number=${trackerNumber}`);
      const result = await response.json();
      setTrackers(result);
    } catch (error) {
      console.error("Error fetching tracker:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 px-4 py-8">
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          name="tracker"
          id="tracker"
          placeholder="Número de seguimiento"
          value={trackerNumber}
          onChange={(e) => setTrackerNumber(e.target.value)}
          className="rounded-lg shadow-sm"
        />
        <Button
          type="button"
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Buscar
        </Button>
      </div>

      <div className="w-full max-w-4xl mt-6">
        {trackers?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg shadow-lg">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 border-b text-left">
                    Número de Seguimiento
                  </th>
                  <th className="py-3 px-6 border-b text-left">Cliente</th>
                  <th className="py-3 px-6 border-b text-left">Productos</th>
                  <th className="py-3 px-6 border-b text-left">Estado</th>
                  <th className="py-3 px-6 border-b text-left">
                    Número de Via Cargo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {trackers.map((tracker: any, index: number) => (
                  <tr key={tracker.id}>
                    <td className="py-3 px-6 border-b">{tracker.number}</td>
                    <td className="py-3 px-6 border-b">{tracker.client}</td>
                    <td className="py-3 px-6 border-b">{tracker.products}</td>
                    <td className="py-3 px-6 border-b">{tracker.status}</td>
                    <td className="py-3 px-6 border-b">
                      <Link
                        href={`https://www.viacargo.com.ar/tracking/${tracker.number_viacargo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span
                          className={
                            tracker.number_viacargo === "-"
                              ? ""
                              : "text-sky-400 underline"
                          }
                        >
                          {tracker.number_viacargo}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Ingresa un número de seguimiento para ver los resultados.</p>
        )}
      </div>
    </div>
  );
}
