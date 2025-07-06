export async function handleApiError(error: unknown) {
  let message = 'An unexpected error occurred';
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (isApiError(error)) {
    message = error.response?.data?.message || error.message;
  }

  showErrorToast(message);
  return message;
}

function isApiError(error: unknown): error is { response: { data: { message: string } }; message: string } {
  return typeof error === 'object' && error !== null && ('response' in error || 'message' in error);
}
