import { z } from "zod";

const ItemStaticticSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const AnalyticSchema = z.object({
  totalClicks: z.number(),
  uniqueUsers: z.number(),
  devices: z.array(ItemStaticticSchema),
  countries: z.array(ItemStaticticSchema),
  clickDataPerDay: z.array(ItemStaticticSchema),
  browsers: z.array(ItemStaticticSchema),
  os: z.array(ItemStaticticSchema),
});

export type IAnalytic = z.infer<typeof AnalyticSchema>;
export type IStaticticItem = z.infer<typeof ItemStaticticSchema>;
