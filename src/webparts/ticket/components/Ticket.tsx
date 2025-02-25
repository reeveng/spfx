import * as React from "react";
import styles from "./Ticket.module.scss";
import type { ITicketProps } from "./ITicketProps";
import { TicketService } from "../services/TicketService";
import { TicketList } from "./TicketList";

export const Ticket: React.FC<ITicketProps> = ({
  context,
  hasTeamsContext,
  maxItems,
  description,
}) => {
  const ticketService = React.useMemo(
    () =>
      new TicketService(
        context.pageContext.web.absoluteUrl,
        context.spHttpClient
      ),
    [context]
  );

  return (
    <section
      className={`${styles.ticket} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>IT Help Desk Ticket Management</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <TicketList service={ticketService} maxItems={maxItems || 10} />
      </div>
    </section>
  );
};

export default Ticket;
