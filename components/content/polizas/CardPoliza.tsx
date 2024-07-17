import { WidgetCard } from "@/components/ui/cards";
import { PolizasState } from "@/redux/slices/polizas";
import cn from "@/utils/class-names";
import { StoreApp } from "@reduxjs/toolkit";
import React from "react";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import { ActionIcon } from "rizzui";

export const CardPoliza = () => {
  const { currentPoliza } = useSelector<StoreApp, PolizasState>(
    (s) => s.polizas
  );

  return (
    <div className="grid grid-cols-2 gap-5 @2xl:grid-cols-2 @[90rem]:grid-cols-4 3xl:gap-8">
      <WidgetCard
        title={
          "Poliza" + currentPoliza?.tipo === "C"
            ? "Canceladas"
            : currentPoliza?.tipo === "V"
              ? "Ventas"
              : "Cobranza"
        }
        description={"67% acquired this week"}
        rounded="lg"
        action={
          <ActionIcon variant="outline" rounded="full">
            <PiSlidersHorizontalDuotone className="h-auto w-5" />
          </ActionIcon>
        }
        descriptionClassName="text-gray-500 mt-1.5"
      >
        <div className="mt-5 grid w-full grid-cols-1 justify-around gap-6 @sm:py-2 @7xl:gap-8">
          <div className="grid grid-cols-2 gap-5">
            {/* {item.stat.map((stat) => (
                <div key={stat.title} className="flex items-center">
                  <div
                    className={cn(
                      'me-3.5 flex h-10 w-10 items-center justify-center rounded-md bg-opacity-10 p-[9px]',
                      stat.bgColor,
                      stat.textColor
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <Text className="mb-1 text-gray-600">{stat.title}</Text>
                    <Title as="h6" className="font-semibold">
                      {stat.metric}
                    </Title>
                  </div>
                </div>
              ))} */}
          </div>

          <div className="h-72 w-full @sm:pt-3">
            {/* <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    left: -30,
                  }}
                  barSize={24}
                >
                  <YAxis tickLine={false} axisLine={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    type="natural"
                    dataKey="bounceRate"
                    stroke={item.color}
                    fill={item.color}
                    strokeWidth={2}
                    fillOpacity={0.1}
                  />
                </BarChart>
              </ResponsiveContainer> */}
          </div>
        </div>
      </WidgetCard>
    </div>
  );
};
