import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pedido} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
  ) {}

  @post('/personas')
  @response(200, {
    description: 'Pedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedido',
            exclude: ['id'],
          }),
        },
      },
    })
    pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.personaRepository.create(pedido);
  }

  @get('/personas/count')
  @response(200, {
    description: 'Pedido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pedido) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Pedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pedido) filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Pedido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Pedido,
    @param.where(Pedido) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(pedido, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Pedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pedido, {exclude: 'where'}) filter?: FilterExcludingWhere<Pedido>
  ): Promise<Pedido> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Pedido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Pedido,
  ): Promise<void> {
    await this.personaRepository.updateById(id, pedido);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Pedido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedido: Pedido,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, pedido);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Pedido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
