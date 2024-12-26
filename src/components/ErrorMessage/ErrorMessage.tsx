import './ErrorMessage.less';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div class="error-message">
      <b>!</b>
      {message}
    </div>
  );
}
