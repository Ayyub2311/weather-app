import { z } from "zod";

export const AirPollutionSchema = z.object({
  coord: z.object({
    lat: z.number(),
    lon: z.number(),
  }),

  list: z.array(
    z.object({
      dt: z.number(),
      main: z.object({
        aqi: z.union([
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
        ]),
      }),

      components: z.object({
        co: z.number(),
        no: z.number(),
        no2: z.number(),
        o3: z.number(),
        so2: z.number(),
        pm2_5: z.number(),
        pm10: z.number(),
        nh3: z.number(),
      }),
    }),
  ),
});

export type AirPollutionResponse = z.infer<typeof AirPollutionSchema>;