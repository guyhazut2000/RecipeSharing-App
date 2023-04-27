import { AxiosError } from "axios";

const getErrorMessage = (error: AxiosError): string => {
  return (error as AxiosError).message;
};

const getErrorStatusCode = (error: AxiosError): number | undefined => {
  return (error as AxiosError)?.response?.status;
};

const getErrorMessageDetails = (error: AxiosError): string => {
  return (error as any)?.response?.data.error.message;
};

export { getErrorMessage, getErrorStatusCode, getErrorMessageDetails };
