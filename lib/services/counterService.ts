import { promises as fs } from "fs";
import path from "path";
import type { CounterData } from "@/types/reclamacion";
import { formatCodigo, getCurrentYear } from "@/lib/utils";

const COUNTER_PATH = path.join(process.cwd(), "data", "counter.json");

async function readCounter(): Promise<CounterData> {
  const raw = await fs.readFile(COUNTER_PATH, "utf-8");
  return JSON.parse(raw) as CounterData;
}

async function writeCounter(data: CounterData): Promise<void> {
  await fs.writeFile(COUNTER_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function generateCodigo(): Promise<string> {
  const year = getCurrentYear();
  const counter = await readCounter();

  if (counter.year !== year) {
    const reset: CounterData = { year, count: 1 };
    await writeCounter(reset);
    return formatCodigo(year, 1);
  }

  const next: CounterData = { year, count: counter.count + 1 };
  await writeCounter(next);
  return formatCodigo(year, next.count);
}
