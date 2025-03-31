export class User {
    username: string;
    email: string;

    constructor(data: any) {
        this.email = data?.email ?? '';
        this.username = data.username ?? '';
    }
}