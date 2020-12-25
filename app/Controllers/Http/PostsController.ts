import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Post from 'App/Models/Post';

export default class PostsController {
  public async index() {
    const posts = await Post.all();

    return posts;
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'content']);

    const post = await Post.create(data);

    return response.created(post);
  }

  public async change({ request, response, ...rest }: HttpContextContract) {
    const { title, content } = request.only(['title', 'content']);
    const id = rest.params.id;
    await Post.query().update({ title, content }).where('id', id);
    return response.noContent();
  }
}
