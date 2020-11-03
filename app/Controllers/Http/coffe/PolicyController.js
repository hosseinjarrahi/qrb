'use strict'

const Policy = use('App/Models/Policy')

class PolicyController {

  async index({request, response, view}) {
    let coffe = await auth.user.coffe().with('policy').fetch();

    return {policy: coffe.policy}
  }

  async show({params, request, response, view}) {
    let policy = await Policy.findOrFail(params.id);

    return {policy};
  }

  async update({params, request, auth}) {
    let coffe = auth.user.coffe().with('policy').fetch();

    let policy = coffe.policy;

    policy = await Policy.query().update(request.only([
      'point_per_money',
      'point_cost',
      'point_comment',
      'day_to_delete_point',
    ]));

    return {message: 'با موفقیت ثبت شد', policy};
  }

}

module.exports = PolicyController
