export const getTextPrompt = (propName: string, message: string) => {
  return {
    type: "text" as const,
    name: propName,
    message,
  };
};
