import {
  PrimaryButton,
  DefaultButton,
  TextField,
  Dialog,
  DialogFooter,
  DialogType,
} from "@fluentui/react";
import { ITicket } from "../../ticket/services/TicketService";
import * as React from "react";

interface ITicketFormProps {
  ticket?: ITicket;
  onSave: (ticket: ITicket) => void;
  onCancel: () => void;
}

export const TicketForm: React.FC<ITicketFormProps> = ({
  ticket,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<ITicket>(
    ticket || { Title: "" }
  );

  const handleSubmit = (): void => {
    onSave(formData);
    onCancel();
  };

  return (
    <Dialog
      hidden={false}
      onDismiss={onCancel}
      dialogContentProps={{
        type: DialogType.normal,
        title: ticket ? "Edit Ticket" : "New Ticket",
      }}
    >
      <TextField
        label="Title"
        value={formData.Title}
        onChange={(_, val) => setFormData({ ...formData, Title: val ?? "" })}
      />
      <DialogFooter>
        <PrimaryButton onClick={handleSubmit} text="Save" />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
