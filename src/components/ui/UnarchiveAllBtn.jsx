import { resetActivities } from "@/lib/activitiesAPIrequest";
import { fetchAllActivity } from "@/lib/activitiesAPIrequest";
import { ArchiveX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UnArchiveAllBtn = ({ setActivities }) => {
  const { toast } = useToast();
  const handleUnarchiveAll = async () => {
    try {
      await resetActivities();
      toast({
        title: "Success",
        description: `Successfully unarchived all!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to unarchive. Please try again.`,
      });
    } finally {
      const updatedActivities = await fetchAllActivity();
      setActivities(updatedActivities);
    }
  };
  return (
    <button
      onClick={handleUnarchiveAll}
      size="icon"
      className="absolute right-6 h-10 w-10 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center"
    >
      <ArchiveX className="h-6 w-6 text-white" />
    </button>
  );
};

export default UnArchiveAllBtn;
