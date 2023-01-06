import express from 'express'
import { Router, Request, Response, Express } from 'express';
import { User } from './models/user';
const app: Express = express();

const route: Router = Router()

app.use(express.json())

let userMap: Map<string, User> = new Map<string, User>();

route.get('/users', (req: Request, res: Response) => {
    let values = Array.from(userMap.values());
    console.log(values);
    res.json({ values: values });
})

route.post("/users", (req: Request, res: Response) => {
    let body = req.body;
    let user: User = new User(body['name'], body['age']);
    userMap.set(user.id, user);
    console.log(userMap)
    res.sendStatus(201);
})
route.put("/users/age/:id/:age", (req: Request, res: Response) => {
    let user: User = userMap.get(req.params['id'])!;
    let age: number = Number.parseInt(req.params['age'])!
    user.age = age
    userMap.set(user.id, user);
    res.sendStatus(200)
})
route.delete("/users/:id", (req: Request, res: Response) => {
    let id: string = req.params['id'];
    userMap.delete(id)
    res.sendStatus(200)
})

route.get("/ping", (req: Request, res: Response) => {
    res.send("pong")
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
