export function getItem<T>(key: string): T | null {
  let username = localStorage.getItem("username");
  const data = localStorage.getItem(`${username}-${key}`);

  return data ? (JSON.parse(data) as T) : null;
}
