'use strict'

const Membership = use('App/Models/MembershipRequest')


class MembershipController {
    async store({request, response, auth}) {
        let membership = await Membership.create(request.only(['name', 'phone', 'plan']));
    
        return {message: 'با موفقیت ثبت شد'};
      }
}

module.exports = MembershipController
