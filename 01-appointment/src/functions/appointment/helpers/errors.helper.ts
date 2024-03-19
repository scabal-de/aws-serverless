export class BusinessError extends Error {
  stack: string;
  message: string;
  status: number;
  statusCode: number;

  constructor(stack: string, message: string, status: number) {
    super();
    this.stack = stack;
    this.message = message;
    this.status = status;
    this.statusCode = status;
  }
}
