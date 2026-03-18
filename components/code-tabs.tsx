"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CopyButton } from "./copy-button";

interface CodeTabsProps {
  tabs: {
    label: string;
    value: string;
    code: string;
    html: string;
  }[];
  defaultValue?: string;
}

export function CodeTabs({ tabs, defaultValue }: CodeTabsProps) {
  const defaultTab = defaultValue ?? tabs[0]?.value;

  return (
    <div className="my-6 rounded-lg border border-border bg-neutral-100 dark:bg-[#0a0a0a] text-sm font-mono overflow-hidden">
      <Tabs defaultValue={defaultTab} className="gap-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <TabsList className="h-7 bg-transparent p-0 gap-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-6 px-2 text-xs data-[state=active]:bg-secondary data-[state=active]:shadow-none rounded"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="relative group mt-0"
          >
            <div className="absolute top-3 right-3 z-10">
              <CopyButton
                text={tab.code}
                className="opacity-0 group-hover:opacity-100 text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-[#0a0a0a]"
              />
            </div>
            <div
              className="overflow-x-auto [&_pre]:bg-transparent! [&_pre]:m-0! [&_pre]:p-4! [&_code]:bg-transparent! [&_.shiki]:bg-transparent!"
              dangerouslySetInnerHTML={{ __html: tab.html }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
