'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
    async index({request, response, auth}) {
        let comment = await Comment.query()
        .where('coffe_id', 1).fetch();
        return {comment};
    }
    async update({params}){
        await Comment.query().where({id: params.id}).update({status: 'old'});
    }
    async show_active({params, request, response, view}) {
        let comment = await Comment.query()
        .where('status', 'new')
        .andWhere('coffe_id', 1).fetch();
        return {comment};
      }
}

module.exports = CommentController
