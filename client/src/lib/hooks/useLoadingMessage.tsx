import { message } from 'antd';

type LoadingMessageConfig = {
  key: string;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
};

/**
 * A custom hook that displays loading, success, and error messages
 * while doing some asynchronous action (e.g. request).
 *
 * @param config - A configuration object
 * @returns An object with two properties:
 *
 * 1. `loadAction`: A function that takes an action (a function that may return a promise) as a parameter.
 * It handles displaying loading, success, and error messages based on the provided configuration.
 * 2. `contextHolder`: A variable that holds the context returned by the `message.useMessage()` AntDesign hook.
 */
const useLoadingMessage = ({ key, loadingMessage, successMessage, errorMessage }: LoadingMessageConfig) => {
  const [messageApi, contextHolder] = message.useMessage();

  const loadAction = async (action: () => void | Promise<void>) => {
    try {
      if (loadingMessage) {
        messageApi.open({ key, type: 'loading', content: loadingMessage });
      }

      await action();

      if (successMessage) {
        messageApi.open({ key, type: 'success', content: successMessage, duration: 2 });
      }
    } catch {
      if (errorMessage) {
        messageApi.open({ key, type: 'error', content: errorMessage, duration: 2 });
      }
    }
  };

  return { loadAction, contextHolder };
};

export default useLoadingMessage;
