export interface ICommandDispatcher {
  dispatch(): Promise<void>;
}
