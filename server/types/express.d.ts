declare namespace Express {
  export interface Response {
    success: <T>(message: string, body: T, status?: number) => Response;
    fail: <T>(message: string, body?: T, status?: number) => Response;
  }
}
