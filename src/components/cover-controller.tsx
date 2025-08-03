import { Button } from "@/components/ui/button";
import { useCoverStore } from "@/stores/cover-store";
import { MailOpen, ArrowDown } from "lucide-react";

export function CoverController() {
  const { isMovedUp, setIsMovedUp, reset } = useCoverStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      {!isMovedUp ? (
        <Button 
          onClick={() => setIsMovedUp(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <MailOpen className="mr-2 h-4 w-4" />
          Buka Undangan
        </Button>
      ) : (
        <>
          <Button 
            onClick={() => setIsMovedUp(false)}
            variant="outline"
            className="bg-white"
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Tutup Undangan
          </Button>
          <Button 
            onClick={reset}
            variant="outline"
            className="bg-white"
          >
            Reset
          </Button>
        </>
      )}
    </div>
  );
} 