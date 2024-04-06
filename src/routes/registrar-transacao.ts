import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function registrarTransacao(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/transacao', {
      schema: {
        response: {
          200: z.object({
            conta: z.object({
              entrada: z.number(),
              saida: z.number(),
              total: z.number(),
            }),
            transacao: z.array(
              z.object({
                id: z.number().int(),
                descricao: z.string(),
                preco: z.number(),
                categoria: z.string(),
                tipoTransacao: z.string(),
                dataTransacao: z.date()
              })
            )
          })
        }
      }
    }, async (resquest, response) => {
      const conta = await prisma.conta.findUnique({
        select: {
          entrada: true,
          saida: true,
          total: true,
        },
        where: {
          id: 1,
        }
      });
      const transacao = await prisma.transacao.findMany();

      const data = {
        transacao: transacao,
        conta: conta ?? {
          entrada: 0,
          saida: 0,
          total: 0
        }
      };

      return response.status(200).send(data);
    });
}