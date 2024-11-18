import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleBtn = ({ displayArchived, handleDisplayArchived }) => {

  return (
    <div className="flex items-center justify-center mb-3">
          <ToggleButtonGroup
            value={displayArchived}
            exclusive
            onChange={handleDisplayArchived}
          >
            <ToggleButton className="h-6 w-24 px-2 py-1" value={false}>
              Activity
            </ToggleButton>
            <ToggleButton className="h-6 w-24 px-2 py-1" value={true}>
              Archive
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
  );
};

export default ToggleBtn;
