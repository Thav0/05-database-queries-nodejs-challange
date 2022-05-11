import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .where(`title LIKE '%${param}'%`)
      .execute()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .leftJoin('users_games_games', 'users_games', 'users_games.gamesId = games.id')
      .where(`users_games.usersId = ${id}`)
      .execute()
      // Complete usando query builder
  }
}
