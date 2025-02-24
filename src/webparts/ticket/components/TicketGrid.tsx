import {
  DetailsList,
  IColumn,
  PrimaryButton,
  SelectionMode,
  Dialog,
  DialogType,
  DialogFooter,
  TextField,
  DefaultButton,
} from "@fluentui/react";
import { ITicket } from "../../ticket/services/TicketService";
import * as React from "react";

interface ITicketGridProps {
  tickets: ITicket[];
  onAdd: (ticket: ITicket) => Promise<ITicket>;
  onEdit: (ticket: ITicket) => Promise<void>;
}

export const TicketGrid: React.FC<ITicketGridProps> = ({
  tickets,
  onEdit,
  onAdd,
}) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [newTicket, setNewTicket] = React.useState<Partial<ITicket>>({
    Title: "",
  });

  const columns: IColumn[] = [
    { key: "Title", name: "Title", fieldName: "Title", minWidth: 100 },
    { key: "Status", name: "Status", fieldName: "Status", minWidth: 100 },
    { key: "Created", name: "Created", fieldName: "Created", minWidth: 100 },
    // Add other columns from your list
  ];

  const handleAddClick = async (): Promise<void> => {
    try {
      // Remove unused variable assignment
      await onAdd(newTicket as ITicket);
      setShowDialog(false);
      setNewTicket({ Title: "" });
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <div>
      <PrimaryButton text="New Ticket" onClick={() => setShowDialog(true)} />

      <Dialog
        hidden={!showDialog}
        onDismiss={() => setShowDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Create New Ticket",
        }}
      >
        <TextField
          label="Title"
          value={newTicket.Title}
          onChange={(_, val) =>
            setNewTicket((prev) => ({ ...prev, Title: val }))
          }
        />
        <DialogFooter>
          <PrimaryButton onClick={handleAddClick} text="Create" />
          <DefaultButton onClick={() => setShowDialog(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      <DetailsList
        items={tickets}
        columns={columns}
        selectionMode={SelectionMode.none}
        onRenderItemColumn={(item, index, column) => {
          if (column?.fieldName === "Created" && item[column.fieldName]) {
            return (
              <span>
                {new Date(item[column.fieldName]).toLocaleDateString()}
              </span>
            );
          }
          return <span>{item[column?.fieldName as keyof ITicket]}</span>;
        }}
      />
    </div>
  );
};
