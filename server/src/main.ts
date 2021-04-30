import { app } from "./app";
import { Request, Response } from "express";
import winstonLogger from "./startup/logger";
import { ApolloServer, gql } from 'apollo-server-express';
 
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app })

app.get("/", (req: Request, res: Response) => {
	res.json({ "greet": "hello" });
});
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
	winstonLogger.info(`${process.env.NODE_ENV || "dev"} server up listening on PORT ${PORT} and graphql is on ${server.graphqlPath}`);
});


