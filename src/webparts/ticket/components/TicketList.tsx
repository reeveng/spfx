import * as React from "react";
import { Spinner } from "@fluentui/react";
import { TicketGrid } from "./TicketGrid";
import { SearchBox } from "./SearchBox";
import { ITicket, TicketService } from "../../ticket/services/TicketService";

interface ITicketListProps {
  service: TicketService;
  maxItems: number;
}

export const TicketList: React.FC<ITicketListProps> = ({
  service,
  maxItems,
}) => {
  const [tickets, setTickets] = React.useState<ITicket[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const loadTickets = React.useCallback(async () => {
    try {
      setLoading(true);
      const tickets = await service.getTickets(maxItems);
      setLoading(false);
      setTickets(tickets);
    } catch (error) {
      console.error("Error loading tickets:", error);
      setLoading(false);
    }
  }, [service, maxItems]);

  React.useEffect(() => {
    loadTickets().catch((err) => console.error(err));
  }, [loadTickets]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const getFilteredTickets = (): ITicket[] => {
    return tickets.filter((ticket) =>
      ticket.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddTicket = async (ticket: ITicket): Promise<ITicket> => {
    const newTicket = await service.addTicket(ticket);
    await loadTickets();
    return newTicket;
  };

  const handleUpdateTicket = async (ticket: ITicket): Promise<void> => {
    if (ticket.Id) {
      await service.updateTicket(ticket);
      await loadTickets();
    }
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      {loading ? (
        <Spinner label="Loading tickets..." />
      ) : (
        <TicketGrid
          tickets={getFilteredTickets()}
          onAdd={handleAddTicket}
          onEdit={handleUpdateTicket}
        />
      )}
    </div>
  );
};
