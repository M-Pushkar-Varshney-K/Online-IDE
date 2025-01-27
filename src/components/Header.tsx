import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Github } from "lucide-react";
const Headers = () => {
  return (
    <div className="my-4 grid grid-cols-3 gap-2">
      <div className="self-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Sheet>
                <SheetTrigger>
                  <Button variant="outline">Open</Button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <h2 className="text-4xl font-bold text-center">Code Editor</h2>
      <div className="flex justify-end gap-5 items-center p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://github.com/CoderKumarS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-end items-center p-2 rounded-lg bg-black dark:bg-white"
              >
                <Github className="text-white dark:text-black" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Support Creator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Headers;
