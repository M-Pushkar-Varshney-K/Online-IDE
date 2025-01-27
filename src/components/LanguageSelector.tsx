import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_DISPLAY_NAMES, LANGUAGE_VERSIONS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const languages = Object.entries(LANGUAGE_VERSIONS);
const LanguageSelector = ({
  onSelect,
}: {
  onSelect: (language: string) => void;
}) => {
  return (
    <div className="self-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Select
              onValueChange={(value) =>
                onSelect(value as keyof typeof LANGUAGE_VERSIONS)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(([language, version]) => (
                  <SelectItem key={language} value={language}>
                    {LANGUAGE_DISPLAY_NAMES[language]} &nbsp;{" "}
                    <span className="text-xs text-gray-500">{version}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change Language</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default LanguageSelector;
