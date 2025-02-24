import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITicketProps {
  description: string;
  hasTeamsContext: boolean;
  isDarkTheme: boolean;
  environmentMessage: string;
  context: WebPartContext;
  maxItems?: number;
}
