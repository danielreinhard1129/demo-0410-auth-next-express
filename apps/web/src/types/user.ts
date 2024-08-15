export interface User {
  id: number;
  name: string;
  email: string;
  provider: Provider;
  
}

enum Provider {
  CREDENTIALS = "CREDENTIALS",
  GOOGLE = "GOOGLE",
}
