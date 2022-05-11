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
      .createQueryBuilder('games')
      .select('title')
      .where(`title ILIKE '%${param}%'`)
      .execute()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder('games')
      .select('users.first_name, users.last_name, users.email')
      .leftJoin('users_games_games', 'users_games', 'users_games.gamesId = games.id')
      .leftJoin('users', 'users', 'users_games.usersId = users.id')
      .where(`users_games.gamesId = '${id}'`)
      .execute()
      // Complete usando query builder
  }
}
