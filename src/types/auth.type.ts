export interface AuthErrorResponse {
  message: string;
  errors: {
    msg: string;
    param: string;
    location: string;
  };
}