import type { HttpContext } from '@adonisjs/core/http'
import TodoCard from '#models/todo_card'

export default class TodoCardsController {
  public async getAll({ response }: HttpContext) {
    try {
      const todoCards = await TodoCard.all()
      return response.ok(todoCards)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao listar TodoCards', error })
    }
  }

  public async addOne({ request, response }: HttpContext) {
    try {
      const data = request.only(['title', 'listType'])

      if (!data.title || !data.listType) {
        return response.badRequest({ message: 'Title e listType são obrigatórios' })
      }

      const todoCard = await TodoCard.create(data)

      return response.created(todoCard)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao criar TodoCard', error })
    }
  }

  public async getOne({ params, response }: HttpContext) {
    try {
      const todoCard = await TodoCard.findOrFail(params.id)
      return response.ok(todoCard)
    } catch (error) {
      return response.notFound({ message: 'TodoCard não encontrado', error })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['title', 'listType'])
      const todoCard = await TodoCard.findOrFail(params.id)
      todoCard.merge(data)
      await todoCard.save()
      return response.ok(todoCard)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao atualizar TodoCard', error })
    }
  }

  // Deletar um TodoCard específico
  public async delete({ params, response }: HttpContext) {
    try {
      const todoCard = await TodoCard.findOrFail(params.id)
      await todoCard.delete()
      return response.noContent()
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao deletar TodoCard', error })
    }
  }
}
