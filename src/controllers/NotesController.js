const knex = require('../database/knex');

class NotesController {
  async create(request, response) {
    const { title, description, tags, rating } = request.body;
    const { user_id } = request.params;

    const note_id = await knex('notes').insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      };
    });

    await knex('tags').insert(tagsInsert);

    response.json();
  }
}

module.exports = NotesController;
