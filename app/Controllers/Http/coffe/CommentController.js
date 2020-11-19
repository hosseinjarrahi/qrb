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
}

module.exports = CommentController
