const ErrorMessage = ({ message = "Something went wrong" }) => {
  return <div data-testid="message-container">{message}</div>;
};

export default ErrorMessage;
