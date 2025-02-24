import * as React from "react";
import styles from "./Ticket.module.scss";
import type { ITicketProps } from "./ITicketProps";
import { TicketService } from "../services/TicketService";
import { TicketList } from "./TicketList";

export default class Ticket extends React.Component<ITicketProps> {
  private ticketService: TicketService;

  constructor(props: ITicketProps) {
    super(props);

    // Initialize the ticket service with SharePoint context
    this.ticketService = new TicketService(
      this.props.context.pageContext.web.absoluteUrl,
      this.props.context.spHttpClient
    );
  }

  public render(): React.ReactElement<ITicketProps> {
    const { hasTeamsContext, maxItems } = this.props;

    return (
      <section
        className={`${styles.ticket} ${hasTeamsContext ? styles.teams : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>IT Help Desk Ticket Management</h2>
            <p className={styles.description}>{this.props.description}</p>
          </div>

          <TicketList service={this.ticketService} maxItems={maxItems || 10} />
        </div>
      </section>
    );
  }
}
