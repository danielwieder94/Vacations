export class ClientError {
  public status: number;
  public message: string;

  public constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
//user not logged in
export class UserNotLoggedInError extends ClientError {
  public constructor() {
    super(401, "User is not logged in.");
  }
}
//route not found
export class RouteNotFoundError extends ClientError {
  public constructor() {
    super(404, "Route not found.");
  }
}
