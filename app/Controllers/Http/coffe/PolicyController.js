'use strict'

const Policy = use('App/Models/Policy')

class PolicyController {

  async index({request, response,auth, view}) {
    let user = await auth.getUser();
    let coffe = await user.coffe().with('policy').first();

    return {policy: coffe.policy}
  }

  async show({params, request, response, view}) {
    let policy = await Policy.findOrFail(params.id);

    return {policy};
  }

  async update({params, request, auth}) {
    let user = await auth.getUser();
    let coffe = await user.coffe().with('policy').first();
    let policy = await coffe.policy.query().update(request.only([
      'point_per_money',
      'point_cost',
      'point_comment',
      'day_to_delete_point',
    ]));

    return {message: 'با موفقیت ثبت شد', policy};
  }

}

module.exports = PolicyController
