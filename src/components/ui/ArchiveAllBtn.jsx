import { archiveAllActivities, fetchAllActivity } from "@/lib/activitiesAPIrequest";
import { Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArchiveAllBtn = ({ setActivities }) => {
  const { toast } = useToast();
  const handleUnarchiveAll = async () => {
    try {
      await archiveAllActivities();
      toast({
        title: "Success",
        description: `Successfully archived all!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to archive. Please try again.`,
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
      className="absolute right-6 h-10 w-10 rounded-full bg-slate-400 hover:bg-slate-500 flex items-center justify-center"
    >
      <Archive className="h-6 w-6 text-white" />
    </button>
  );
};

export default ArchiveAllBtn;
