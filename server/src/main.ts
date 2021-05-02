import { app } from "./app";
import { ApolloServer, gql } from "apollo-server-express";
import { Request, Response } from "express";
import winstonLogger from "./startup/logger";

import { getPeople } from "./resolvers";

const typeDefs = gql`
    type People {
        name: String
        height: String
        mass: String
        gender: String
        homeworld: String
    }
    
    type PeopleQueryResponse {
        count: Int
        results: [People]
    }
    scalar Date
    
  type Query {
    people(page: Int ): PeopleQueryResponse  
  }
`;
 
const resolvers = {
  Query: {
    people: getPeople
  },
};

const server = new ApolloServer({ typeDefs, resolvers, tracing: true });

server.applyMiddleware({ app });

app.get("/", (req: Request, res: Response) => {
	res.json({ "message": `To access the graphql server go to ${server.graphqlPath}` });
});
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
	winstonLogger.info(`${process.env.NODE_ENV || "dev"} server up listening on PORT ${PORT} and graphql is on ${server.graphqlPath}`);
});


