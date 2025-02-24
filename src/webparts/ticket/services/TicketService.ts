import { SPHttpClient } from "@microsoft/sp-http";

export interface ITicket {
  Id?: number;
  Title: string;
  Description?: string;
  Status?: string;
  Priority?: string;
  Created?: Date;
}

export class TicketService {
  private listName: string = "Tickets";
  private listItemEntityTypeName: string = "SP.Data.TicketsListItem";

  constructor(private siteUrl: string, private spHttpClient: SPHttpClient) {}

  private getListEndpoint(): string {
    return `${this.siteUrl}/_api/web/lists/getbytitle('${this.listName}')`;
  }

  public async getTickets(top: number = 100): Promise<ITicket[]> {
    const res = await this.spHttpClient.get(
      `${this.getListEndpoint()}/items?$top=${top}`,
      SPHttpClient.configurations.v1
    );
    return (await res.json()).value;
  }

  public async addTicket(ticket: ITicket): Promise<ITicket> {
    const body = JSON.stringify({
      __metadata: { type: this.listItemEntityTypeName },
      ...ticket,
    });

    const res = await this.spHttpClient.post(
      `${this.getListEndpoint()}/items`,
      SPHttpClient.configurations.v1,
      {
        body,
        headers: {
          "Content-type": "application/json;odata=verbose",
          Accept: "application/json;odata=nometadata",
        },
      }
    );

    return await res.json();
  }

  public async updateTicket(ticket: ITicket): Promise<void> {
    const body = JSON.stringify({
      __metadata: { type: this.listItemEntityTypeName },
      ...ticket,
    });

    await this.spHttpClient.post(
      `${this.getListEndpoint()}/items(${ticket.Id})`,
      SPHttpClient.configurations.v1,
      {
        body,
        headers: {
          "Content-type": "application/json;odata=verbose",
          "X-HTTP-Method": "MERGE",
          "IF-MATCH": "*",
        },
      }
    );
  }
}
