import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function criarTransacao(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/transacao', {
    schema: {
      body: z.object({
        descricao: z.string(),
        preco: z.number(),
        categoria: z.string(),
        tipoTransacao: z.string()
      })
    }
  }, async (request, response) => {

    const {
      descricao,
      preco,
      categoria,
      tipoTransacao
    } = request.body;

    const transacao = await prisma.transacao.create({
      data: {
        descricao,
        preco,
        categoria,
        tipoTransacao
      }
    });

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

    const contaArredondada = {
      entrada: 0,
      saida: 0,
      total: 0
    };

    if (conta) {
      if (transacao.tipoTransacao === "E") {
        conta.entrada += transacao.preco;
        conta.total += transacao.preco;
      } else if (transacao.tipoTransacao === "S") {
        conta.saida += transacao.preco;
        conta.total -= transacao.preco;
      } else {
        return response.status(400).send({message: 'Tipo de transacao não existe.'});
      }

      await prisma.conta.update({
        where: { id: 1 },
        data: {
          entrada: conta.entrada,
          saida: conta.saida,
          total: conta.total,
        }
      });

      contaArredondada.entrada = Number(conta.entrada.toFixed(2));
      contaArredondada.saida = Number(conta.saida.toFixed(2));
      contaArredondada.total = Number(conta.total.toFixed(2)); 
    }

    const data = {
      id_transacao: transacao.id,
      conta: contaArredondada
    };

    return response.status(201).send(data);

  });
}
