// errorTypes.ts
export class InvalidRequestError extends Error {}
export class ModerationNudgeError extends Error {}
export interface CustomErrorType {
  message: string;
  originalError?: Error;
}
