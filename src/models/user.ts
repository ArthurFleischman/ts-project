class User {
    name: string;
    age: number
    id: string
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
        this.id = crypto.randomUUID()
    }
}

export { User };