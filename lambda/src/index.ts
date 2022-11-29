export async function handler(event: any): Promise<any> {
  return {
    statusCode: 200,
    body: {
      message: 'typescript test',
    },
  }
}
