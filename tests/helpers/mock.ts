import type { MockSchema } from "../../src/routes/api/db-mock/+server";

export default async function mock(mockData: MockSchema): Promise<unknown> {
  return fetch('http://localhost:4173/api/db-mock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mockData, null, 2),
  });
}
