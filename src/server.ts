import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import { 
  serializerCompiler, 
  validatorCompiler
} from "fastify-type-provider-zod";
import { criarTransacao } from "./routes/criar-transacao";
import { registrarTransacao } from "./routes/registrar-transacao";

const app = fastify();

app.register(fastifyCors, {
  allowedHeaders: ['*'],
  methods: ['*'],
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(criarTransacao);
app.register(registrarTransacao);

app.listen({ 
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("HTTP Server running");
});