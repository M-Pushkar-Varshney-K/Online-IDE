import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href}: BackProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(href);
  };

  return (
    <div>
      <Button
        variant="link"
        className="font-normal w-full"
        size="sm"
        onClick={handleNavigate} // Using navigate function here
      >
        {label}
      </Button>
    </div>
  );
};

export default BackButton;
